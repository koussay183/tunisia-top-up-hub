
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
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-8 py-4 rounded-2xl transition-all text-base font-semibold shadow-lg ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200 border-0 transform scale-105'
                  : 'border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <Grid className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-500 mb-3">No products found</h3>
          <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
