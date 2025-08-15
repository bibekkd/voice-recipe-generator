import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  initializeAuth: () => Promise<(() => void) | undefined>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  isGuest: false,

  // Actions
  setUser: (user: User | null) => {
    set({ 
      user, 
      isAuthenticated: !!user, 
      isGuest: !user && !get().loading 
    });
  },

  setSession: (session: Session | null) => {
    set({ session });
  },

  setLoading: (loading: boolean) => {
    set({ 
      loading, 
      isGuest: !get().user && !loading 
    });
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        set({ loading: false });
        return { error };
      }

      // If signup successful, create user record in our users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              // Use the new auth_user_id column to link with Supabase auth
              auth_user_id: data.user.id,
              username,
              email,
              password_hash: '', // We don't store the actual password hash in our table
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          console.error('Error creating user record:', insertError);
          set({ loading: false });
          return { error: insertError };
        }
      }

      set({ loading: false });
      return { error: null };
    } catch (error) {
      set({ loading: false });
      return { error };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      set({ loading: false });
      return { error };
    } catch (error) {
      set({ loading: false });
      return { error };
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        isAuthenticated: false, 
        isGuest: true,
        loading: false 
      });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ loading: false });
    }
  },

  initializeAuth: async () => {
    try {
      set({ loading: true });

      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        set({ 
          session, 
          user: session.user,
          isAuthenticated: true,
          isGuest: false,
          loading: false 
        });
      } else {
        set({ 
          session: null, 
          user: null,
          isAuthenticated: false,
          isGuest: true,
          loading: false 
        });
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            set({ 
              session, 
              user: session.user,
              isAuthenticated: true,
              isGuest: false,
              loading: false 
            });
          } else {
            set({ 
              session: null, 
              user: null,
              isAuthenticated: false,
              isGuest: true,
              loading: false 
            });
          }
        }
      );

      // Return cleanup function (can be called from component if needed)
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ 
        session: null, 
        user: null,
        isAuthenticated: false,
        isGuest: true,
        loading: false 
      });
    }
  },
}));
