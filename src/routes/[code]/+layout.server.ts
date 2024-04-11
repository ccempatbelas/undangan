import type { LayoutServerLoad } from './$types';
import { db } from '@/db';
import { mainGuest } from '@/db/schema';
import { mainGuestBaseSchema } from '@/lib/validations/guest';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load: LayoutServerLoad = async ({ params }) => {
  const guest = await db.query.mainGuest.findFirst({
    where: eq(mainGuest.id, params.code),
    with: {
      additionalGuests: true
    }
  });

  const registry = await db.query.registry.findMany();

  if (!guest) throw error(404, { message: `guest with code ${params.code} not found` });

  const form = await superValidate(guest, mainGuestBaseSchema);

  return { guest: form, registry };
};
