import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const {
    user,
    session,
    loading,
    isAuthenticated,
    isGuest,
    signUp,
    signIn,
    signOut,
    initializeAuth,
  } = useAuthStore();

  return {
    user,
    session,
    loading,
    isAuthenticated,
    isGuest,
    signUp,
    signIn,
    signOut,
    initializeAuth,
  };
};
