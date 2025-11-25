'use client';

import EventManager from '@/components/EventManager';
import WeekCell from '@/components/WeekCell';
import { useUser } from '@/context/UserContext';
import { Event } from '@/types/event';
import { useEffect, useState } from 'react';

const MAX_YEARS = 80;
const WEEKS_PER_YEAR = 52;

export default function Calendar() {
  const [birthDateStr, setBirthDateStr] = useState('2000-01-01');
  const [events, setEvents] = useState<Event[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setBirthDateStr(
        user.birthDate.year.toString().padStart(4, '0') +
          '-' +
          user.birthDate.month.toString().padStart(2, '0') +
          '-' +
          user.birthDate.day.toString().padStart(2, '0'),
      );
    }
  }, [user]);

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  const years = new Date(diff).getUTCFullYear() - 1970;
  const isBirthDatePassedThisYear =
    now.getTime() >
    new Date(now.getUTCFullYear(), birthDate.getMonth(), birthDate.getDate()).getTime();
  const birthDateYearOffset = isBirthDatePassedThisYear ? 0 : 1;
  const lastBirthDate = new Date(
    now.getUTCFullYear() - birthDateYearOffset,
    birthDate.getMonth(),
    birthDate.getDate(),
  );
  const daysSinceLastBirthDate = Math.floor(
    (now.getTime() - lastBirthDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const livedWeeks = years * WEEKS_PER_YEAR + Math.floor(daysSinceLastBirthDate / 7);

  useEffect(() => {
    if (user) return;

    setEvents([
      {
        id: '1',
        title: 'Elementary School',
        description: 'Ages 6 to 12',
        startTime: new Date(birthDate.getFullYear() + 6, birthDate.getMonth(), birthDate.getDate()),
        endTime: new Date(
          birthDate.getFullYear() + 12,
          birthDate.getMonth(),
          birthDate.getDate() - 1,
        ),
        color: '#fca5a5',
      },
      {
        id: '2',
        title: 'Middle School',
        description: 'Ages 12 to 15',
        startTime: new Date(
          birthDate.getFullYear() + 12,
          birthDate.getMonth(),
          birthDate.getDate(),
        ),
        endTime: new Date(
          birthDate.getFullYear() + 15,
          birthDate.getMonth(),
          birthDate.getDate() - 1,
        ),
        color: '#93c5fd',
      },
      {
        id: '3',
        title: 'High School',
        description: 'Ages 15 to 18',
        startTime: new Date(
          birthDate.getFullYear() + 15,
          birthDate.getMonth(),
          birthDate.getDate(),
        ),
        endTime: new Date(
          birthDate.getFullYear() + 18,
          birthDate.getMonth(),
          birthDate.getDate() - 1,
        ),
        color: '#fde047',
      },
      {
        id: '4',
        title: 'University',
        description: 'Ages 18 to 22',
        startTime: new Date(
          birthDate.getFullYear() + 18,
          birthDate.getMonth(),
          birthDate.getDate(),
        ),
        endTime: new Date(
          birthDate.getFullYear() + 22,
          birthDate.getMonth(),
          birthDate.getDate() - 1,
        ),
        color: '#a7f3d0',
      },
      {
        id: '5',
        title: 'First Job',
        description: 'Ages 22 to 25',
        startTime: new Date(
          birthDate.getFullYear() + 22,
          birthDate.getMonth(),
          birthDate.getDate(),
        ),
        endTime: new Date(
          birthDate.getFullYear() + 25,
          birthDate.getMonth(),
          birthDate.getDate() - 1,
        ),
        color: '#d8b4fe',
      },
    ]);
  }, [birthDateStr]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/event/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        const fetchedEvents = data.events.map((event: Event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          color:
            event.color ||
            '#' +
              Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0'),
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center relative">
      {/* Birth Date Form */}
      <div className="mb-4">
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

      <EventManager events={events} onEventsChange={setEvents} />

      {/* Calendar Grid */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Calendar (0-39 years) */}
        <div className="space-y-1">
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: WEEKS_PER_YEAR + 1 }).map((_, week) => (
              <div key={week} className="w-2 h-2 relative">
                <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px]">
                  {(week % 5 === 0 && week !== 0) || week === 1 ? week : ''}
                </span>
                {week === WEEKS_PER_YEAR && (
                  <span className="absolute -top-4 inset-0 flex items-center text-xs">Week</span>
                )}
              </div>
            ))}
          </div>

          {Array.from({ length: MAX_YEARS / 2 }).map((_, year) => (
            <div key={year} className="grid grid-cols-53 gap-1">
              <div className="relative">
                <span className="absolute -left-4 inset-0 flex justify-center items-center text-[10px]">
                  {year % 5 === 0 ? year : ''}
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
          ))}
        </div>

        {/* Right Calendar (40-79 years) */}
        <div className="space-y-1 mt-8 lg:mt-0">
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: WEEKS_PER_YEAR + 1 }).map((_, week) => (
              <div key={week} className="w-2 h-2 relative">
                <span className="absolute -top-4 inset-0 flex justify-center items-center text-[10px]">
                  {(week % 5 === 0 && week !== 0) || week === 1 ? week : ''}
                </span>
                {week === WEEKS_PER_YEAR && (
                  <span className="absolute -top-4 inset-0 flex items-center text-xs">Week</span>
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
                    {year % 5 === 0 ? year : ''}
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
      </div>
    </div>
  );
}
