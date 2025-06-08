
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductSection } from './ProductSection';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
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
    const games = {};
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
    const providers = {};
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

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">{t('categories.all')}</TabsTrigger>
            <TabsTrigger value="games">Recharge Jeux</TabsTrigger>
            <TabsTrigger value="recharge">Recharge Internet</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {/* Gaming sections */}
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
            
            {/* Recharge sections */}
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

          <TabsContent value="games" className="space-y-12">
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

          <TabsContent value="recharge" className="space-y-12">
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('products.noProducts')}</h3>
            <p className="text-gray-500">{t('products.noProductsDesc')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
