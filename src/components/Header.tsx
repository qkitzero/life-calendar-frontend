"use client";

import { useUser } from "@/context/UserContext";
import User from "@/components/User";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="w-full flex justify-between items-center py-4 border-b mb-8">
      <Link href="/" className="text-3xl font-bold hover:opacity-80 transition">
        Life Calendar
      </Link>

      <div className="flex items-center gap-4">
        <User />
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  );
}
