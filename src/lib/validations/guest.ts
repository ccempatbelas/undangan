import { additionalGuest, mainGuest } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const phoneRegex = new RegExp(/^[0-9+()\s-]{7,}$/);

// additionalGuest
const additionalGuestBaseSchema = createInsertSchema(additionalGuest, {
  id: z.number(),
  fullName: z.string().min(5, 'Name must contain at least 5 characters')
});
export const additionalGuestChairSchema = additionalGuestBaseSchema
  .pick({ id: true, fullName: true })
  .required();

// Main Guest
export const mainGuestBaseSchema = createInsertSchema(mainGuest, {
  plusOneAllowed: z.boolean().default(false),
  priority: z.enum(['1', '2', '3']).default('1')
}).extend({
  additionalGuests: additionalGuestBaseSchema.array()
});

export const mainGuestInsertSchema = mainGuestBaseSchema
  .pick({
    priority: true,
    plusOneAllowed: true
  })
  .extend({
    nickName: z.string().min(5, 'Nick name must contain at least 5 characters').default(''),
    group: z.string().min(1, 'Group name cannot be empty').default(''),
    phoneNumber: z.string().default('')
  });

export const mainGuestRemoveSchema = mainGuestBaseSchema
  .pick({ id: true, nickName: true })
  .required();

export const mainGuestCheckInSchema = mainGuestBaseSchema
  .pick({
    id: true,
    nickName: true,
    angpau: true,
    gift: true,
    actualGuestAmount: true,
    note: true,
    checkedIn: true,
    checkInTime: true,
    checkedInBy: true
  })
  .required();

export const mainGuestRsvpSchema = mainGuestBaseSchema
  .required({
    id: true
  })
  .extend({
    fullName: z.string({ invalid_type_error: 'Full name cannot be empty' }).default(''),
    phoneNumber: z
      .string({ invalid_type_error: 'Phone number cannot be empty' })
      .regex(phoneRegex, 'Invalid phone number format')
      .default('')
  });

export const mainGuestChairSchema = mainGuestBaseSchema
  .pick({ id: true, nickName: true, fullName: true })
  .required();

export type GuestChairSelect = {
  id: string | number | null;
  fullName: string | null;
  nickName?: string;
}[];

export const mainGuestEmailSchema = mainGuestBaseSchema
  .pick({ id: true, nickName: true })
  .extend({ email: z.string().default('') });
export const emailSendSchema = mainGuestEmailSchema.extend({
  email: z
    .string({ invalid_type_error: 'Email cannot be empty' })
    .email({ message: 'Invalid email address' })
    .default('')
});
