// Components/context/Auth.tsx
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser1: (user: User | null) => void;
  storeTokenInLs: (key: string, token: string) => void;
  logout: (keys: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const Authprovider = ({ children }: AuthProviderProps) => {
  const [user, setUser1] = useState<User | null>(null);

  const storeTokenInLs = (key: string, token: string) => {
    localStorage.setItem(key, token);
  };

  const logout = (keys: string[]) => {
    keys.forEach((key) => localStorage.removeItem(key));
    setUser1(null); // also clear user state
  };

  // Load user on refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser?.username) {
      setUser1(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser1, storeTokenInLs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Authprovider");
  }
  return context;
};
