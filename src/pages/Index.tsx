
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { CheckoutForm } from '../components/CheckoutForm';
import { useCart } from '../contexts/CartContext';
import { Zap, Shield, DollarSign, Gamepad2, Smartphone, Star, CheckCircle, Clock, Award } from 'lucide-react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-10 md:py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-5 md:top-10 left-5 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-12 md:w-24 h-12 md:h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-10 md:w-20 h-10 md:h-20 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 leading-tight">
            Gaming Cards & <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Mobile Recharge
            </span>
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl opacity-90 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Instant delivery • Secure payment • Best prices in Tunisia
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-6 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-yellow-400" />
              <span className="font-semibold text-sm md:text-lg">Instant Delivery</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-6 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <Shield className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-green-400" />
              <span className="font-semibold text-sm md:text-lg">Secure Payment</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-6 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-400" />
              <span className="font-semibold text-sm md:text-lg">Best Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-2 md:mb-4">
            What We Offer
          </h3>
          <p className="text-base md:text-xl text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Choose from our wide selection of gaming cards and mobile recharge packages
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Gaming Cards</h4>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed px-4">
                Free Fire, PUBG Mobile, Call of Duty Mobile and more. Get your diamonds and credits instantly.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Mobile Recharge</h4>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed px-4">
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

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Chargili
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                Your trusted partner for gaming cards and mobile recharge in Tunisia
              </p>
              <div className="flex justify-center md:justify-start space-x-4 md:space-x-6">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Quick Links</h4>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <div>Gaming Cards</div>
                <div>Mobile Recharge</div>
                <div>Support</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Contact Info</h4>
              <div className="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-400" />
                  24/7 Support
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">📞</span>
                  +216 123 456 789
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">📧</span>
                  info@chargili.tn
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p>&copy; 2024 Chargili. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
