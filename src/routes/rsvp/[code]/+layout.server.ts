import type { LayoutServerLoad } from './$types';
import { db } from '@/db';
import { mainGuest } from '@/db/schema';
import { mainGuestBaseSchema } from '@/lib/validations/guest';
import { error } from '@sveltejs/kit';
import { count } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load: LayoutServerLoad = async ({ params }) => {
  const guest = await db.query.mainGuest.findFirst({
    where: eq(mainGuest.id, params.code),
    with: {
      additionalGuests: true
    }
  });

  const sum = await db
    .select({ count: count() })
    .from(mainGuest)
    .where(eq(mainGuest.attendingReception, true));

  console.log(sum);

  if (!guest) throw error(404, { message: `guest with code ${params.code} not found` });
  const form = await superValidate(guest, mainGuestBaseSchema);

  return { guest: form, sum: sum[0].count };
};
