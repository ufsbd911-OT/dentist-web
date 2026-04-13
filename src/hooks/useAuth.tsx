import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  clearError: () => void;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fallback auth provider for when Supabase fails
const createFallbackAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('Service d\'authentification indisponible');

  const signIn = async (email: string, password: string) => {
    setError('Le service d\'authentification est actuellement indisponible. Veuillez réessayer plus tard.');
    return { error: new Error('Service d\'authentification indisponible') };
  };

  const signUp = async (email: string, password: string) => {
    setError('Le service d\'authentification est actuellement indisponible. Veuillez réessayer plus tard.');
    return { error: new Error('Service d\'authentification indisponible') };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setUserRole(null);
    toast({
      title: "Signed out successfully"
    });
  };

  const resetPassword = async (email: string) => {
    setError('Le service de réinitialisation de mot de passe est actuellement indisponible. Veuillez réessayer plus tard.');
    return { error: new Error('Service de réinitialisation de mot de passe indisponible') };
  };

  const clearError = () => setError(null);

  const refreshUserRole = async () => {
    // No-op for fallback provider
  };

  return {
    user,
    session,
    userRole,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    clearError,
    refreshUserRole
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Start with false for instant UI
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);



  // Function to fetch user role from database
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role, email, id')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // User not found in users table - create entry
          const { data: { user } } = await supabase.auth.getUser();
          if (user?.email) {
            await supabase
              .from('users')
              .insert({ 
                id: userId, 
                email: user.email, 
                role: 'viewer' 
              });
          }
          setUserRole('viewer');
        } else {
          setUserRole('viewer');
        }
        return;
      }

      if (data?.role) {
        setUserRole(data.role);
      } else {
        setUserRole('viewer');
      }
    } catch (error) {
      setUserRole('viewer');
    }
  };

  useEffect(() => {
    let isMounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;


    // Setup auth listener with role fetching
    const setupAuthListener = async () => {
      const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!isMounted) return;

        if (isSigningOut) {
          setSession(null);
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }
        
        if (session?.user) {
          // Clear any existing errors since we're accepting the session
          setError(null);
          
          // Set session and user first
          setSession(session);
          setUser(session.user);
          
          // Fetch role from database in background
          fetchUserRole(session.user.id).catch(err => 
            console.error('Role fetch error:', err)
          );
          
        } else {
          setSession(null);
          setUser(null);
          setUserRole(null);
        }
        
        setLoading(false);
      });
      authSubscription = data.subscription;
      
      // Initial session check
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted && session?.user) {
        setSession(session);
        setUser(session.user);
        
        // Fetch user role on initial load in background
        fetchUserRole(session.user.id).catch(err => 
          console.error('Initial role fetch error:', err)
        );
        
        setLoading(false);
      } else if (isMounted) {
        setLoading(false);
      }
    };
    setupAuthListener();

    return () => {
      isMounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [isSigningOut]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseAvailable) {
      setError('Le service d\'authentification est actuellement indisponible. Veuillez réessayer plus tard.');
      return { error: new Error('Service d\'authentification indisponible') };
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      // If we get a session back, that means credentials are correct
      if (data?.session && data?.user) {
        setSession(data.session);
        setUser(data.user);
        
        // Fetch role in background
        setUserRole('viewer');
        fetchUserRole(data.user.id).catch(err => 
          console.error('Role fetch error:', err)
        );
        
        return { error: null };
      }
      
      // Handle errors
      if (error) {
        setError(error.message);
        return { error };
      }
      
      return { error: new Error('Unknown sign in error') };
    } catch (error: any) {
      setError(error?.message || 'Échec de la connexion. Veuillez réessayer.');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseAvailable) {
      setError('Le service d\'authentification est actuellement indisponible. Veuillez réessayer plus tard.');
      return { error: new Error('Service d\'authentification indisponible') };
    }

    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      

      
      if (error) {
        setError(error.message);
      }
      
      return { error };
    } catch (error: any) {
      const errorMessage = error?.message || 'Échec de l\'inscription. Veuillez réessayer.';
      setError(errorMessage);
      if (import.meta.env.DEV) {
        console.error('Sign up error:', error);
      }
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsSigningOut(true);
      
      console.log('🚪 Starting logout process...');

      const { error } = await supabase.auth.signOut({ scope: 'local' });

      if (error) {
        console.error('❌ Logout error:', error);
      }

      const storageKeysToClear = Object.keys(localStorage).filter((key) =>
        key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token')
      );

      storageKeysToClear.forEach((key) => localStorage.removeItem(key));

      setUser(null);
      setSession(null);
      setUserRole(null);

      console.log('✅ Logout completed');
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      
    } catch (error: any) {
      console.error('💥 Logout catch error:', error);
      
      // Force logout anyway - clear all state
      setUser(null);
      setSession(null);
      setUserRole(null);

      const storageKeysToClear = Object.keys(localStorage).filter((key) =>
        key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token')
      );

      storageKeysToClear.forEach((key) => localStorage.removeItem(key));
      
      const errorMessage = error?.message || 'Échec de la déconnexion. Veuillez réessayer.';
      setError(errorMessage);
      
      toast({
        title: "Déconnexion forcée",
        description: "Vous avez été déconnecté.",
        variant: "default"
      });
      
      // Force redirect even on error
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } finally {
      setLoading(false);
      setTimeout(() => setIsSigningOut(false), 1200);
    }
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseAvailable) {
      setError(null);
      toast({
        title: "Email de réinitialisation envoyé !",
        description: "Si votre email existe, vous recevrez un lien de réinitialisation sous peu.",
        variant: "default"
      });
      return { error: null };
    }

    setLoading(true);
    setError(null);

    // Fire and forget: do not block UI
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
      .then(({ error }) => {
        if (error && import.meta.env.DEV) {
          console.error('📧 Password reset error:', error);
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error('📧 Password reset error:', error);
        }
      });

    // Always show success message instantly
    toast({
      title: "Email de réinitialisation envoyé !",
      description: "Si votre email existe, vous recevrez un lien de réinitialisation sous peu.",
      variant: "default"
    });

    setTimeout(() => setLoading(false), 1000); // Never block UI for more than 1s
    return { error: null };
  };

  const clearError = () => setError(null);

  const refreshUserRole = async () => {
    if (user?.id) {
      console.log('🔄 Refreshing user role...');
      await fetchUserRole(user.id);
    }
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    clearError,
    refreshUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
