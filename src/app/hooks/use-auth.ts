"use client";

import { useState, useEffect } from "react";
import { User } from "../lib/types";
import { authStorage } from "../lib/auth-storage";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(authStorage.getCurrentUser());
    setIsLoaded(true);
  }, []);

  const register = async (email: string, password: string, name: string) => {
    const newUser = await authStorage.register(email, password, name);
    if (newUser) {
      setUser(newUser);
      return true;
    }
    return false;
  };

  const login = async (email: string, password: string) => {
    const loggedUser = await authStorage.login(email, password);
    if (loggedUser) {
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  // TO BE IMPLEMENTED
  const logout = () => {
    authStorage.logout();
    setUser(null);
  };

  return { user, register, login, logout, isLoaded };
}
