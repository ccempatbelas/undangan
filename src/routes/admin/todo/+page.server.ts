import type { PageServerLoad } from './$types';
import { db } from '@/db';
import { guestTodo, todo } from '@/db/schema';
import { info, warning } from '@/lib/logger/logger';
import { todoDoneSchema, todoInsertSchema, todoRemoveSchema } from '@/lib/validations/todo';
import { type Actions, error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
  const todos = await db.query.todo.findMany();
  const addForm = superValidate(todoInsertSchema);
  return { todos, addForm };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await superValidate(request, todoInsertSchema.required({ dueDate: true }));

    if (!form.valid) {
      return fail(400, { form });
    }
    await db.transaction(async (tx) => {
      const [data] = await tx.insert(todo).values(form.data).returning();
      if (!data) throw error(404, { message: `failed to insert new todo` });

      if (form.data.guestAction) {
        const guests = await tx.query.mainGuest.findMany({ columns: { id: true } });
        if (guests.length != 0) {
          const guestTodos = guests.map((g) => ({ guestId: g.id, todoId: data.id }));
          await tx.insert(guestTodo).values(guestTodos);
        }
      }
    });

    await info(`Added new todo: ${form.data.item}`, 'admin');

    return { form };
  },
  remove: async ({ request }) => {
    const form = await superValidate(request, todoRemoveSchema);
    await db.delete(todo).where(eq(todo.id, form.data.id));
    await warning(`Removed todo: ${form.data.item}`, 'admin');
  },
  done: async ({ request }) => {
    const form = await superValidate(request, todoDoneSchema);
    await db.update(todo).set({ done: true }).where(eq(todo.id, form.data.id));
    await info(`todo done: ${form.data.item}`, 'admin');
  }
};
