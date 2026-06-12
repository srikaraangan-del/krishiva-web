import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  farmName: string;
  location: string;
  language: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (phone?: string) => void;
  logout: () => void;
}

const mockUser: User = {
  id: '1',
  name: 'Ramesh Patel',
  phone: '+91 98765 43210',
  farmName: 'Patel Farms',
  location: 'Gujarat, India',
  language: 'English',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((_phone?: string) => {
    setIsAuthenticated(true);
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
