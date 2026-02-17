'use client';

import WeekCell from '@/components/WeekCell';
import { Event } from '@/types/event';

interface CalendarGridProps {
  startYear: number;
  endYear: number;
  weeksPerYear: number;
  livedWeeks: number;
  birthDate: Date;
  events: Event[];
}

export default function CalendarGrid({
  startYear,
  endYear,
  weeksPerYear,
  livedWeeks,
  birthDate,
  events,
}: CalendarGridProps) {
  return (
    <div className="space-y-1">
      {Array.from({ length: endYear - startYear }).map((_, index) => {
        const year = startYear + index;
        return (
          <div key={year} className="grid grid-cols-53 gap-1">
            <div className="relative">
              <span className="absolute -left-4 inset-0 flex justify-center items-center text-[10px] text-muted">
                {year % 5 === 0 ? year : ''}
              </span>
              {year === endYear - 1 && (
                <span className="absolute -left-4 inset-0 flex items-center justify-center text-xs text-muted">
                  Age
                </span>
              )}
            </div>

            {Array.from({ length: weeksPerYear }).map((_, week) => {
              const isLived = year * weeksPerYear + week < livedWeeks;
              const isCurrent = year * weeksPerYear + week === livedWeeks;
              const weekStartTime = new Date(
                birthDate.getFullYear() + year,
                birthDate.getMonth(),
                birthDate.getDate() + week * 7,
              );
              const weekEndTime = new Date(
                birthDate.getFullYear() + year,
                birthDate.getMonth(),
                birthDate.getDate() + (week + 1) * 7 - 1,
              );
              const filteredEvents = events.filter((event) => {
                return event.startTime <= weekEndTime && event.endTime >= weekStartTime;
              });
              return (
                <WeekCell
                  key={week}
                  isLived={isLived}
                  isCurrent={isCurrent}
                  events={filteredEvents}
                  weekStartTime={weekStartTime}
                  weekEndTime={weekEndTime}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
