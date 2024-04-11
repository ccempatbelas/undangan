import { db } from '@/db';
import { type ActivityLog, activityLog } from '@/db/schema';

type Log = Omit<ActivityLog, 'id' | 'createdTime'>;
async function log(log: Log) {
  await db.insert(activityLog).values(log);
}

export async function info(msg: string, by: string) {
  await log({
    level: 'info',
    by,
    activity: msg
  });
}

export async function warning(msg: string, by: string) {
  await log({
    level: 'warning',
    by,
    activity: msg
  });
}

export async function error(msg: string, by: string) {
  console.error(msg);
  await log({
    level: 'error',
    by,
    activity: msg
  });
}
