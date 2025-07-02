"use client";

import { useState } from "react";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    const res = await fetch("/api/auth/login");

    const { loginUrl } = await res.json();

    window.location.href = loginUrl;

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  );
}
