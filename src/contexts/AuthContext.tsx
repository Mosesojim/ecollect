import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    phone?: string;
    address?: string;
  }) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || "User",
          email: session.user.email || "",
          role: session.user.user_metadata?.role || "Resident",
          phone: session.user.user_metadata?.phone || "",
          address: session.user.user_metadata?.address || "",
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || "User",
          email: session.user.email || "",
          role: session.user.user_metadata?.role || "Resident",
          phone: session.user.user_metadata?.phone || "",
          address: session.user.user_metadata?.address || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) return false;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
    return true;
  };

  const signup = async (name: string, email: string, password?: string) => {
    if (!password) return;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: {
    name?: string;
    phone?: string;
    address?: string;
  }) => {
    const { error } = await supabase.auth.updateUser({
      data,
    });

    if (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }

    // We update local state optimistically, though onAuthStateChange should also catch it
    if (user) {
      setUser({
        ...user,
        ...data,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
