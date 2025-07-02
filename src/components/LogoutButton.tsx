"use client";

import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    const res = await fetch("/api/auth/logout");

    const { logoutUrl } = await res.json();

    window.location.href = logoutUrl;

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
    >
      {isLoading ? "Logout..." : "Logout"}
    </button>
  );
}
