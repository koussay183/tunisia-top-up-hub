
import { useState } from 'react';
import { ShoppingCart, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({ onCartClick, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TahaShop</h1>
              <p className="text-sm text-purple-100">Gaming Cards & Mobile Recharge</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCartClick}
            className="relative text-white hover:text-purple-200 hover:bg-white/10"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for games or mobile recharge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/95 border-0 text-gray-700 placeholder-gray-500 h-12 text-base"
          />
        </form>
      </div>
    </header>
  );
};
