import { guestTodo, todo } from '@/db/schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Add Load Schema
const todoBaseSchema = createSelectSchema(todo, {
  id: z.optional(z.number()),
  item: z.string().min(5, 'todo item must contain at least 5 characters'),
  dueDate: z.optional(z.date()),
  guestAction: z.boolean().default(false)
});
export const todoInsertSchema = todoBaseSchema
  .pick({
    item: true,
    guestAction: true
  })
  .extend({
    dueDate: z.date().default(new Date())
  });
export const todoSelectSchema = todoBaseSchema.required({ id: true });
export const todoRemoveSchema = todoSelectSchema.pick({ id: true, item: true });
export const todoDoneSchema = todoRemoveSchema;

export const todoToggleSchema = createInsertSchema(guestTodo);
