
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { CheckoutForm } from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { Zap, Shield, DollarSign, Gamepad2, Smartphone, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 text-white py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Gaming Cards & <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Mobile Recharge
            </span>
          </h2>
          <p className="text-2xl md:text-3xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Instant delivery • Secure payment • Best prices in Tunisia
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 flex items-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <Zap className="w-6 h-6 mr-3 text-yellow-400" />
              <span className="font-semibold">Instant Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 flex items-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <Shield className="w-6 h-6 mr-3 text-green-400" />
              <span className="font-semibold">Secure Payment</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 flex items-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <DollarSign className="w-6 h-6 mr-3 text-blue-400" />
              <span className="font-semibold">Best Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-4">
            What We Offer
          </h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Choose from our wide selection of gaming cards and mobile recharge packages
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Gaming Cards</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Free Fire, PUBG Mobile, Call of Duty Mobile and more. Get your diamonds and credits instantly.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Mobile Recharge</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ooredoo, Orange, Tunisie Telecom data packages. Stay connected with the best rates.
              </p>
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
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                TahaShop
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Your trusted partner for gaming cards and mobile recharge in Tunisia
              </p>
              <div className="flex justify-center md:justify-start space-x-6">
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <div className="space-y-3 text-gray-300">
                <div>Gaming Cards</div>
                <div>Mobile Recharge</div>
                <div>Support</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold mb-6">Contact Info</h4>
              <div className="space-y-4 text-gray-300 text-lg">
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2 text-teal-400" />
                  24/7 Support
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">📞</span>
                  +216 123 456 789
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">📧</span>
                  info@tahashop.tn
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TahaShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
