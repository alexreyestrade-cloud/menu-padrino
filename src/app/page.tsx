import { getMenuData } from '@/lib/storage';
import MenuDisplay from '@/components/MenuDisplay';

export const revalidate = 60;

export default async function HomePage() {
  const menuData = await getMenuData();
  return <MenuDisplay menuData={menuData} />;
}
