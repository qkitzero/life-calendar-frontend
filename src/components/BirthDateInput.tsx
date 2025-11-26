'use client';

interface BirthDateInputProps {
  birthDateStr: string;
  onBirthDateChange: (date: string) => void;
}

export default function BirthDateInput({ birthDateStr, onBirthDateChange }: BirthDateInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="birthdate" className="mr-2">
        Birth Date
      </label>
      <input
        id="birthdate"
        type="date"
        value={birthDateStr}
        onChange={(e) => onBirthDateChange(e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  );
}
