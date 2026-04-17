import { MenuData } from '@/types/menu';
import { defaultMenu } from '@/data/defaultMenu';

const MENU_KEY = 'menu:data';

let inMemoryData: MenuData | null = null;

async function getKV() {
  if (!process.env.KV_REST_API_URL) return null;
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

export async function getMenuData(): Promise<MenuData> {
  const kv = await getKV();
  if (kv) {
    try {
      const data = await kv.get<MenuData>(MENU_KEY);
      if (data) return data;
      // Seed initial data
      await kv.set(MENU_KEY, defaultMenu);
      return defaultMenu;
    } catch (e) {
      console.error('KV error:', e);
    }
  }

  // Local dev fallback: in-memory
  if (!inMemoryData) {
    inMemoryData = JSON.parse(JSON.stringify(defaultMenu));
  }
  return inMemoryData!;
}

export async function setMenuData(data: MenuData): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.set(MENU_KEY, data);
    return;
  }
  inMemoryData = data;
}
