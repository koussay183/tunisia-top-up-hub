
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { useCart } from '../hooks/useCart';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout with items:', cartItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎮 Gaming Cards & 📱 Mobile Recharge
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Instant delivery • Secure payment • Best prices in Tunisia
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              ⚡ Instant delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              🔒 Secure payment
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              💰 Best prices
            </div>
          </div>
        </div>
      </section>

      <ProductGrid searchQuery={searchQuery} />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">TunisiaCards</h3>
          <p className="text-gray-300 mb-4">
            Your trusted partner for gaming cards and mobile recharge in Tunisia
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>🕒 24/7 Support</span>
            <span>📞 Contact: 123-456-789</span>
            <span>📧 info@tunisiacards.tn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
