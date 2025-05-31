"use client";

import { useState } from "react";

const MAX_YEARS = 80;
const WEEKS_PER_YEAR = 52;
const TOTAL_WEEKS = MAX_YEARS * WEEKS_PER_YEAR;

export default function Calendar() {
  const [birthDateStr, setBirthDateStr] = useState("2000-01-01");

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const diffInMs = now.getTime() - birthDate.getTime();
  const livedWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

  return (
    <div>
      <div className="text-center mb-8">
        <label htmlFor="birthdate" className="mr-2">
          Birth Date
        </label>
        <input
          id="birthdate"
          type="date"
          value={birthDateStr}
          onChange={(e) => setBirthDateStr(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-53 gap-1">
          {Array.from({ length: WEEKS_PER_YEAR + 1 }).map((_, week) => (
            <div key={week} className="w-2 h-2 relative">
              <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px]">
                {week % 5 === 0 && week !== 0 ? week : ""}
              </span>
            </div>
          ))}
        </div>

        {Array.from({ length: MAX_YEARS }).map((_, year) => (
          <div key={year} className="grid grid-cols-53 gap-1">
            <div className="relative">
              <span className="absolute -left-4 inset-0 flex justify-center items-center text-[10px]">
                {(year + 1) % 5 === 0 ? year + 1 : ""}
              </span>
            </div>

            {Array.from({ length: WEEKS_PER_YEAR }).map((_, week) => (
              <div
                key={week}
                className={`w-2 h-2 transition ${
                  year * WEEKS_PER_YEAR + week < livedWeeks
                    ? "bg-gray-800"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
