
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '../hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '../config/cloudinary';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { X, Upload, CreditCard, User, Phone, Mail, Camera } from 'lucide-react';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export const CheckoutForm = ({ isOpen, onClose, onOrderComplete }: CheckoutFormProps) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: ''
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(1)}DT`;
  };

  const d17Numbers = [
    '12345678', // Replace with real D17 numbers
    '87654321',
    '11223344'
  ];

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
        description: "Please enter your name",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Error", 
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return false;
    }
    if (!paymentScreenshot) {
      toast({
        title: "Error",
        description: "Please upload payment screenshot",
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
        title: "Order submitted!",
        description: "Your order has been submitted successfully. We'll process it shortly.",
      });

      clearCart();
      onOrderComplete();
      setFormData({ customerName: '', phone: '', email: '' });
      setPaymentScreenshot(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
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
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Checkout
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span className="text-sm">{item.name} x{item.quantity}</span>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-lg text-purple-600">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Payment Instructions</h3>
            <p className="text-sm text-blue-700 mb-3">
              Send {formatPrice(getTotalPrice())} to one of these D17 numbers:
            </p>
            <div className="space-y-2">
              {d17Numbers.map((number, index) => (
                <div key={index} className="bg-white border rounded p-2 font-mono text-center">
                  {number}
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              After payment, upload a screenshot and fill out your details below.
            </p>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email (Optional)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>

            {/* Payment Screenshot Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Payment Screenshot *
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-3">
                    <img 
                      src={previewUrl} 
                      alt="Payment screenshot" 
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPaymentScreenshot(null);
                        setPreviewUrl('');
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <Label htmlFor="screenshot-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>Upload Screenshot</span>
                      </Button>
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload a screenshot of your D17 payment confirmation
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              {isLoading ? 'Submitting Order...' : 'Submit Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
