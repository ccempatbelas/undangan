import type { PageServerLoad } from './$types';
import { db } from '@/db';
import { registry } from '@/db/schema';
import { info, warning } from '@/lib/logger/logger';
import {
  registryInsertSchema,
  registryRemoveSchema,
  registryToggleSchema
} from '@/lib/validations/registry';
import { type Actions, error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
  const registry = await db.query.registry.findMany();
  const addForm = superValidate(registryInsertSchema);
  return { registry, addForm };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await superValidate(request, registryInsertSchema);

    if (!form.valid) {
      return fail(400, { form });
    }
    const [data] = await db.insert(registry).values(form.data).returning();
    if (!data) throw error(404, { message: `failed to insert new registry` });

    await info(`Added new registry: ${form.data.name}`, 'admin');

    return { form };
  },
  remove: async ({ request }) => {
    const form = await superValidate(request, registryRemoveSchema);
    await db.delete(registry).where(eq(registry.id, form.data.id));
    await warning(`Removed registry: ${form.data.name}`, 'admin');
  },
  toggle: async ({ request }) => {
    const form = await superValidate(request, registryToggleSchema);
    await db
      .update(registry)
      .set({ chosen: !form.data.chosen })
      .where(eq(registry.id, form.data.id));
    await info(`registry toggled: ${form.data.name}`, 'admin');
  }
};
