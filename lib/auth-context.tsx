"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext<any>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem('portal_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);
  const login = async (credential: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:5000/api'}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.setItem('portal_token', result.data.accessToken);
      localStorage.setItem('portal_user', JSON.stringify(result.data.user));
      setUser(result.data.user);
      window.location.href = '/portal/dashboard';
    } else throw new Error(result.message || 'Login failed');
  };
  const logout = () => {
    localStorage.removeItem('portal_token'); localStorage.removeItem('portal_user');
    setUser(null); window.location.href = '/portal/login';
  };
  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
