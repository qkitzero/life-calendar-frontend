'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Update() {
  const router = useRouter();

  const { refreshUser } = useUser();

  const [displayName, setDisplayName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    const [year, month, day] = birthDate.split('-').map((str) => parseInt(str, 10));

    try {
      const res = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName,
          birthDate: {
            year,
            month,
            day,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'User update failed');
      }

      setSuccess(true);

      refreshUser();

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-2xl glass-strong mt-12">
      <h1 className="text-2xl font-semibold mb-4 text-center text-primary">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block mb-1 text-sm font-medium text-secondary">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block mb-1 text-sm font-medium text-secondary">
            Birth Date
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>

        {error && <p className="text-rose-400 text-sm">{error}</p>}
        {success && <p className="text-emerald-400 text-sm">Update successful!</p>}
      </form>
    </div>
  );
}
