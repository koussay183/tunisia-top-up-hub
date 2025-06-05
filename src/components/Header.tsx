
import { useState } from 'react';
import { ShoppingCart, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ onCartClick, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, isLoaded } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const totalItems = getTotalItems();
  console.log('Header - Total items:', totalItems, 'isLoaded:', isLoaded);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-5 h-5 md:w-7 md:h-7 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Chargili</h1>
              <p className="text-xs md:text-sm text-purple-100 hidden sm:block">Gaming Cards & Mobile Recharge</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCartClick}
            className="relative text-white hover:text-purple-200 hover:bg-white/10 p-2"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {isLoaded && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="mt-3 md:mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <Input
            type="text"
            placeholder="Search for games or mobile recharge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 md:pl-12 bg-white/95 border-0 text-gray-700 placeholder-gray-500 h-10 md:h-12 text-sm md:text-base rounded-xl"
          />
        </form>
      </div>
    </header>
  );
};
