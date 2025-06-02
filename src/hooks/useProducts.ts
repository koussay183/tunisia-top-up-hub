
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';
import { defaultProducts } from '../data/defaultData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (querySnapshot.empty) {
          // Use default products if no products in Firebase
          setProducts(defaultProducts);
        } else {
          const productsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Product));
          setProducts(productsData);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to default products on error
        setProducts(defaultProducts);
        setError('Using default products due to connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
