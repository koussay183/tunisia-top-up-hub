
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
  // Ooredoo Recharge
  {
    id: 'ooredoo-25gb',
    name: '25GB Package',
    price: 15000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '25GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 25GB Data Package - 30 days validity',
    providerId: 'ooredoo'
  },
  {
    id: 'ooredoo-50gb',
    name: '50GB Package',
    price: 25000,
    category: 'recharge',
    provider: 'ooredoo',
    data: '50GB',
    image: '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
    description: 'Ooredoo 50GB Data Package - 30 days validity',
    providerId: 'ooredoo'
  },
  // Orange Recharge
  {
    id: 'orange-25gb',
    name: '25GB Package',
    price: 15500,
    category: 'recharge',
    provider: 'orange',
    data: '25GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 25GB Data Package - 30 days validity',
    providerId: 'orange'
  },
  {
    id: 'orange-50gb',
    name: '50GB Package',
    price: 26000,
    category: 'recharge',
    provider: 'orange',
    data: '50GB',
    image: '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
    description: 'Orange 50GB Data Package - 30 days validity',
    providerId: 'orange'
  },
  // Tunisie Telecom Recharge
  {
    id: 'tt-25gb',
    name: '25GB Package',
    price: 14500,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '25GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 25GB Data Package - 30 days validity',
    providerId: 'tunisie_telecom'
  },
  {
    id: 'tt-50gb',
    name: '50GB Package',
    price: 24500,
    category: 'recharge',
    provider: 'tunisie_telecom',
    data: '50GB',
    image: '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png',
    description: 'Tunisie Telecom 50GB Data Package - 30 days validity',
    providerId: 'tunisie_telecom'
  }
];
