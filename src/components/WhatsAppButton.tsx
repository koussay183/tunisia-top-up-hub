
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useTranslation } from 'react-i18next';

export const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const docRef = doc(db, 'admin_settings', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWhatsappNumber(data.whatsappNumber || '+216123456789');
        } else {
          setWhatsappNumber('+216123456789'); // fallback number
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
        setWhatsappNumber('+216123456789'); // fallback number
      }
    };

    fetchWhatsAppNumber();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      size="icon"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};
