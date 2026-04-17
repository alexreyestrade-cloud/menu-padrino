import crypto from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'padrino_admin_session';

function getAdminToken(): string {
  const secret = process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export function createSession(): string {
  return getAdminToken();
}

export function verifySession(token: string): boolean {
  return token === getAdminToken();
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
