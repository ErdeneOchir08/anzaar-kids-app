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
}

export interface AnalyticsStore {
  totalVisitors: number;
  events: AnalyticsEvent[];
}

// 100% Clean initial live store with zero fake records
let inMemoryStore: AnalyticsStore = {
  totalVisitors: 0,
  events: [],
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
      inMemoryStore = parsed;
      return parsed;
    }
  } catch (e) {
    // Return memory store
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
    current.totalVisitors = (current.totalVisitors || 0) + 1;
  }
  
  // Ensure array exists
  if (!Array.isArray(current.events)) {
    current.events = [];
  }

  current.events.unshift(newEvent);

  // Safely keep latest 500 events
  if (current.events.length > 500) {
    current.events = current.events.slice(0, 500);
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
