
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';
import { initializeDefaultData } from '../data/defaultData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from Firebase...');
        
        // Initialize default data if needed
        await initializeDefaultData(db);
        
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts: Product[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            id: doc.id,
            ...data
          } as Product);
        });

        console.log('Fetched products from Firebase:', fetchedProducts);
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
        setError('Failed to fetch products from database');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
