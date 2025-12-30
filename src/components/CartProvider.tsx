'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { cartStore, CartState, CartLineItem } from '@/lib/cartStore';

interface AddItemParams {
  id: string;
  name: string;
  price: number;
  flavor?: string;
  size?: string;
  customizations?: string;
}

interface CartContextValue {
  cart: CartState;
  items: CartLineItem[];
  totalQuantity: number;
  subtotalCents: number;
  getTotal: () => number;
  addItem: (item: AddItemParams) => void;
  updateQuantity: (lineItemId: string, newQuantity: number) => void;
  removeItem: (lineItemId: string) => void;
  clearCart: () => void;
  triggerCartAnimation: () => void;
  isAnimating: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize and sync with store
    cartStore.init();
    setCart(cartStore.getCart());

    const unsubscribe = cartStore.subscribe((newCart) => {
      setCart({ ...newCart, items: [...newCart.items] });
    });

    return unsubscribe;
  }, []);

  const triggerCartAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const addItem = useCallback(
    (item: AddItemParams) => {
      // Convert price from dollars to cents
      const priceCents = Math.round(item.price * 100);
      cartStore.addItem(
        item.id,
        item.name,
        item.flavor || '',
        item.size || '',
        priceCents,
        item.customizations
      );
      triggerCartAnimation();
    },
    [triggerCartAnimation]
  );

  const updateQuantity = useCallback((lineItemId: string, newQuantity: number) => {
    cartStore.updateQuantity(lineItemId, newQuantity);
  }, []);

  const removeItem = useCallback((lineItemId: string) => {
    cartStore.removeItem(lineItemId);
  }, []);

  const clearCart = useCallback(() => {
    cartStore.clearCart();
  }, []);

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  const items = cart.items;
  const getTotal = useCallback(() => subtotalCents / 100, [subtotalCents]);

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        totalQuantity,
        subtotalCents,
        getTotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        triggerCartAnimation,
        isAnimating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export type { CartLineItem };
