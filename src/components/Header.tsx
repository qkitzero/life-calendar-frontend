'use client';

import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import User from '@/components/User';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
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
      <Link href="/" className="text-3xl font-bold text-primary hover:text-emerald-400 transition">
        Life Calendar
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-raised hover:bg-raised-hover transition cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

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
                className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-raised-hover hover:text-primary transition"
              >
                Life Calendar
              </Link>
              {user ? (
                <>
                  <Link
                    href="/update"
                    className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-raised-hover hover:text-primary transition"
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
      </div>
    </header>
  );
}
