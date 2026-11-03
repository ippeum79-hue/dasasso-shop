'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency } from '@/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalKrw: number;
  totalUsd: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('KRW');

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('dasasso_cart');
      const savedCurrency = localStorage.getItem('dasasso_currency') as Currency;
      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedCurrency && (savedCurrency === 'KRW' || savedCurrency === 'USD')) {
        setCurrencyState(savedCurrency);
      }
    } catch {
      // Ignore SSR / localStorage error
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('dasasso_cart', JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('dasasso_currency', c);
    } catch {
      // Ignore
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    product: Product,
    quantity = 1,
    selectedOptions: Record<string, string> = {}
  ) => {
    setItems((prevItems) => {
      // Find matching item with same product and same options
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prevItems, { product, quantity, selectedOptions }];
    });
    setIsOpen(true); // Open drawer immediately for instant feedback
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => setItems([]);

  const totalKrw = items.reduce((acc, item) => acc + item.product.priceKrw * item.quantity, 0);
  const totalUsd = items.reduce((acc, item) => acc + item.product.priceUsd * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        currency,
        setCurrency,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalKrw,
        totalUsd,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
