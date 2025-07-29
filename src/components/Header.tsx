"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import User from "@/components/User";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center py-4 border-b mb-8">
      <Link href="/" className="text-3xl font-bold hover:opacity-80 transition">
        Life Calendar
      </Link>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <User />
        </button>
        {isMenuOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg py-2 z-10">
            <Link
              href="/"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Life Calendar
            </Link>
            {user ? (
              <>
                <Link
                  href="/update"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Update Profile
                </Link>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
