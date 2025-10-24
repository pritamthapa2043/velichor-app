import { Yaldevi } from "next/font/google";
import type { User } from "./types";

const USERS_KEY = "wisteria_users";
const CURRENT_USER_KEY = "wisteria_current_user";

export const authStorage = {
  getUsers: async (): Promise<User[]> => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      return await res.json();
    } catch (err) {
      console.log("Get Users Error: ", err);
      return [];
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<User | null> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) throw new Error("Registration Failed");

      const data: User = await res.json();
      authStorage.setCurrentUser(data);
      return data;
    } catch (err) {
      console.log("Registration Error: ", err);
      return null;
    }
  },

  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login Failed");

      const data: User = await res.json();
      authStorage.setCurrentUser(data);
      return data;
    } catch (err) {
      console.log("Login error: ", err);
      return null;
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/loogout", { method: "POST" });
    } finally {
      authStorage.setCurrentUser(null);
    }
  },

  initializeAdminUser: async () => {
    const users = await authStorage.getUsers();
  },

  // Initialize admin user on module load
  // if (typeof window !== "undefined"){
  //   authStorage.initializeAdminUser
  // }

  // updateUser: async (
  //   id: string,
  //   updates: Partial<User>
  // ): Promise<User | null> => {
  //   try {
  //     const res = await fetch(`api/users/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updates),
  //     });
  //     if (!res.ok) throw new Error("Failed to update user");
  //     return await res.json();
  //   } catch (err) {
  //     console.log("Update User Error: ", err);
  //     return null;
  //   }
  // },

  // deleteUser: async (id: string): Promise<boolean> => {
  //   try {
  //     const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  //     return res.ok;
  //   } catch (err) {
  //     console.log("Delete user error: ", err);
  //     return false;
  //   }
  // },
};
