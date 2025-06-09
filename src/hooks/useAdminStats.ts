
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
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    gameCards: 0,
    mobilePackages: 0,
    ordersToday: 0,
    gamesCount: 0,
    providersCount: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const products = productsSnapshot.docs.map(doc => doc.data());
        
        const gameCards = products.filter(p => ['freefire', 'pubg', 'codm', 'mobilelegends', 'efootball'].includes(p.category)).length;
        const mobilePackages = products.filter(p => p.category === 'recharge').length;
        
        // Get unique games and providers
        const uniqueGames = new Set(products.filter(p => p.category !== 'recharge').map(p => p.category));
        const uniqueProviders = new Set(products.filter(p => p.category === 'recharge').map(p => p.provider));

        // Get all orders
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const orders = ordersSnapshot.docs.map(doc => doc.data());
        
        // Calculate pending orders
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        
        // Calculate total revenue (from accepted orders)
        const totalRevenue = orders
          .filter(order => order.status === 'accepted')
          .reduce((sum, order) => sum + (order.total || 0), 0);

        // Get today's orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(today);
        
        const ordersQuery = query(
          collection(db, 'orders'),
          where('createdAt', '>=', todayTimestamp)
        );
        const todayOrdersSnapshot = await getDocs(ordersQuery);

        setStats({
          totalProducts: products.length,
          gameCards,
          mobilePackages,
          ordersToday: todayOrdersSnapshot.size,
          gamesCount: uniqueGames.size,
          providersCount: uniqueProviders.size,
          totalOrders: orders.length,
          pendingOrders,
          totalRevenue
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
