import { Product } from '../types';

export const defaultGames = [
  {
    id: 'freefire',
    name: 'Free Fire',
    logo: '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png',
    description: 'Garena Free Fire - Battle Royale Game',
    category: 'battle-royale'
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    logo: '',
    description: 'PlayerUnknown\'s Battlegrounds Mobile',
    category: 'battle-royale'
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    logo: '',
    description: 'Call of Duty Mobile',
    category: 'fps'
  },
  {
    id: 'mobilelegends',
    name: 'Mobile Legends',
    logo: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends Bang Bang',
    category: 'moba'
  },
  {
    id: 'efootball',
    name: 'eFootball',
    logo: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball Mobile',
    category: 'sports'
  }
];

export const defaultProviders = [
  {
    id: 'ooredoo',
    name: 'Ooredoo',
    logo: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo Tunisia'
  },
  {
    id: 'orange',
    name: 'Orange',
    logo: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange Tunisia'
  },
  {
    id: 'tunisie_telecom',
    name: 'Tunisie Telecom',
    logo: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom'
  }
];

export const defaultProducts: Product[] = [
  // Free Fire Gift Cards
  {
    id: 'ff-100',
    name: '100 Diamonds',
    price: 5000,
    category: 'freefire',
    image: '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png',
    description: 'Free Fire 100 Diamonds - Instant delivery',
    gameId: 'freefire'
  },
  {
    id: 'ff-500',
    name: '500 Diamonds',
    price: 22000,
    category: 'freefire',
    image: '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png',
    description: 'Free Fire 500 Diamonds - Instant delivery',
    gameId: 'freefire'
  },
  {
    id: 'ff-1000',
    name: '1000 Diamonds',
    price: 42000,
    category: 'freefire',
    image: '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png',
    description: 'Free Fire 1000 Diamonds - Instant delivery',
    gameId: 'freefire'
  },
  // PUBG Mobile
  {
    id: 'pubg-60',
    name: '60 UC',
    price: 4000,
    category: 'pubg',
    image: '',
    description: 'PUBG Mobile 60 UC - Instant delivery',
    gameId: 'pubg'
  },
  {
    id: 'pubg-325',
    name: '325 UC',
    price: 20000,
    category: 'pubg',
    image: '',
    description: 'PUBG Mobile 325 UC - Instant delivery',
    gameId: 'pubg'
  },
  // Call of Duty Mobile
  {
    id: 'codm-80',
    name: '80 CP',
    price: 4500,
    category: 'codm',
    image: '',
    description: 'Call of Duty Mobile 80 CP - Instant delivery',
    gameId: 'codm'
  },
  {
    id: 'codm-400',
    name: '400 CP',
    price: 21000,
    category: 'codm',
    image: '',
    description: 'Call of Duty Mobile 400 CP - Instant delivery',
    gameId: 'codm'
  },
  // Mobile Legends
  {
    id: 'ml-278',
    name: '278 Diamonds',
    price: 20000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 278 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  {
    id: 'ml-571',
    name: '571 Diamonds',
    price: 39000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 571 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  {
    id: 'ml-1192',
    name: '1192 Diamonds',
    price: 80000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 1192 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  {
    id: 'ml-1788',
    name: '1788 Diamonds',
    price: 115000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 1788 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  {
    id: 'ml-3007',
    name: '3007 Diamonds',
    price: 185000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 3007 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  {
    id: 'ml-3576',
    name: '3576 Diamonds',
    price: 220000,
    category: 'mobilelegends',
    image: '/lovable-uploads/17accab7-7b82-456f-92e9-9a149823464b.png',
    description: 'Mobile Legends 3576 Diamonds - Instant delivery',
    gameId: 'mobilelegends'
  },
  // eFootball
  {
    id: 'ef-130',
    name: '130 Coins',
    price: 5000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 130 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-300',
    name: '300 Coins',
    price: 10000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 300 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-550',
    name: '550 Coins',
    price: 20000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 550 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-750',
    name: '750 Coins',
    price: 25000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 750 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-1040',
    name: '1040 Coins',
    price: 35000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 1040 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-2130',
    name: '2130 Coins',
    price: 65000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 2130 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-3250',
    name: '3250 Coins',
    price: 100000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 3250 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-5700',
    name: '5700 Coins',
    price: 155000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 5700 Coins - Instant delivery',
    gameId: 'efootball'
  },
  {
    id: 'ef-12800',
    name: '12800 Coins',
    price: 345000,
    category: 'efootball',
    image: '/lovable-uploads/608bca17-0eca-4d48-b45e-59ffd2b3090f.png',
    description: 'eFootball 12800 Coins - Instant delivery',
    gameId: 'efootball'
  },
  // ... keep existing code (Ooredoo, Orange, Tunisie Telecom recharge packages)
  {
    id: 'ooredoo-25gb',
    name: '25GB Package',
    price: 30000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '25GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 25GB Data Package - 30 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-30gb',
    name: '30GB Package',
    price: 35000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '30GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 30GB Data Package - 30 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-75gb',
    name: '75GB Package',
    price: 65000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '75GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 75GB Data Package - 60 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-100gb',
    name: '100GB Package',
    price: 75000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '100GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 100GB Data Package - 90 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-200gb',
    name: '200GB Package',
    price: 100000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '200GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 200GB Data Package - 120 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-500gb',
    name: '500GB Package',
    price: 250000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '500GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 500GB Data Package - 5 months validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-1000gb',
    name: '1000GB Package',
    price: 490000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '1000GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 1000GB Data Package - 1 year validity',
    providerId: 'ooredoo'
  },
  // Orange Recharge Packages
  {
    id: 'orange-25gb',
    name: '25GB Package',
    price: 30000,
    category: 'recharge',
    provider: 'orange',
    data: '25GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 25GB Data Package - 30 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-30gb',
    name: '30GB Package',
    price: 35000,
    category: 'recharge',
    provider: 'orange',
    data: '30GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 30GB Data Package - 30 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-75gb',
    name: '75GB Package',
    price: 65000,
    category: 'recharge',
    provider: 'orange',
    data: '75GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 75GB Data Package - 60 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-100gb',
    name: '100GB Package',
    price: 75000,
    category: 'recharge',
    provider: 'orange',
    data: '100GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 100GB Data Package - 90 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-200gb',
    name: '200GB Package',
    price: 100000,
    category: 'recharge',
    provider: 'orange',
    data: '200GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 200GB Data Package - 120 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-500gb',
    name: '500GB Package',
    price: 250000,
    category: 'recharge',
    provider: 'orange',
    data: '500GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 500GB Data Package - 5 months validity',
    providerId: 'orange'
  },
  {
    id: 'orange-1000gb',
    name: '1000GB Package',
    price: 490000,
    category: 'recharge',
    provider: 'orange',
    data: '1000GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 1000GB Data Package - 1 year validity',
    providerId: 'orange'
  },
  // Tunisie Telecom Recharge Packages - Different pricing structure
  {
    id: 'tt-25gb',
    name: '25GB Package',
    price: 30000,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '25GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 25GB Data Package - 30 days validity',
    providerId: 'tunisie_telecom'
  },
  {
    id: 'tt-60gb',
    name: '60GB Package',
    price: 60000,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '60GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 60GB Data Package - 30 days validity',
    providerId: 'tunisie_telecom'
  },
  {
    id: 'tt-110gb',
    name: '110GB Package',
    price: 80000,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '110GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 110GB Data Package - 60 days validity',
    providerId: 'tunisie_telecom'
  },
  {
    id: 'tt-200gb',
    name: '200GB Package',
    price: 100000,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '200GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 200GB Data Package - 90 days validity',
    providerId: 'tunisie_telecom'
  }
];
