import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isGuest: boolean;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cb_user");
    if (stored) setUser(JSON.parse(stored));
    const guest = localStorage.getItem("cb_guest");
    if (guest) setIsGuest(true);
  }, []);

  const signIn = async (email: string, _password: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const u = { id: "user_1", email, user_metadata: { full_name: email.split("@")[0] } };
    setUser(u);
    localStorage.setItem("cb_user", JSON.stringify(u));
    setLoading(false);
  };

  const signUp = async (email: string, _password: string, name: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const u = { id: "user_" + Date.now(), email, user_metadata: { full_name: name } };
    setUser(u);
    localStorage.setItem("cb_user", JSON.stringify(u));
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("cb_user");
    localStorage.removeItem("cb_guest");
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem("cb_guest", "1");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isGuest, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
