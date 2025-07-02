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

const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/get");
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
