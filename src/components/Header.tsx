'use client';

import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import User from '@/components/User';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="glass sticky top-0 z-20 w-full flex justify-between items-center py-4 px-8">
      <Link href="/" className="text-3xl font-bold text-white hover:text-emerald-400 transition">
        Life Calendar
      </Link>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <User />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-8 glass-strong rounded-xl min-w-48 py-2 z-10">
            <Link
              href="/"
              className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              Life Calendar
            </Link>
            {user ? (
              <>
                <Link
                  href="/update"
                  className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition"
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
