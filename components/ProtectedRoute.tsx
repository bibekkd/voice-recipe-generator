import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User is not authenticated, redirect to auth
        router.replace('/auth');
      } else if (!requireAuth && user) {
        // User is authenticated, redirect to main app
        router.replace('/(tabs)');
      }
    }
  }, [user, loading, requireAuth, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect to auth
  }

  if (!requireAuth && user) {
    return null; // Will redirect to main app
  }

  return <>{children}</>;
};
