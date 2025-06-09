
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { defaultGames } from '../data/defaultData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart(product);
    
    // Get current quantity for this product
    const existingItem = cartItems.find(item => item.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
    
    toast({
      title: t('cart.addedToCart'),
      description: t('cart.addedDesc', { productName: product.name, quantity: newQuantity }),
    });
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(1)}DT`;
  };

  const getValidityPeriod = (product: Product) => {
    if (product.category !== 'recharge') return '';
    
    // Extract validity from description
    if (product.description.includes('30 days')) return '30 days';
    if (product.description.includes('60 days')) return '60 days';
    if (product.description.includes('90 days')) return '90 days';
    if (product.description.includes('120 days')) return '120 days';
    if (product.description.includes('5 months')) return '5 months';
    if (product.description.includes('1 year')) return '1 year';
    
    return '30 days'; // fallback
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
    if (category === 'mobilelegends') return 'from-purple-500 to-pink-600';
    if (category === 'efootball') return 'from-green-500 to-blue-500';
    
    switch (provider) {
      case 'ooredoo': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'tunisie_telecom': return 'from-purple-500 to-purple-600';
      default: return 'from-purple-500 to-blue-600';
    }
  };

  const getGameLogo = (category: string) => {
    const game = defaultGames.find(g => g.id === category);
    return game?.logo || product.image;
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white border-0 shadow-lg rounded-2xl group relative min-w-[280px] flex-shrink-0">
      <div className="relative">
        <div className={`h-40 md:h-48 bg-gradient-to-br ${getProviderColor(product.provider, product.category)} flex items-center justify-center p-4 md:p-6 relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 md:top-4 md:left-4 w-12 md:w-20 h-12 md:h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-8 md:w-16 h-8 md:h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-16 md:w-24 h-16 md:h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {product.category === 'freefire' || product.category === 'pubg' || product.category === 'codm' || product.category === 'mobilelegends' || product.category === 'efootball' ? (
            <div className="text-center text-white relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={getGameLogo(product.category)} 
                  alt={product.category} 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback to category name if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-sm md:text-lg font-bold text-gray-800">${product.category.toUpperCase()}</div>`;
                    }
                  }}
                />
              </div>
              <div className="text-lg md:text-xl font-bold mb-1 md:mb-2">{product.name}</div>
              <div className="text-xs md:text-sm opacity-90 bg-white/20 px-2 md:px-3 py-1 rounded-full">
                {product.category === 'freefire' || product.category === 'mobilelegends' ? t('products.diamonds') : t('products.credits')}
              </div>
            </div>
          ) : (
            <div className="text-center text-white relative z-10">
              <div className="flex items-center justify-center mb-2 md:mb-3">
                {getProviderLogo(product.provider) && (
                  <img 
                    src={getProviderLogo(product.provider)} 
                    alt={product.provider} 
                    className="h-10 md:h-12 w-auto object-contain bg-white rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{product.data}</div>
              <div className="text-xs md:text-sm opacity-90 bg-white/20 px-2 md:px-3 py-1 rounded-full">
                {product.provider?.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          )}
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-2 shadow-lg border border-white/20">
          <span className="text-sm md:text-base font-bold text-gray-800">{formatPrice(product.price)}</span>
        </div>

        {/* Popular Badge */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-yellow-400 text-yellow-900 rounded-lg md:rounded-xl px-2 md:px-3 py-1 shadow-lg flex items-center">
          <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 fill-current" />
          <span className="text-xs font-bold">{t('products.popular')}</span>
        </div>
      </div>
      
      <CardContent className="p-3 md:p-4">
        <h3 className="font-bold text-gray-800 mb-2 text-base md:text-lg leading-tight">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed line-clamp-2">{product.description}</p>
        
        {product.category === 'recharge' && (
          <div className="flex items-center justify-center">
            <div className="flex items-center text-xs md:text-sm bg-purple-50 text-purple-600 px-2 md:px-3 py-1 rounded-full font-medium">
              {getValidityPeriod(product)} validity
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 md:p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          {t('products.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
};
