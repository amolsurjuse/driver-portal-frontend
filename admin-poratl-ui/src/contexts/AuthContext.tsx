import { createContext, ReactNode, useContext } from 'react';
import type { JwtPayload } from '../types/admin';

type AuthContextType = {
  token: string;
  payload: JwtPayload | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  token: string;
  payload: JwtPayload | null;
  children: ReactNode;
};

export function AuthProvider({ token, payload, children }: AuthProviderProps) {
  return <AuthContext.Provider value={{ token, payload }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
