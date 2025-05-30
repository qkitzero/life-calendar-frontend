"use client";

import { useState } from "react";

const MAX_YEARS = 90;
const WEEKS_PER_YEAR = 52;
const TOTAL_WEEKS = MAX_YEARS * WEEKS_PER_YEAR;

export default function Calendar() {
  const [birthDateStr, setBirthDateStr] = useState("2000-01-01");

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const diffInMs = now.getTime() - birthDate.getTime();
  const livedWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

  return (
    <div className="space-y-4">
      <label className="block">
        Birth Date:
        <input
          type="date"
          value={birthDateStr}
          onChange={(e) => setBirthDateStr(e.target.value)}
          className="border p-2 rounded"
        />
      </label>

      <div className="grid grid-cols-52 gap-1">
        {Array.from({ length: WEEKS_PER_YEAR }).map((_, week) => (
          <div key={week} className="relative">
            <span className="absolute text-[10px]">
              {(week + 1) % 5 === 0 ? week + 1 : ""}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-52 gap-1">
        {Array.from({ length: TOTAL_WEEKS }).map((_, week) => (
          <div
            key={week}
            className={`w-2 h-2 transition ${
              week < livedWeeks ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
