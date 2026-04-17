import { cookies } from 'next/headers';

export const COOKIE_NAME = 'padrino_admin_v2';

export function createSession(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export function verifySession(token: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  return token.length > 0 && token === expected;
}

export async function getSessionFromCookie(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySession(token);
  } catch {
    return false;
  }
}
