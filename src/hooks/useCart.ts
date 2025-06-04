
import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        console.log('Loading cart from localStorage:', savedCart);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          console.log('Parsed cart:', parsedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      } finally {
        setIsLoaded(true);
      }
    };

    loadCart();
  }, []);

  // Save to localStorage whenever cartItems changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      console.log('Saving cart to localStorage:', cartItems);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((product: Product) => {
    console.log('Adding product to cart:', product);
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updated = [...prev];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + 1
        };
        console.log('Updated cart (existing item):', updated);
        return updated;
      } else {
        // New item, add to cart
        const newCart = [...prev, { ...product, quantity: 1 }];
        console.log('Updated cart (new item):', newCart);
        return newCart;
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    console.log('Removing product from cart:', productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    console.log('Updating quantity for product:', productId, 'to:', quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    console.log('Clearing cart');
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoaded
  };
};
