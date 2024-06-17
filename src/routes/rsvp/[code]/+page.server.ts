import type { Actions } from './$types';
import { db } from '@/db';
import { mainGuest } from '@/db/schema';
import { info } from '@/lib/logger/logger';
import { mainGuestRsvpSchema } from '@/lib/validations/guest';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
  submit: async ({ request }) => {
    const form = await superValidate(request, mainGuestRsvpSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    // Set submission values
    form.data.reservationTime = new Date();
    form.data.updatedTime = form.data.reservationTime;
    form.data.reserved = true;

    const { additionalGuests, ...mainGuestData } = form.data;

    await db.update(mainGuest).set(mainGuestData).where(eq(mainGuest.id, mainGuestData.id));
    info(`Guest informtion for ${mainGuestData.nickName} updated`, mainGuestData.id);

    return { form };
  }
};
