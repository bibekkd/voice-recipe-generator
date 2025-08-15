import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};
