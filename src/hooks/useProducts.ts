
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
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
        
        // If no products exist, initialize default data
        if (fetchedProducts.length === 0) {
          console.log('No products found, initializing default data...');
          
          // Add all default products to Firebase with their original IDs
          const initPromises = defaultProducts.map(async (product) => {
            const productRef = doc(db, 'products', product.id);
            await setDoc(productRef, {
              name: product.name,
              price: product.price,
              category: product.category,
              image: product.image,
              description: product.description,
              gameId: product.gameId,
              provider: product.provider,
              data: product.data,
              providerId: product.providerId
            });
            return product;
          });
          
          await Promise.all(initPromises);
          console.log('Default products initialized successfully');
          
          // Set the default products directly instead of fetching again
          setProducts(defaultProducts);
        } else {
          setProducts(fetchedProducts);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to default products if Firebase fails
        console.log('Using default products as fallback...');
        setProducts(defaultProducts);
        setError('Using offline data - Firebase connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
