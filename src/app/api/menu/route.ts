import { NextRequest, NextResponse } from 'next/server';
import { getMenuData, setMenuData } from '@/lib/storage';
import { verifySession, COOKIE_NAME } from '@/lib/auth';
import { MenuData } from '@/types/menu';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getMenuData();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifySession(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data: MenuData = await req.json();
    data.updatedAt = new Date().toISOString();
    await setMenuData(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Error saving menu:', e);
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}
