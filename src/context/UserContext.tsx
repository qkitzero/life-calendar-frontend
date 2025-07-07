"use client";

import { createContext, useContext, useEffect, useState } from "react";

type BirthDate = {
  year: number;
  month: number;
  day: number;
};

type User = {
  displayName: string;
  userId: string;
  birthDate: BirthDate;
} | null;

type UserContextType = {
  user: User;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/get");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
