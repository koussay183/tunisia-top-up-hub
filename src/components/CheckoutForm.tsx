
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '../contexts/CartContext';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { toast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '../config/cloudinary';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { X, Upload, CreditCard, User, Phone, Mail, Camera, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export const CheckoutForm = ({ isOpen, onClose, onOrderComplete }: CheckoutFormProps) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { settings, loading: settingsLoading } = useAdminSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: ''
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { t } = useTranslation();

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(1)}DT`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      toast({
        title: "Error",
        description: t('checkout.errors.nameRequired'),
        variant: "destructive"
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Error", 
        description: t('checkout.errors.phoneRequired'),
        variant: "destructive"
      });
      return false;
    }
    if (!paymentScreenshot) {
      toast({
        title: "Error",
        description: t('checkout.errors.screenshotRequired'),
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let screenshotUrl = '';
      if (paymentScreenshot) {
        screenshotUrl = await uploadToCloudinary(paymentScreenshot);
      }

      const orderData = {
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email || '',
        items: cartItems,
        total: getTotalPrice(),
        paymentScreenshot: screenshotUrl,
        status: 'pending',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast({
        title: t('checkout.orderSubmitted'),
        description: t('checkout.orderSubmittedDesc'),
      });

      // Clear cart and reset form
      clearCart();
      setFormData({ customerName: '', phone: '', email: '' });
      setPaymentScreenshot(null);
      setPreviewUrl('');
      
      // Close checkout and call completion callback
      onClose();
      onOrderComplete();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: t('checkout.errors.submitError'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {t('checkout.title')}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-xl mb-4 text-gray-800">{t('checkout.orderSummary')}</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-base font-medium">{item.name} x{item.quantity}</span>
                <span className="text-base font-bold text-indigo-600">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t-2 border-indigo-200 pt-4 mt-4 flex justify-between">
              <span className="text-xl font-bold text-gray-800">{t('checkout.total')}:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="font-bold text-xl text-blue-800 mb-4">{t('checkout.paymentInstructions')}</h3>
            <p className="text-base text-blue-700 mb-4 font-medium">
              {t('checkout.paymentDesc', { amount: formatPrice(getTotalPrice()) })}
            </p>
            
            {settingsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-blue-600">{t('checkout.loadingPaymentNumbers')}</span>
              </div>
            ) : (
              <div className="space-y-3">
                {settings?.d17Numbers.map((number, index) => (
                  <div key={index} className="bg-white border-2 border-blue-200 rounded-xl p-4 font-mono text-center text-lg font-bold text-gray-800 shadow-sm">
                    {number}
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-sm text-blue-600 mt-4 bg-white/50 p-3 rounded-xl">
              {t('checkout.paymentTip')}
            </p>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="customerName" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  <User className="w-5 h-5 text-indigo-600" />
                  {t('checkout.fullName')} *
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder={t('checkout.fullName')}
                  className="h-12 text-base border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  <Phone className="w-5 h-5 text-indigo-600" />
                  {t('checkout.phoneNumber')} *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('checkout.phoneNumber')}
                  className="h-12 text-base border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold text-gray-700">
                <Mail className="w-5 h-5 text-indigo-600" />
                {t('checkout.email')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('checkout.email')}
                className="h-12 text-base border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
              />
            </div>

            {/* Payment Screenshot Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-semibold text-gray-700">
                <Camera className="w-5 h-5 text-indigo-600" />
                {t('checkout.paymentScreenshot')} *
              </Label>
              <div className="border-3 border-dashed border-indigo-300 rounded-2xl p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Payment screenshot" 
                      className="max-w-full h-64 object-contain mx-auto rounded-2xl shadow-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPaymentScreenshot(null);
                        setPreviewUrl('');
                      }}
                      className="rounded-xl border-2"
                    >
                      {t('checkout.removeImage')}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <Label htmlFor="screenshot-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild className="rounded-xl border-2 border-indigo-300 hover:bg-indigo-50">
                        <span className="text-base font-semibold">{t('checkout.uploadScreenshot')}</span>
                      </Button>
                    </Label>
                    <p className="text-sm text-gray-600 mt-3">
                      {t('checkout.uploadDesc')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('checkout.submittingOrder')}
                </>
              ) : (
                t('checkout.submitOrder')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
