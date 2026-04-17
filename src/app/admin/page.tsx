import { getSessionFromCookie } from '@/lib/auth';
import { getMenuData } from '@/lib/storage';
import AdminClient from '@/components/AdminClient';

export default async function AdminPage() {
  const isAuth = await getSessionFromCookie();
  const menuData = isAuth ? await getMenuData() : null;

  return <AdminClient initialMenu={menuData} isAuthenticated={isAuth} />;
}
