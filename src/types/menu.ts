export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceWithBotana?: number;
  halfOrderPrice?: number;
  halfOrderPriceWithBotana?: number;
  available: boolean;
  imageUrl?: string;
}

export type SectionType =
  | 'single-price'
  | 'with-botana'
  | 'with-half-order'
  | 'bottles'
  | 'extras';

export interface MenuSection {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  type: SectionType;
  note?: string;
  items: MenuItem[];
}

export interface MenuData {
  sections: MenuSection[];
  updatedAt: string;
}
