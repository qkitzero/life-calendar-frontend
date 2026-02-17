'use client';

import { useState } from 'react';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    const res = await fetch('/api/auth/login');

    const { loginUrl } = await res.json();

    window.location.href = loginUrl;

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
    >
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
}
