import { chairSelectSchema } from './chair';
import { table } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const tableBaseSchema = createInsertSchema(table, {
  number: z.number().default(1),
  xPosition: z.number(),
  yPosition: z.number()
});
export const tableInsertSchema = tableBaseSchema.extend({
  numberOfChair: z.number().default(10)
});
export const tableSaveLayoutSchema = z.object({
  tables: tableBaseSchema.pick({ id: true, xPosition: true, yPosition: true }).required().array()
});
export const tableSaveSchema = tableBaseSchema.required();
export const tableSelectSchema = tableSaveSchema.extend({ chairs: chairSelectSchema.array() });
export type TableSelect = z.infer<typeof tableSelectSchema>;
