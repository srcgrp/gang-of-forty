export interface ShopMenuItem {
  label: string;
  href: string;
}
export interface ShopScheduleItem {
  days: string;
  time: string;
}
export interface ShopHours {
  open: string;
  close: string;
}
export interface Shop {
  name: string;
  slogan: string | null;
  owner: string;
  city: string;
  phone: string;
  hours: ShopHours;
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string | null;
  about: string;
  address: string;
  schedule: ShopScheduleItem[];
  menu: ShopMenuItem[];
  copyright: string;
}
