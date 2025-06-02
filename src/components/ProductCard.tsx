
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '../hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { Gamepad2, Smartphone, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(1)}DT`;
  };

  const getProviderLogo = (provider?: string) => {
    const logoUrls = {
      'ooredoo': '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
      'orange': '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
      'tunisie_telecom': '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png'
    };
    return provider ? logoUrls[provider as keyof typeof logoUrls] : '';
  };

  const getProviderColor = (provider?: string) => {
    switch (provider) {
      case 'ooredoo': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'tunisie_telecom': return 'from-purple-500 to-purple-600';
      default: return 'from-purple-500 to-purple-600';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0 shadow-lg">
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${getProviderColor(product.provider)} flex items-center justify-center p-6`}>
          {product.category === 'freefire' ? (
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center">
                <img 
                  src="https://logoeps.com/wp-content/uploads/2021/03/free-fire-vector-logo.png" 
                  alt="Free Fire" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-xl font-bold">{product.name}</div>
              <div className="text-sm opacity-90 mt-1">Free Fire Diamonds</div>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-3">
                {getProviderLogo(product.provider) && (
                  <img 
                    src={getProviderLogo(product.provider)} 
                    alt={product.provider} 
                    className="h-12 w-auto object-contain bg-white rounded-lg p-2"
                  />
                )}
              </div>
              <div className="text-xl font-bold">{product.data}</div>
              <div className="text-sm opacity-90 mt-1">Data Package</div>
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <span className="text-sm font-bold text-gray-800">{formatPrice(product.price)}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-600">{formatPrice(product.price)}</span>
          {product.category === 'recharge' && (
            <div className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              <Smartphone className="w-3 h-3 mr-1" />
              30 days
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
