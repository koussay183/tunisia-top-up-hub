
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
        console.log('Fetching products from Firebase...');
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
        
        // Combine default products with fetched products
        // If there are no products in Firebase, use default products
        const allProducts = fetchedProducts.length > 0 ? fetchedProducts : defaultProducts;
        
        console.log('All products (default + Firebase):', allProducts);
        setProducts(allProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to default products if Firebase fails
        setProducts(defaultProducts);
        setError('Failed to fetch products from database, using default products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
