export type LinkItem = {
  href: string;
  label: string;
};

export type Shop = {
  help: LinkItem[];
  menu: LinkItem[];
  about: string;
  schedule: {
    days: string;
    time: string;
  }[];
  phone: string;
  address: string;
  name: string;
  copyright: string;
  notice: string;
};