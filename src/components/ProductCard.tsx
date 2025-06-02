
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '../hooks/useCart';
import { toast } from '@/hooks/use-toast';

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

  const getProviderColor = (provider?: string) => {
    switch (provider) {
      case 'ooredoo': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'tunisie_telecom': return 'from-blue-500 to-blue-600';
      default: return 'from-purple-500 to-purple-600';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${getProviderColor(product.provider)} flex items-center justify-center`}>
          <div className="text-center text-white">
            {product.category === 'freefire' ? (
              <div>
                <div className="text-2xl font-bold mb-2">💎</div>
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="text-sm opacity-90">Free Fire</div>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold mb-2">📱</div>
                <div className="text-lg font-semibold">{product.data}</div>
                <div className="text-sm opacity-90 capitalize">{product.provider?.replace('_', ' ')}</div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-sm font-bold text-gray-700">{formatPrice(product.price)}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">{formatPrice(product.price)}</span>
          {product.category === 'recharge' && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              30 days
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
