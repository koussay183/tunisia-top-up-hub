
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'freefire' | 'pubg' | 'codm' | 'recharge';
  provider?: 'ooredoo' | 'orange' | 'tunisie_telecom';
  data?: string;
  image: string;
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
  items: CartItem[];
  total: number;
  paymentScreenshot?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}
