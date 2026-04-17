import { NextRequest, NextResponse } from 'next/server';
import { getMenuData, setMenuData } from '@/lib/storage';
import { getSessionFromCookie } from '@/lib/auth';
import { MenuData } from '@/types/menu';

export async function GET() {
  const data = await getMenuData();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const isAdmin = await getSessionFromCookie();
  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const data: MenuData = await req.json();
  data.updatedAt = new Date().toISOString();
  await setMenuData(data);

  return NextResponse.json({ ok: true });
}
