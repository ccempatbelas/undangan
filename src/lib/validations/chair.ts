import { additionalGuestChairSchema, mainGuestChairSchema } from './guest';
import { chair } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const chairBaseSchema = createSelectSchema(chair, {
  id: z.number(),
  number: z.number(),
  tableId: z.number()
});
export const chairSelectSchema = chairBaseSchema.extend({
  mainGuest: z.optional(mainGuestChairSchema),
  additionalGuest: z.optional(additionalGuestChairSchema)
});
export type ChairSelect = z.infer<typeof chairSelectSchema>;
export const chairSaveSchema = chairBaseSchema.pick({ id: true }).extend({
  guestId: z.nullable(z.union([z.string(), z.number()]))
});
