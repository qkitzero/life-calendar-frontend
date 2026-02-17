'use client';

interface BirthDateInputProps {
  birthDateStr: string;
  onBirthDateChange: (date: string) => void;
}

export default function BirthDateInput({ birthDateStr, onBirthDateChange }: BirthDateInputProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <label htmlFor="birthdate" className="text-slate-300 text-sm font-medium">
        Birth Date
      </label>
      <input
        id="birthdate"
        type="date"
        value={birthDateStr}
        onChange={(e) => onBirthDateChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
      />
    </div>
  );
}
