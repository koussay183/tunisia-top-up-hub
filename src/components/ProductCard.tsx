
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
      'ooredoo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ooredoo_logo.svg/2560px-Ooredoo_logo.svg.png',
      'orange': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2560px-Orange_logo.svg.png',
      'tunisie_telecom': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Tunisie_T%C3%A9l%C3%A9com.svg/1280px-Tunisie_T%C3%A9l%C3%A9com.svg.png'
    };
    return provider ? logoUrls[provider as keyof typeof logoUrls] : '';
  };

  const getProviderColor = (provider?: string) => {
    switch (provider) {
      case 'ooredoo': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'tunisie_telecom': return 'from-blue-500 to-blue-600';
      default: return 'from-purple-500 to-purple-600';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border-0 shadow-lg">
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${getProviderColor(product.provider)} flex items-center justify-center p-6`}>
          {product.category === 'freefire' ? (
            <div className="text-center text-white">
              <Gamepad2 className="w-12 h-12 mx-auto mb-3" />
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
                    className="h-10 w-auto object-contain bg-white rounded-lg p-2"
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
