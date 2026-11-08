'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, CartItem, ShippingInfo, PaymentMethod, Currency } from '@/types';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: {
    items: CartItem[];
    shipping: ShippingInfo;
    paymentMethod: PaymentMethod;
    totalKrw: number;
    totalUsd: number;
    currency: Currency;
    userEmail: string;
    userId?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getUserOrders: (userEmail: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-20261101-01',
    orderNumber: 'DS20261101-8921',
    userEmail: 'seoul.shopper@dasasso.com',
    userId: 'user-demo-01',
    createdAt: '2026-11-01 14:32',
    items: [
      {
        product: {
          id: 'b-01',
          slug: 'glacier-hyaluronic-glass-glow-serum',
          nameKo: '글래시어 히알루론 글래스 스킨 세럼 50ml',
          nameEn: 'Glacier Hyaluronic 7-Layer Glass Glow Serum',
          brand: 'GLOWSEOUL',
          category: 'beauty',
          subCategory: 'skincare',
          priceKrw: 38000,
          priceUsd: 29.0,
          rating: 4.9,
          reviewCount: 540,
          images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
          ],
          description: '',
          shortDesc: '투명한 유리알 광채 세럼',
          options: [],
          tags: [],
          stockCount: 12,
        },
        quantity: 2,
        selectedOptions: { Capacity: '50ml' },
      },
      {
        product: {
          id: 'b-02',
          slug: 'heartleaf-calming-toner-pad-80ea',
          nameKo: '어성초 89% 퀵 카밍 릴리프 토너 패드 80매',
          nameEn: 'Heartleaf 89% Soothing Cica Moisture Pad 80ea',
          brand: 'PURE SOUL',
          category: 'beauty',
          subCategory: 'skincare',
          priceKrw: 26000,
          priceUsd: 20.0,
          rating: 4.9,
          reviewCount: 380,
          images: [
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
          ],
          description: '',
          shortDesc: '3분 응급 진정 팩',
          options: [],
          tags: [],
          stockCount: 6,
        },
        quantity: 1,
        selectedOptions: { Set: '단품 (80매)' },
      },
    ],
    shipping: {
      recipientName: '김다사',
      phone: '010-1234-5678',
      postalCode: '06027',
      address: '서울특별시 강남구 압구정로 123',
      detailAddress: '다사쏘 빌딩 4층',
      deliveryRequest: '부재 시 문 앞에 놓아주세요.',
    },
    paymentMethod: 'toss',
    totalKrw: 102000,
    totalUsd: 78.0,
    currency: 'KRW',
    status: '배송중',
  },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dasasso_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        setOrders(DEFAULT_ORDERS);
        localStorage.setItem('dasasso_orders', JSON.stringify(DEFAULT_ORDERS));
      }
    } catch {
      // Ignore SSR
    }
  }, []);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('dasasso_orders', JSON.stringify(newOrders));
    } catch {
      // Ignore
    }
  };

  const createOrder = async (orderData: {
    items: CartItem[];
    shipping: ShippingInfo;
    paymentMethod: PaymentMethod;
    totalKrw: number;
    totalUsd: number;
    currency: Currency;
    userEmail: string;
    userId?: string;
  }): Promise<Order> => {
    const timestamp = Date.now();
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `DS${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${timestamp}`,
      orderNumber,
      userEmail: orderData.userEmail,
      userId: orderData.userId,
      createdAt: dateStr,
      items: orderData.items,
      shipping: orderData.shipping,
      paymentMethod: orderData.paymentMethod,
      totalKrw: orderData.totalKrw,
      totalUsd: orderData.totalUsd,
      currency: orderData.currency,
      status: '결제완료',
    };

    const nextOrders = [newOrder, ...orders];
    saveOrders(nextOrders);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const nextOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    saveOrders(nextOrders);
  };

  const getUserOrders = (userEmail: string) => {
    return orders.filter((o) => o.userEmail.toLowerCase() === userEmail.toLowerCase());
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getUserOrders,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
