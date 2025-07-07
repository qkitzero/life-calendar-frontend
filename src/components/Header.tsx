"use client";

import { useUser } from "@/context/UserContext";
import User from "@/components/User";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default function Header() {
  const { user } = useUser();

  if (!user) {
    return (
      <header className="w-full flex justify-end items-center gap-4">
        <User />
        <LoginButton />
      </header>
    );
  }

  return (
    <header className="w-full flex justify-end items-center gap-4">
      <User />
      <LogoutButton />
    </header>
  );
}
