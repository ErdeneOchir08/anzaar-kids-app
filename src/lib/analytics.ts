import fs from 'fs';
import path from 'path';

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
  ip?: string;
}

export interface AnalyticsStore {
  totalVisitors: number;
  events: AnalyticsEvent[];
}

// In-memory store fallback for serverless environments with local file persistence
let inMemoryStore: AnalyticsStore = {
  totalVisitors: 128,
  events: [
    {
      id: 'evt_init_1',
      type: 'PAYMENT_SUCCESS',
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      childName: 'Ану',
      ageGroup: 'preschool',
      archetypeId: 'gentle_observer',
      archetypeTitle: 'Зөөлөн Мэдрэмжтэй Ажиглагч',
      invoiceId: 'ANZ_1788310025',
      amount: 14900,
    },
    {
      id: 'evt_init_2',
      type: 'PAYMENT_SUCCESS',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      childName: 'Тэмүүлэн',
      ageGroup: 'school',
      archetypeId: 'energetic_pioneer',
      archetypeTitle: 'Эрч хүчтэй Манлайлагч',
      invoiceId: 'ANZ_1788308412',
      amount: 14900,
    },
    {
      id: 'evt_init_3',
      type: 'QUIZ_COMPLETE',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      childName: 'Билгүүн',
      ageGroup: 'preschool',
      archetypeId: 'focused_inquirer',
      archetypeTitle: 'Бодлоготой Судлаач',
    },
    {
      id: 'evt_init_4',
      type: 'QUIZ_START',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      childName: 'Энэрэл',
      ageGroup: 'toddler',
    },
  ],
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'analytics.json');

function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(inMemoryStore, null, 2));
    }
  } catch (e) {
    // Serverless read-only fallback
  }
}

export function getAnalyticsData(): AnalyticsStore {
  try {
    ensureDataFile();
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(content);
      // Merge with memory
      inMemoryStore = parsed;
      return parsed;
    }
  } catch (e) {
    // Return memory fallback
  }
  return inMemoryStore;
}

export function recordAnalyticsEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): AnalyticsEvent {
  const newEvent: AnalyticsEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  const current = getAnalyticsData();
  if (newEvent.type === 'PAGE_VIEW') {
    current.totalVisitors += 1;
  }
  current.events.unshift(newEvent);

  // Keep latest 200 events
  if (current.events.length > 200) {
    current.events = current.events.slice(0, 200);
  }

  inMemoryStore = current;

  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2));
  } catch (e) {
    // Serverless fallback
  }

  return newEvent;
}
