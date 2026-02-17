'use client';

import { useState } from 'react';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    const res = await fetch('/api/auth/logout');

    const { logoutUrl } = await res.json();

    window.location.href = logoutUrl;

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
    >
      {isLoading ? 'Logout...' : 'Logout'}
    </button>
  );
}
