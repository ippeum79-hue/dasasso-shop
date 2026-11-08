'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: { email: string; password?: string; name: string; phone?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const DEFAULT_DEMO_USERS: (User & { password?: string })[] = [
  {
    id: 'user-demo-01',
    email: 'seoul.shopper@dasasso.com',
    name: '김다사 (DASASSO VIP)',
    phone: '010-1234-5678',
    createdAt: '2026-01-15',
    password: 'password123',
    address: {
      postalCode: '06027',
      roadAddress: '서울특별시 강남구 압구정로 123',
      detailAddress: '다사쏘 빌딩 4층',
    },
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Load user from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dasasso_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }

      // Ensure demo users exist
      const savedUsers = localStorage.getItem('dasasso_users');
      if (!savedUsers) {
        localStorage.setItem('dasasso_users', JSON.stringify(DEFAULT_DEMO_USERS));
      }
    } catch {
      // Ignore SSR
    }
  }, []);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = async (email: string, password = ''): Promise<{ success: boolean; message: string }> => {
    try {
      const rawUsers = localStorage.getItem('dasasso_users');
      const users: (User & { password?: string })[] = rawUsers ? JSON.parse(rawUsers) : DEFAULT_DEMO_USERS;

      const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (!user) {
        return { success: false, message: '등록되지 않은 이메일 계정입니다.' };
      }

      // If password provided and user has password, check match
      if (password && user.password && user.password !== password) {
        return { success: false, message: '비밀번호가 일치하지 않습니다.' };
      }

      // Success
      const { password: _, ...safeUser } = user;
      setCurrentUser(safeUser);
      localStorage.setItem('dasasso_current_user', JSON.stringify(safeUser));
      setIsAuthModalOpen(false);
      return { success: true, message: `${safeUser.name}님, 환영합니다!` };
    } catch {
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  const signup = async (userData: {
    email: string;
    password?: string;
    name: string;
    phone?: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const rawUsers = localStorage.getItem('dasasso_users');
      const users: (User & { password?: string })[] = rawUsers ? JSON.parse(rawUsers) : DEFAULT_DEMO_USERS;

      const exists = users.some((u) => u.email.toLowerCase() === userData.email.trim().toLowerCase());
      if (exists) {
        return { success: false, message: '이미 가입된 이메일 주소입니다.' };
      }

      const newUser: User & { password?: string } = {
        id: `user-${Date.now()}`,
        email: userData.email.trim(),
        name: userData.name.trim(),
        phone: userData.phone?.trim() || '',
        createdAt: new Date().toISOString().split('T')[0],
        password: userData.password || 'password123',
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('dasasso_users', JSON.stringify(updatedUsers));

      const { password: _, ...safeUser } = newUser;
      setCurrentUser(safeUser);
      localStorage.setItem('dasasso_current_user', JSON.stringify(safeUser));
      setIsAuthModalOpen(false);

      return { success: true, message: '회원가입이 완료되었습니다! 웰컴 10% 쿠폰이 발급되었습니다.' };
    } catch {
      return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dasasso_current_user');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const nextUser = { ...currentUser, ...updatedData };
    setCurrentUser(nextUser);
    localStorage.setItem('dasasso_current_user', JSON.stringify(nextUser));

    // Also update in users list
    try {
      const rawUsers = localStorage.getItem('dasasso_users');
      if (rawUsers) {
        const users: (User & { password?: string })[] = JSON.parse(rawUsers);
        const nextUsers = users.map((u) => (u.id === currentUser.id ? { ...u, ...updatedData } : u));
        localStorage.setItem('dasasso_users', JSON.stringify(nextUsers));
      }
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
