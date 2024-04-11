import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '@/db';
import { mainGuest } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
  const guest = await db.query.mainGuest.findFirst({
    where: eq(mainGuest.id, params.code),
    with: {
      additionalGuests: true
    }
  });
  return json(guest);
};
