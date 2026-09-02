import { Redis } from '@upstash/redis';

export interface AnalyticsEvent {
  id: string;
  type: 'PAGE_VIEW' | 'QUIZ_START' | 'QUIZ_COMPLETE' | 'PAYMENT_INIT' | 'PAYMENT_SUCCESS';
  timestamp: string;
  childName?: string;
  ageGroup?: string;
  archetypeId?: string;
  archetypeTitle?: string;
  invoiceId?: string;
  amount?: number;
  userAgent?: string;
}

export interface AnalyticsStore {
  totalVisitors: number;
  events: AnalyticsEvent[];
}

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (redisClient) return redisClient;
  if (REDIS_URL && REDIS_TOKEN) {
    redisClient = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    return redisClient;
  }
  return null;
}

// In-memory fallback
let inMemoryStore: AnalyticsStore = {
  totalVisitors: 0,
  events: [],
};

export async function getAnalyticsData(): Promise<AnalyticsStore> {
  const redis = getRedis();

  if (redis) {
    try {
      const visitors = (await redis.get<number>('anzaar:visitors')) || 0;
      const rawEvents = await redis.lrange<any>('anzaar:events', 0, 100);

      const events: AnalyticsEvent[] = (rawEvents || []).map((e) => {
        if (typeof e === 'string') {
          try {
            return JSON.parse(e);
          } catch {
            return e;
          }
        }
        return e;
      });

      return {
        totalVisitors: Number(visitors),
        events,
      };
    } catch (err) {
      console.error('Redis read error, using fallback', err);
    }
  }

  return inMemoryStore;
}

export async function recordAnalyticsEvent(
  event: Omit<AnalyticsEvent, 'id' | 'timestamp'>
): Promise<AnalyticsEvent> {
  const newEvent: AnalyticsEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  const redis = getRedis();

  if (redis) {
    try {
      if (newEvent.type === 'PAGE_VIEW') {
        await redis.incr('anzaar:visitors');
      }

      // Prepend event to the list
      await redis.lpush('anzaar:events', JSON.stringify(newEvent));
      // Keep latest 500 events
      await redis.ltrim('anzaar:events', 0, 500);

      if (newEvent.type === 'PAYMENT_SUCCESS') {
        await redis.lpush('anzaar:payments', JSON.stringify(newEvent));
      }

      return newEvent;
    } catch (err) {
      console.error('Redis write error, using fallback', err);
    }
  }

  // Fallback in-memory
  if (newEvent.type === 'PAGE_VIEW') {
    inMemoryStore.totalVisitors += 1;
  }
  inMemoryStore.events.unshift(newEvent);
  if (inMemoryStore.events.length > 500) {
    inMemoryStore.events = inMemoryStore.events.slice(0, 500);
  }

  return newEvent;
}
