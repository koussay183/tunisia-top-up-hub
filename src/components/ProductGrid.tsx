
import { useState, useMemo } from 'react';
import { ProductSection } from './ProductSection';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Grid, Gamepad2, Smartphone, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'games' | 'recharge'>('all');
  const { products, loading, error } = useProducts();
  const { t } = useTranslation();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory === 'games') {
      filtered = filtered.filter(product => 
        ['freefire', 'pubg', 'codm'].includes(product.category)
      );
    } else if (activeCategory === 'recharge') {
      filtered = filtered.filter(product => product.category === 'recharge');
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.provider && product.provider.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  const groupedProducts = useMemo(() => {
    const groups = {
      games: {
        freefire: filteredProducts.filter(p => p.category === 'freefire'),
        pubg: filteredProducts.filter(p => p.category === 'pubg'),
        codm: filteredProducts.filter(p => p.category === 'codm'),
      },
      recharge: {
        ooredoo: filteredProducts.filter(p => p.provider === 'ooredoo'),
        orange: filteredProducts.filter(p => p.provider === 'orange'),
        tunisie_telecom: filteredProducts.filter(p => p.provider === 'tunisie_telecom'),
      }
    };
    return groups;
  }, [filteredProducts]);

  const getProviderLogo = (provider: string) => {
    const logoUrls = {
      'ooredoo': '/lovable-uploads/aec2e4d8-5f2c-496e-99f4-ebea34455e21.png',
      'orange': '/lovable-uploads/f5768551-82db-43a9-8064-505e7e73598a.png',
      'tunisie_telecom': '/lovable-uploads/06fe559e-ec75-468f-926f-624eb2846bef.png'
    };
    return logoUrls[provider as keyof typeof logoUrls];
  };

  const getGameLogo = (game: string) => {
    const logoUrls = {
      'freefire': '/lovable-uploads/ecfd21b9-e010-4202-b8a6-1d431f8202ce.png',
    };
    return logoUrls[game as keyof typeof logoUrls];
  };

  const categories = [
    { id: 'all', label: t('categories.all'), icon: Grid },
    { id: 'games', label: t('categories.games'), icon: Gamepad2 },
    { id: 'recharge', label: t('categories.recharge'), icon: Smartphone }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600 text-sm md:text-base">{t('products.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Category Filters - Mobile Optimized */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-8 md:mb-10 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl transition-all text-sm md:text-base font-semibold shadow-lg ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-200 border-0 transform scale-105'
                  : 'border-2 border-purple-200 text-purple-700 hover:bg-purple-50 bg-white hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <IconComponent className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>

      {/* Mobile Recharge Sections */}
      {(activeCategory === 'all' || activeCategory === 'recharge') && (
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mobile Recharge
          </h1>
          
          <ProductSection
            title="Ooredoo"
            products={groupedProducts.recharge.ooredoo}
            logo={getProviderLogo('ooredoo')}
          />
          
          <ProductSection
            title="Orange"
            products={groupedProducts.recharge.orange}
            logo={getProviderLogo('orange')}
          />
          
          <ProductSection
            title="Tunisie Telecom"
            products={groupedProducts.recharge.tunisie_telecom}
            logo={getProviderLogo('tunisie_telecom')}
          />
        </div>
      )}

      {/* Gaming Sections */}
      {(activeCategory === 'all' || activeCategory === 'games') && (
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Gaming Cards
          </h1>
          
          <ProductSection
            title="Free Fire"
            products={groupedProducts.games.freefire}
            logo={getGameLogo('freefire')}
          />
          
          <ProductSection
            title="PUBG Mobile"
            products={groupedProducts.games.pubg}
          />
          
          <ProductSection
            title="Call of Duty Mobile"
            products={groupedProducts.games.codm}
          />
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 md:py-20">
          <Grid className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-300 mb-4 md:mb-6" />
          <h3 className="text-xl md:text-2xl font-semibold text-gray-500 mb-2 md:mb-3">{t('products.noProducts')}</h3>
          <p className="text-gray-400 text-base md:text-lg">{t('products.noProductsDesc')}</p>
        </div>
      )}
    </div>
  );
};
