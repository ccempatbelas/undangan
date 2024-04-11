import { registry } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Add Load Schema
const registryBaseSchema = createSelectSchema(registry);

export const registryInsertSchema = registryBaseSchema
	.extend({
		name: registryBaseSchema.shape.name.min(3, 'Name must contain at least 3 characters'),
		link: registryBaseSchema.shape.link.min(1, 'Link cannot be empty')
	})
	.omit({ id: true });

export const registryRemoveSchema = registryBaseSchema.pick({ id: true, name: true });
export const registryToggleSchema = registryBaseSchema
	.pick({ id: true, name: true, chosen: true })
	.extend({
		guest: z.string()
	});
