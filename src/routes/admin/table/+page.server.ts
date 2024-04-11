import type { Actions, PageServerLoad } from './$types';
import { db } from '@/db';
import { type Chair, additionalGuest, chair, mainGuest, table } from '@/db/schema';
import { info, warning } from '@/lib/logger/logger';
import { chairSaveSchema } from '@/lib/validations/chair';
import { tableInsertSchema, tableSaveLayoutSchema, tableSaveSchema } from '@/lib/validations/table';
import { fail } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import postgres from 'postgres';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
  const tables = await db.query.table.findMany({
    with: {
      chairs: {
        with: {
          mainGuest: { columns: { id: true, nickName: true, fullName: true } },
          additionalGuest: { columns: { id: true, fullName: true } }
        }
      }
    }
  });
  const guests = await db.query.mainGuest.findMany({
    columns: { id: true, nickName: true, fullName: true, chairId: true },
    with: {
      additionalGuests: { columns: { id: true, fullName: true, chairId: true } }
    },
    where: and(eq(mainGuest.reserved, true), eq(mainGuest.attendingReception, true))
  });
  const addForm = await superValidate(tableInsertSchema);
  return { tables, addForm, guests };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await superValidate(request, tableInsertSchema.required({ numberOfChair: true }));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { numberOfChair, ...data } = form.data;

    try {
      await db.transaction(async (tx) => {
        const [t] = await tx.insert(table).values(data).returning();
        const chairs = Array.from({ length: numberOfChair }, (_, i) => {
          return {
            number: i + 1,
            tableId: t.id
          } as Chair;
        });
        await tx.insert(chair).values(chairs);
      });
    } catch (e) {
      if (e instanceof postgres.PostgresError && e.code == '23505') {
        return message(form, `Table number ${data.number} already exists`);
      } else {
        throw e;
      }
    }
    info(`Added new table: ${table.number}`, 'admin');
  },

  save: async ({ request }) => {
    const form = await superValidate(await request.json(), tableSaveLayoutSchema);
    await db.transaction(async (tx) => {
      for (const t of form.data.tables) {
        await tx
          .update(table)
          .set({ ...t, updatedTime: new Date() })
          .where(eq(table.id, t.id));
      }
    });
  },

  editTable: async ({ request }) => {
    const form = await superValidate(request, tableSaveSchema);
    try {
      await db.update(table).set(form.data).where(eq(table.id, form.data.id));
    } catch (e) {
      if (e instanceof postgres.PostgresError && e.code == '23505') {
        return message(form, `Seat number ${form.data.number} already exists`);
      } else {
        throw e;
      }
    }
    info(`Updated table: ${table.number}`, 'admin');
    return { form };
  },

  deleteTable: async ({ request }) => {
    const form = await superValidate(request, tableSaveSchema);
    await db.delete(table).where(eq(table.id, form.data.id));
    warning(`Removed table: ${table.number}`, 'admin');
  },

  editChair: async ({ request }) => {
    const form = await superValidate(request, chairSaveSchema);

    await db.transaction(async (tx) => {
      if (form.data.guestId == null) {
        await tx
          .update(mainGuest)
          .set({ chairId: null })
          .where(eq(mainGuest.chairId, form.data.id));
        await tx
          .update(additionalGuest)
          .set({ chairId: null })
          .where(eq(additionalGuest.chairId, form.data.id));
        info(`Removed chair: ${form.data.id} from guest: ${form.data.guestId}`, 'admin');
      } else if (typeof form.data.guestId == 'string') {
        await tx
          .update(mainGuest)
          .set({ chairId: form.data.id })
          .where(eq(mainGuest.id, form.data.guestId));
        await tx
          .update(additionalGuest)
          .set({ chairId: null })
          .where(eq(additionalGuest.chairId, form.data.id));
        info(`Updated chair to: ${form.data.id} for guest: ${form.data.guestId}`, 'admin');
      } else if (typeof form.data.guestId == 'number') {
        await tx
          .update(additionalGuest)
          .set({ chairId: form.data.id })
          .where(eq(additionalGuest.id, form.data.guestId));
        await tx
          .update(mainGuest)
          .set({ chairId: null })
          .where(eq(mainGuest.chairId, form.data.id));
        info(`Updated chair to: ${form.data.id} for guest: ${form.data.guestId}`, 'admin');
      }
    });

    return { form };
  }
};
