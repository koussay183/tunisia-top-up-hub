
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductSection } from './ProductSection';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Gamepad2, Smartphone, Grid3X3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { defaultGames, defaultProviders } from '../data/defaultData';

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useTranslation();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'games') {
        filtered = products.filter(product => 
          ['freefire', 'pubg', 'codm', 'mobilelegends', 'efootball'].includes(product.category)
        );
      } else if (selectedCategory === 'recharge') {
        filtered = products.filter(product => product.category === 'recharge');
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  // Group products by category for better display
  const gameProducts = useMemo(() => {
    const games: { [key: string]: any[] } = {};
    filteredProducts
      .filter(product => ['freefire', 'pubg', 'codm', 'mobilelegends', 'efootball'].includes(product.category))
      .forEach(product => {
        if (!games[product.category]) {
          games[product.category] = [];
        }
        games[product.category].push(product);
      });
    return games;
  }, [filteredProducts]);

  const rechargeProducts = useMemo(() => {
    const providers: { [key: string]: any[] } = {};
    filteredProducts
      .filter(product => product.category === 'recharge')
      .forEach(product => {
        const provider = product.provider || 'other';
        if (!providers[provider]) {
          providers[provider] = [];
        }
        providers[provider].push(product);
      });
    return providers;
  }, [filteredProducts]);

  const getGameInfo = (gameId: string) => {
    return defaultGames.find(game => game.id === gameId);
  };

  const getProviderInfo = (providerId: string) => {
    return defaultProviders.find(provider => provider.id === providerId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-lg">{t('products.loading')}</span>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-gray-600">Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        {error && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border border-purple-200 shadow-xl rounded-2xl p-1 h-16">
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-2 rounded-xl font-semibold text-sm px-4 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-100"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('categories.allProducts')}</span>
              <span className="sm:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger 
              value="games"
              className="flex items-center gap-2 rounded-xl font-semibold text-sm px-4 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-100"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('categories.rechargeGames')}</span>
              <span className="sm:hidden">Games</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recharge"
              className="flex items-center gap-2 rounded-xl font-semibold text-sm px-4 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-100"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('categories.rechargeInternet')}</span>
              <span className="sm:hidden">Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12 mt-8">
            {Object.entries(gameProducts).map(([gameId, gameProductList]) => {
              const gameInfo = getGameInfo(gameId);
              return (
                <ProductSection
                  key={gameId}
                  title={gameInfo?.name || gameId}
                  products={gameProductList}
                  logo={gameInfo?.logo}
                />
              );
            })}
            
            {Object.entries(rechargeProducts).map(([providerId, providerProducts]) => {
              const providerInfo = getProviderInfo(providerId);
              return (
                <ProductSection
                  key={providerId}
                  title={providerInfo?.name || providerId}
                  products={providerProducts}
                  logo={providerInfo?.logo}
                />
              );
            })}
          </TabsContent>

          <TabsContent value="games" className="space-y-12 mt-8">
            {Object.entries(gameProducts).map(([gameId, gameProductList]) => {
              const gameInfo = getGameInfo(gameId);
              return (
                <ProductSection
                  key={gameId}
                  title={gameInfo?.name || gameId}
                  products={gameProductList}
                  logo={gameInfo?.logo}
                />
              );
            })}
          </TabsContent>

          <TabsContent value="recharge" className="space-y-12 mt-8">
            {Object.entries(rechargeProducts).map(([providerId, providerProducts]) => {
              const providerInfo = getProviderInfo(providerId);
              return (
                <ProductSection
                  key={providerId}
                  title={providerInfo?.name || providerId}
                  products={providerProducts}
                  logo={providerInfo?.logo}
                />
              );
            })}
          </TabsContent>
        </Tabs>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('products.noProducts')}</h3>
            <p className="text-gray-500">{t('products.noProductsDesc')}</p>
            {products.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Showing 0 of {products.length} total products
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
