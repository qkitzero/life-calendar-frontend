"use client";

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import WeekCell from "@/components/WeekCell";

const MAX_YEARS = 80;
const WEEKS_PER_YEAR = 52;

export default function Calendar() {
  const [birthDateStr, setBirthDateStr] = useState("2000-01-01");

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setBirthDateStr(
        user.birthDate.year.toString().padStart(4, "0") +
          "-" +
          user.birthDate.month.toString().padStart(2, "0") +
          "-" +
          user.birthDate.day.toString().padStart(2, "0")
      );
    }
  }, [user]);

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  const years = new Date(diff).getUTCFullYear() - 1970;
  const isBirthDatePassedThisYear =
    now.getTime() >
    new Date(
      now.getUTCFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    ).getTime();
  const birthDateYearOffset = isBirthDatePassedThisYear ? 0 : 1;
  const lastBirthDate = new Date(
    now.getUTCFullYear() - birthDateYearOffset,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const daysSinceLastBirthDate = Math.floor(
    (now.getTime() - lastBirthDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const livedWeeks =
    years * WEEKS_PER_YEAR + Math.floor(daysSinceLastBirthDate / 7);

  const initialEvents = [
    {
      title: "Primary Education",
      description: "Ages 6 to 12",
      startDate: new Date(
        birthDate.getFullYear() + 6,
        birthDate.getMonth(),
        birthDate.getDate()
      ),
      endDate: new Date(
        birthDate.getFullYear() + 12,
        birthDate.getMonth(),
        birthDate.getDate() - 1
      ),
      color: "bg-blue-500",
    },
    {
      title: "Secondary Education",
      description: "Ages 12 to 18",
      startDate: new Date(
        birthDate.getFullYear() + 12,
        birthDate.getMonth(),
        birthDate.getDate()
      ),
      endDate: new Date(
        birthDate.getFullYear() + 18,
        birthDate.getMonth(),
        birthDate.getDate() - 1
      ),
      color: "bg-green-500",
    },
    {
      title: "Higher Education",
      description: "Ages 18 to 22",
      startDate: new Date(
        birthDate.getFullYear() + 18,
        birthDate.getMonth(),
        birthDate.getDate()
      ),
      endDate: new Date(
        birthDate.getFullYear() + 22,
        birthDate.getMonth(),
        birthDate.getDate() - 1
      ),
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Birth Date Form */}
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

      {/* Calendar Grid */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Calendar (0-39 years) */}
        <div className="space-y-1">
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: WEEKS_PER_YEAR + 1 }).map((_, week) => (
              <div key={week} className="w-2 h-2 relative">
                <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px]">
                  {(week % 5 === 0 && week !== 0) || week === 1 ? week : ""}
                </span>
                {week === WEEKS_PER_YEAR && (
                  <span className="absolute -top-4 inset-0 flex items-center text-xs">
                    Week
                  </span>
                )}
              </div>
            ))}
          </div>

          {Array.from({ length: MAX_YEARS / 2 }).map((_, year) => (
            <div key={year} className="grid grid-cols-53 gap-1">
              <div className="relative">
                <span className="absolute -left-4 inset-0 flex justify-center items-center text-[10px]">
                  {year % 5 === 0 ? year : ""}
                </span>
                {year === MAX_YEARS / 2 - 1 && (
                  <span className="absolute -left-4 inset-0 flex items-center justify-center text-xs">
                    Age
                  </span>
                )}
              </div>

              {Array.from({ length: WEEKS_PER_YEAR }).map((_, week) => {
                const isLived = year * WEEKS_PER_YEAR + week < livedWeeks;
                const isCurrent = year * WEEKS_PER_YEAR + week === livedWeeks;
                const weekStartDate = new Date(
                  birthDate.getFullYear() + year,
                  birthDate.getMonth(),
                  birthDate.getDate() + week * 7
                );
                const weekEndDate = new Date(
                  birthDate.getFullYear() + year,
                  birthDate.getMonth(),
                  birthDate.getDate() + (week + 1) * 7 - 1
                );
                const events = initialEvents.filter((event) => {
                  return (
                    event.startDate <= weekEndDate &&
                    event.endDate >= weekStartDate
                  );
                });
                return (
                  <WeekCell
                    key={week}
                    isLived={isLived}
                    isCurrent={isCurrent}
                    events={events}
                    weekStartDate={weekStartDate}
                    weekEndDate={weekEndDate}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Right Calendar (40-79 years) */}
        <div className="space-y-1 mt-8 lg:mt-0">
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: WEEKS_PER_YEAR + 1 }).map((_, week) => (
              <div key={week} className="w-2 h-2 relative">
                <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px]">
                  {(week % 5 === 0 && week !== 0) || week === 1 ? week : ""}
                </span>
                {week === WEEKS_PER_YEAR && (
                  <span className="absolute -top-4 inset-0 flex items-center text-xs">
                    Week
                  </span>
                )}
              </div>
            ))}
          </div>

          {Array.from({ length: MAX_YEARS / 2 }).map((_, index) => {
            const year = index + MAX_YEARS / 2;
            return (
              <div key={year} className="grid grid-cols-53 gap-1">
                <div className="relative">
                  <span className="absolute -left-4 inset-0 flex justify-center items-center text-[10px]">
                    {year % 5 === 0 ? year : ""}
                  </span>
                  {year === MAX_YEARS - 1 && (
                    <span className="absolute -left-4 inset-0 flex items-center justify-center text-xs">
                      Age
                    </span>
                  )}
                </div>

                {Array.from({ length: WEEKS_PER_YEAR }).map((_, week) => {
                  const isLived = year * WEEKS_PER_YEAR + week < livedWeeks;
                  const isCurrent = year * WEEKS_PER_YEAR + week === livedWeeks;
                  const weekStartDate = new Date(
                    birthDate.getFullYear() + year,
                    birthDate.getMonth(),
                    birthDate.getDate() + week * 7
                  );
                  const weekEndDate = new Date(
                    birthDate.getFullYear() + year,
                    birthDate.getMonth(),
                    birthDate.getDate() + (week + 1) * 7 - 1
                  );
                  const events = initialEvents.filter((event) => {
                    return (
                      event.startDate <= weekEndDate &&
                      event.endDate >= weekStartDate
                    );
                  });
                  return (
                    <WeekCell
                      key={week}
                      isLived={isLived}
                      isCurrent={isCurrent}
                      events={events}
                      weekStartDate={weekStartDate}
                      weekEndDate={weekEndDate}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
