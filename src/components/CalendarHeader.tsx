'use client';

interface CalendarHeaderProps {
  weeksPerYear: number;
}

export default function CalendarHeader({ weeksPerYear }: CalendarHeaderProps) {
  return (
    <div className="grid grid-cols-53 gap-1">
      {Array.from({ length: weeksPerYear + 1 }).map((_, week) => (
        <div key={week} className="w-2 h-2 relative">
          <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px] text-muted">
            {(week % 5 === 0 && week !== 0) || week === 1 ? week : ''}
          </span>
          {week === weeksPerYear && (
            <span className="absolute -top-4 inset-0 flex items-center text-xs text-muted">Week</span>
          )}
        </div>
      ))}
    </div>
  );
}
