
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Grid, Gamepad2, Smartphone, Loader2 } from 'lucide-react';

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'games' | 'recharge'>('all');
  const { products, loading, error } = useProducts();

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

  const categories = [
    { id: 'all', label: 'All Products', icon: Grid },
    { id: 'games', label: 'Game Cards', icon: Gamepad2 },
    { id: 'recharge', label: 'Mobile Recharge', icon: Smartphone }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600 text-sm md:text-base">Loading products...</span>
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

      {/* Products Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 md:py-20">
          <Grid className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-300 mb-4 md:mb-6" />
          <h3 className="text-xl md:text-2xl font-semibold text-gray-500 mb-2 md:mb-3">No products found</h3>
          <p className="text-gray-400 text-base md:text-lg">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
