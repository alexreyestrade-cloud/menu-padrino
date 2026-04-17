import { MenuData } from '@/types/menu';
import { defaultMenu } from '@/data/defaultMenu';

const MENU_KEY = 'menu:data';

let inMemoryData: MenuData | null = null;

function kvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function kvGet(key: string): Promise<MenuData | null> {
  const cfg = kvConfig();
  if (!cfg) return null;
  const res = await fetch(`${cfg.url}/get/${key}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.result ? (JSON.parse(json.result) as MenuData) : null;
}

async function kvSet(key: string, value: MenuData): Promise<void> {
  const cfg = kvConfig();
  if (!cfg) return;
  await fetch(`${cfg.url}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify(value)),
  });
}

export async function getMenuData(): Promise<MenuData> {
  try {
    const data = await kvGet(MENU_KEY);
    if (data) return data;
    const seed = JSON.parse(JSON.stringify(defaultMenu)) as MenuData;
    await kvSet(MENU_KEY, seed);
    return seed;
  } catch {
    // KV not available — fall through to in-memory
  }

  if (!inMemoryData) {
    inMemoryData = JSON.parse(JSON.stringify(defaultMenu)) as MenuData;
  }
  return inMemoryData;
}

export async function setMenuData(data: MenuData): Promise<void> {
  try {
    await kvSet(MENU_KEY, data);
    return;
  } catch {
    // fall through
  }
  inMemoryData = data;
}
