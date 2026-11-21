export type Shop = {
  name: string;
  slogan: string;
  owner: string;
  city: string;
  phone: string;
  hours: {
    open: string;
    close: string;
  };
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string;
  about: string;
  address: string;
  schedule: {
    days: string;
    time: string;
  }[];
  menu: {
    label: string;
    href: string;
  }[];
  help: {
    label: string;
    href: string;
  }[];
  copyright: string;
};

export type FrozenShop = Readonly<Shop>;

export type Home = {
  hero: {
    title: string;
    text: string;
    emoji: string;
    cta: {
      label: string;
      href: string;
    };
  };
  side: {
    title: string;
    text: string;
    emoji: string;
    cta: {
      label: string;
      href: string;
    };
  };
  promos: {
    text: string;
    emoji: string;
    color: string;
    href: string;
  }[];
  carousels: Array<
    | { id: string; title: string; emoji: string; source: "offers" }
    | { id: string; title: string; emoji: string; categoryId: number }
  >;
};
