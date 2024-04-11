import { type InferModel, type InferSelectModel, relations, sql } from 'drizzle-orm';
import {
	boolean,
	char,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	smallint,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const priorityEnum = pgEnum('priority', ['1', '2', '3']);

export const mainGuest = pgTable('main_guest', {
	id: char('id', { length: 10 })
		.default(sql`(substr(md5(gen_random_uuid()::varchar),1 , 10))`)
		.primaryKey(),
	nickName: varchar('nick_name', { length: 191 }).notNull(),
	fullName: varchar('full_name', { length: 191 }).unique(),
	phoneNumber: varchar('phone_number', { length: 64 }),
	vegan: boolean('vegan').default(false).notNull(),
	wishes: varchar('wishes', { length: 1000 }),
	plusOneAllowed: boolean('plus_one_allowed').notNull(),
	priority: priorityEnum('priority').notNull(),
	reserved: boolean('reserved').default(false).notNull(),
	reservationTime: timestamp('reservation_time'),
	attendingHolyMat: boolean('attending_holy_mat'),
	attendingReception: boolean('attending_reception'),
	checkedIn: boolean('checked_in').default(false).notNull(),
	checkedInBy: varchar('checked_in_by', { length: 191 }),
	checkInTime: timestamp('check_in_time'),
	angpau: boolean('angpau').default(false).notNull(),
	gift: boolean('gift').default(false).notNull(),
	note: varchar('note', { length: 1000 }),
	actualGuestAmount: smallint('actual_guest_amount'),
	group: varchar('group', { length: 191 }).notNull(),
	chairId: smallint('chair_id')
		.unique()
		.references(() => chair.id, { onDelete: 'set null' }),
	createdTime: timestamp('created_time').defaultNow().notNull(),
	updatedTime: timestamp('updated_time').defaultNow().notNull()
});

export const mainGuestRelations = relations(mainGuest, ({ one, many }) => ({
	additionalGuests: many(additionalGuest),
	chair: one(chair, {
		fields: [mainGuest.chairId],
		references: [chair.id]
	}),
	todos: many(guestTodo)
}));

export type MainGuest = InferModel<typeof mainGuest>;

export const additionalGuest = pgTable('additional_guest', {
	id: serial('id').primaryKey(),
	fullName: varchar('full_name', { length: 191 }).unique().notNull(),
	phoneNumber: varchar('phone_number', { length: 64 }).notNull(),
	vegan: boolean('vegan').default(false).notNull(),
	inviterId: char('inviter_id', { length: 10 }).references(() => mainGuest.id, {
		onDelete: 'cascade'
	}),
	manualyAdded: boolean('manually_added').default(true).notNull(),
	chairId: smallint('chair_id')
		.unique()
		.references(() => chair.id, { onDelete: 'set null' }),
	createdTime: timestamp('created_time').defaultNow().notNull(),
	updatedTime: timestamp('updated_time').defaultNow().notNull()
});

export const additionalGuestRelations = relations(additionalGuest, ({ one }) => ({
	inviter: one(mainGuest, {
		fields: [additionalGuest.inviterId],
		references: [mainGuest.id]
	}),
	chair: one(chair, {
		fields: [additionalGuest.chairId],
		references: [chair.id]
	})
}));

export type AdditionalGuest = InferModel<typeof additionalGuest>;

export const todo = pgTable('todo', {
	id: serial('id').primaryKey(),
	item: varchar('item', { length: 382 }).notNull(),
	dueDate: timestamp('due').notNull(),
	guestAction: boolean('guest_action').default(false).notNull(),
	done: boolean('done').default(false).notNull(),
	createdTime: timestamp('created_time').defaultNow().notNull()
});
export type Todo = InferModel<typeof todo>;

export const todoRelations = relations(todo, ({ many }) => ({
	guests: many(guestTodo)
}));

export const levelEnum = pgEnum('level', ['debug', 'info', 'error', 'warning']);

export const activityLog = pgTable('activity_log', {
	id: serial('id').primaryKey(),
	by: varchar('by', { length: 10 }),
	level: levelEnum('level').notNull(),
	activity: varchar('activity', { length: 382 }).notNull(),
	createdTime: timestamp('created_time').defaultNow().notNull()
});

export type ActivityLog = InferModel<typeof activityLog>;

export const table = pgTable('table', {
	id: serial('id').primaryKey(),
	number: smallint('number').unique().notNull(),
	groupName: varchar('group_name', { length: 191 }),
	xPosition: smallint('x_position').notNull().default(0),
	yPosition: smallint('y_position').notNull().default(0),
	createdTime: timestamp('created_time').defaultNow().notNull(),
	updatedTime: timestamp('updated_time').defaultNow().notNull()
});

export const tableRelations = relations(table, ({ many }) => ({
	chairs: many(chair)
}));

export type Table = InferModel<typeof table>;

export const chair = pgTable('chair', {
	id: serial('id').primaryKey(),
	number: smallint('number').notNull(),
	tableId: smallint('table_id')
		.notNull()
		.references(() => table.id, { onDelete: 'cascade' }),
	createdTime: timestamp('created_time').defaultNow().notNull(),
	updatedTime: timestamp('updated_time').defaultNow().notNull()
});

export const chairRelations = relations(chair, ({ one }) => ({
	table: one(table, {
		fields: [chair.tableId],
		references: [table.id]
	}),
	mainGuest: one(mainGuest, {
		fields: [chair.id],
		references: [mainGuest.chairId]
	}),
	additionalGuest: one(additionalGuest, {
		fields: [chair.id],
		references: [additionalGuest.chairId]
	})
}));

export type Chair = InferModel<typeof chair>;

export const registry = pgTable('registry', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 191 }).notNull(),
	link: varchar('link', { length: 1000 }).notNull(),
	chosen: boolean('chosen').default(false).notNull()
});

export const guestTodo = pgTable(
	'guest_todo',
	{
		guestId: char('guest_id', { length: 10 })
			.notNull()
			.references(() => mainGuest.id, { onDelete: 'cascade' }),
		todoId: integer('todo_id')
			.notNull()
			.references(() => todo.id, { onDelete: 'cascade' }),
		done: boolean('done').default(false).notNull(),
		doneDate: timestamp('done_date')
	},
	(t) => ({
		pk: primaryKey(t.guestId, t.todoId)
	})
);

export type GuestTodo = InferSelectModel<typeof guestTodo>;

export const usersToGroupsRelations = relations(guestTodo, ({ one }) => ({
	guest: one(mainGuest, {
		fields: [guestTodo.guestId],
		references: [mainGuest.id]
	}),
	todo: one(todo, {
		fields: [guestTodo.todoId],
		references: [todo.id]
	})
}));
