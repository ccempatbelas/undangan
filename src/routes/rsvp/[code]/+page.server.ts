import type { Actions } from './$types';
import { db } from '@/db';
import { additionalGuest, mainGuest } from '@/db/schema';
import { info } from '@/lib/logger/logger';
import { email } from '@/lib/messages';
import { emailSendSchema, mainGuestRsvpSchema } from '@/lib/validations/guest';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import postgres from 'postgres';
import { message, superValidate } from 'sveltekit-superforms/server';

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL_ADDRESS,
pass: process.env.EMAIL_PASSWORD
}
});

export const actions: Actions = {
submit: async ({ request }) => {
const form = await superValidate(request, mainGuestRsvpSchema);

if (!form.valid && (form.data.attendingHolyMat || form.data.attendingReception)) {
return fail(400, { form });
}

// Set submission values
form.data.reservationTime = new Date();
form.data.updatedTime = form.data.reservationTime;
form.data.reserved = true;

const { additionalGuests, ...mainGuestData } = form.data;
const plusOneArray = additionalGuests.filter((guest) => !guest.manualyAdded);

try {
await db.transaction(async (tx) => {
// Update Main Guest
await tx.update(mainGuest).set(mainGuestData).where(eq(mainGuest.id, mainGuestData.id));
info(`Guest informtion for ${mainGuestData.nickName} updated`, mainGuestData.id);

// Insert, Update, or Delete plus one if availaible
if (plusOneArray.length == 1) {
const plusOne = plusOneArray[0];

if (plusOne.id == undefined) {
await tx.insert(additionalGuest).values(plusOne);
info(`Added new additional guest: ${plusOne.fullName}`, mainGuestData.id);
} else {
await tx.update(additionalGuest).set(plusOne).where(eq(additionalGuest.id, plusOne.id));
info(`Updated additional guest: ${plusOne.fullName}`, mainGuestData.id);
}
} else {
// Check if need to be deleted
const plusOne = await tx.query.additionalGuest.findFirst({
where: and(
eq(additionalGuest.inviterId, mainGuestData.id),
eq(additionalGuest.manualyAdded, false)
)
});

if (plusOne != undefined && plusOneArray.length == 0) {
await tx.delete(additionalGuest).where(eq(additionalGuest.id, plusOne.id));
info(`remowe additional guest: ${plusOne.fullName}`, mainGuestData.id);
}
}
});
} catch (e) {
if (e instanceof postgres.PostgresError && e.code == '23505') {
form.data.reserved = false;
return message(form, `Guest already exists`);
} else {
throw e;
}
}
return { form };
},

email: async ({ request }) => {
const form = await superValidate(request, emailSendSchema);

if (!form.valid) {
return fail(400, { form });
}

const info = await transporter.sendMail({
from: '"Nikolas Setiawan"', // sender address
to: form.data.email, // list of receivers
subject: 'Nikolas & Michely Wedding ✔', // Subject line
html: email.replace('{{id}}', form.data.id as string).replace('{{name}}', form.data.nickName)
});

console.log(info.messageId);
console.log(form);
return { form };
}
};
