
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface AdminStats {
  totalProducts: number;
  gameCards: number;
  mobilePackages: number;
  ordersToday: number;
  gamesCount: number;
  providersCount: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    gameCards: 0,
    mobilePackages: 0,
    ordersToday: 0,
    gamesCount: 0,
    providersCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const products = productsSnapshot.docs.map(doc => doc.data());
        
        const gameCards = products.filter(p => ['freefire', 'pubg', 'codm'].includes(p.category)).length;
        const mobilePackages = products.filter(p => p.category === 'recharge').length;
        
        // Get unique games and providers
        const uniqueGames = new Set(products.filter(p => p.category !== 'recharge').map(p => p.category));
        const uniqueProviders = new Set(products.filter(p => p.category === 'recharge').map(p => p.provider));

        // Get today's orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(today);
        
        const ordersQuery = query(
          collection(db, 'orders'),
          where('createdAt', '>=', todayTimestamp)
        );
        const ordersSnapshot = await getDocs(ordersQuery);

        setStats({
          totalProducts: products.length,
          gameCards,
          mobilePackages,
          ordersToday: ordersSnapshot.size,
          gamesCount: uniqueGames.size,
          providersCount: uniqueProviders.size
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
