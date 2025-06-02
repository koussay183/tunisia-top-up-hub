
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { CheckoutForm } from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { Zap, Shield, DollarSign } from 'lucide-react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gaming Cards & Mobile Recharge
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Instant delivery • Secure payment • Best prices in Tunisia
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-base">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Instant delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Secure payment
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Best prices
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

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">TahaShop</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Your trusted partner for gaming cards and mobile recharge in Tunisia
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>🕒 24/7 Support</span>
            <span>📞 Contact: 123-456-789</span>
            <span>📧 info@tahashop.tn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
