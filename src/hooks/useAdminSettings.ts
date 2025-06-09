
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AdminSettings } from '../types';

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'admin_settings', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings(docSnap.data() as AdminSettings);
      } else {
        // Create default settings
        const defaultSettings: AdminSettings = {
          id: 'main',
          d17Numbers: ['12345678', '87654321', '11223344'],
          whatsappNumber: '+216123456789',
          updatedAt: new Date()
        };
        await setDoc(docRef, defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateD17Numbers = async (numbers: string[]) => {
    try {
      const updatedSettings: AdminSettings = {
        ...settings!,
        d17Numbers: numbers,
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'admin_settings', 'main'), updatedSettings);
      setSettings(updatedSettings);
      return true;
    } catch (error) {
      console.error('Error updating D17 numbers:', error);
      return false;
    }
  };

  const updateWhatsAppNumber = async (number: string) => {
    try {
      const updatedSettings: AdminSettings = {
        ...settings!,
        whatsappNumber: number,
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'admin_settings', 'main'), updatedSettings);
      setSettings(updatedSettings);
      return true;
    } catch (error) {
      console.error('Error updating WhatsApp number:', error);
      return false;
    }
  };

  return {
    settings,
    loading,
    updateD17Numbers,
    updateWhatsAppNumber,
    refetch: fetchSettings
  };
};
