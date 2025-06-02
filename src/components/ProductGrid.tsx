
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'freefire' | 'recharge'>('all');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.provider && product.provider.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Products', icon: '🎯' },
    { id: 'freefire', label: 'Free Fire', icon: '💎' },
    { id: 'recharge', label: 'Mobile Recharge', icon: '📱' }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id as any)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'border-2 border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
