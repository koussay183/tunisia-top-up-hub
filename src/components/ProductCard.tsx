import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '../hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart(product);
    
    // Get current quantity for this product
    const existingItem = cartItems.find(item => item.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${newQuantity}) has been added to your cart.`,
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

  const getProviderColor = (provider?: string, category?: string) => {
    if (category === 'freefire') return 'from-orange-500 to-red-600';
    if (category === 'pubg') return 'from-blue-600 to-purple-600';
    if (category === 'codm') return 'from-green-600 to-blue-600';
    
    switch (provider) {
      case 'ooredoo': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'tunisie_telecom': return 'from-purple-500 to-purple-600';
      default: return 'from-purple-500 to-blue-600';
    }
  };

  const getGameLogo = (category: string) => {
    switch (category) {
      case 'freefire':
        return '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png';
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border-0 shadow-xl rounded-3xl group">
      <div className="relative">
        <div className={`h-56 bg-gradient-to-br ${getProviderColor(product.provider, product.category)} flex items-center justify-center p-6 relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {product.category === 'freefire' || product.category === 'pubg' || product.category === 'codm' ? (
            <div className="text-center text-white relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                {getGameLogo(product.category) ? (
                  <img 
                    src={getGameLogo(product.category)} 
                    alt={product.category} 
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-800">
                    {product.category.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-xl font-bold mb-2">{product.name}</div>
              <div className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">
                {product.category === 'freefire' ? 'Diamonds' : 'Credits'}
              </div>
            </div>
          ) : (
            <div className="text-center text-white relative z-10">
              <div className="flex items-center justify-center mb-4">
                {getProviderLogo(product.provider) && (
                  <img 
                    src={getProviderLogo(product.provider)} 
                    alt={product.provider} 
                    className="h-16 w-auto object-contain bg-white rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="text-2xl font-bold mb-2">{product.data}</div>
              <div className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">
                {product.provider?.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          )}
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
          <span className="text-lg font-bold text-gray-800">{formatPrice(product.price)}</span>
        </div>

        {/* Popular Badge */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 rounded-xl px-3 py-1 shadow-lg flex items-center">
          <Star className="w-4 h-4 mr-1 fill-current" />
          <span className="text-xs font-bold">Popular</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-gray-800 mb-3 text-xl leading-tight">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{product.description}</p>
        
        {product.category === 'recharge' && (
          <div className="flex items-center justify-center">
            <div className="flex items-center text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium">
              30 days validity
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
