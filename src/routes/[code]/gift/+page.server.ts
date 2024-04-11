import { db } from '@/db';
import { registry } from '@/db/schema';
import { info } from '@/lib/logger/logger';
import { registryToggleSchema } from '@/lib/validations/registry';
import type { Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
  toggle: async ({ request }) => {
    const form = await superValidate(request, registryToggleSchema);
    await db
      .update(registry)
      .set({ chosen: !form.data.chosen })
      .where(eq(registry.id, form.data.id));
    await info(`registry toggled: ${form.data.name}`, form.data.guest);
  }
};
