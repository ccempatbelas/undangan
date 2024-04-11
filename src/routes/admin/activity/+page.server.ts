import type { PageServerLoad } from './$types';
import { db } from '@/db';
import { activityLog } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const activityData = await db.query.activityLog.findMany({
    orderBy: desc(activityLog.createdTime)
  });

  return { activities: activityData };
};
