
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { CheckoutForm } from '../components/CheckoutForm';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { useCart } from '../contexts/CartContext';
import { Zap, Shield, DollarSign, Gamepad2, Smartphone, Star, CheckCircle, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

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
      
      {/* Quick Welcome Banner - Minimal and Clean */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t('hero.title')} <span className="text-yellow-400">{t('hero.titleHighlight')}</span>
          </h2>
          <p className="text-sm md:text-lg opacity-90 mb-4">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="font-semibold text-sm">{t('hero.instantDelivery')}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              <span className="font-semibold text-sm">{t('hero.securePayment')}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
              <span className="font-semibold text-sm">{t('hero.bestPrices')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Now First */}
      <ProductGrid searchQuery={searchQuery} />

      {/* Enhanced Features Section - Creative Bottom Design */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {t('features.title')}
            </h3>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold mb-4">{t('features.gamingCards.title')}</h4>
              <p className="text-lg opacity-90 leading-relaxed">
                {t('features.gamingCards.description')}
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold mb-4">{t('features.mobileRecharge.title')}</h4>
              <p className="text-lg opacity-90 leading-relaxed">
                {t('features.mobileRecharge.description')}
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 md:mt-20 text-center">
            <h4 className="text-xl md:text-2xl font-bold mb-8">{t('footer.contactInfo')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-lg mb-2">100% {t('hero.securePayment')}</h5>
                <p className="text-sm opacity-80">SSL encrypted transactions</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-lg mb-2">{t('hero.instantDelivery')}</h5>
                <p className="text-sm opacity-80">Within seconds</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-lg mb-2">{t('footer.support24')}</h5>
                <p className="text-sm opacity-80">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

      {/* WhatsApp Support Button */}
      <WhatsAppButton />

      {/* Footer - Simplified */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('header.title')}
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                {t('footer.description')}
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
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{t('footer.quickLinks')}</h4>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <div>{t('footer.gamingCards')}</div>
                <div>{t('footer.mobileRecharge')}</div>
                <div>{t('footer.support')}</div>
                <div>{t('footer.contact')}</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{t('footer.contactInfo')}</h4>
              <div className="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-400" />
                  {t('footer.support24')}
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
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
