
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'freefire' | 'pubg' | 'codm' | 'mobilelegends' | 'efootball' | 'recharge';
  provider?: 'ooredoo' | 'orange' | 'tunisie_telecom';
  data?: string;
  image: string;
  description: string;
  gameId?: string; // For gift cards
  providerId?: string; // For mobile packages
}

export interface Game {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  gameId?: string; // For game purchases
  gameEmail?: string; // For eFootball
  gamePassword?: string; // For eFootball
  items: CartItem[];
  total: number;
  paymentScreenshot?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface AdminSettings {
  id: string;
  d17Numbers: string[];
  updatedAt: Date;
}
