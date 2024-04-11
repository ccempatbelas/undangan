import type { Actions, PageServerLoad } from './$types';
import { db } from '@/db';
import { guestTodo, mainGuest, todo } from '@/db/schema';
import { info, warning } from '@/lib/logger/logger';
import {
  mainGuestCheckInSchema,
  mainGuestInsertSchema,
  mainGuestRemoveSchema
} from '@/lib/validations/guest';
import { todoToggleSchema } from '@/lib/validations/todo';
import { error, fail } from '@sveltejs/kit';
import { and, asc, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
  const guests = await db.query.mainGuest.findMany({
    with: {
      additionalGuests: {
        with: {
          chair: {
            columns: { number: true },
            with: { table: { columns: { number: true } } }
          }
        }
      },
      chair: {
        columns: { number: true },
        with: { table: { columns: { number: true } } }
      },
      todos: { orderBy: asc(guestTodo.todoId) }
    },
    orderBy: asc(mainGuest.group)
  });
  const todos = await db.query.todo.findMany({
    where: eq(todo.guestAction, true),
    orderBy: asc(todo.id)
  });
  const addForm = await superValidate(mainGuestInsertSchema);
  const groups = [...new Set(guests.map((guest) => guest.group))];

  return { guests, todos, groups, addForm: addForm };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await superValidate(request, mainGuestInsertSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    await db.transaction(async (tx) => {
      const [guest] = await tx.insert(mainGuest).values(form.data).returning();
      if (!guest) throw error(404, { message: `failed to insert new guest` });

      const todos = await tx.query.todo.findMany({
        columns: { id: true },
        where: eq(todo.guestAction, true)
      });
      if (todos.length != 0) {
        const guestTodos = todos.map((t) => ({ guestId: guest.id, todoId: t.id }));
        await tx.insert(guestTodo).values(guestTodos);
      }
    });
    await info(`Added new guest: ${form.data.nickName}`, 'admin');
  },
  remove: async ({ request }) => {
    const form = await superValidate(request, mainGuestRemoveSchema);
    await db.delete(mainGuest).where(eq(mainGuest.id, form.data.id));
    await warning(`Removed guest: ${form.data.nickName}`, 'admin');
    return { form };
  },
  checkIn: async ({ request }) => {
    const form = await superValidate(request, mainGuestCheckInSchema);
    form.data.checkedIn = true;
    form.data.checkInTime = new Date();
    form.data.checkedInBy = 'admin';
    await db.update(mainGuest).set(form.data).where(eq(mainGuest.id, form.data.id));
    await info(`Checked in guest: ${form.data.nickName}`, 'admin');
    return { form };
  },
  toggleTodo: async ({ request }) => {
    const form = await superValidate(await request.json(), todoToggleSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.done) {
      form.data.doneDate = new Date();
    } else {
      form.data.doneDate = null;
    }

    await db
      .update(guestTodo)
      .set(form.data)
      .where(and(eq(guestTodo.todoId, form.data.todoId), eq(guestTodo.guestId, form.data.guestId)));
    await info(
      `guest ${form.data.guestId} todo ${form.data.todoId} toggled: ${form.data.done}`,
      'admin'
    );
    return { form };
  },
  update: async ({ request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);
    await db
      .update(mainGuest)
      .set(data)
      .where(eq(mainGuest.id, data.id as string));
    await info(`Updated guest: ${data.nickName}`, 'admin');
    return;
  }
};
