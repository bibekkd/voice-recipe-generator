import { useAuthStore } from '../stores/authStore';

export const useAuthState = () => {
  const { user, session, loading, isAuthenticated, isGuest } = useAuthStore();

  const userProfile = {
    id: user?.id,
    email: user?.email,
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || 'User',
    avatar: user?.user_metadata?.avatar_url,
    createdAt: user?.created_at,
  };

  return {
    user,
    session,
    loading,
    isAuthenticated,
    isGuest,
    userProfile,
  };
};
