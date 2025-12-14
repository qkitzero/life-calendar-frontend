'use client';

import BirthDateInput from '@/components/BirthDateInput';
import CalendarGrid from '@/components/CalendarGrid';
import CalendarHeader from '@/components/CalendarHeader';
import EventManager from '@/components/EventManager';
import { useUser } from '@/context/UserContext';
import { Event } from '@/types/event';
import { getDefaultEvents } from '@/utils/defaultEvents';
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
    setEvents(getDefaultEvents(birthDate));
  }, [birthDateStr]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/event/list');
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
      <BirthDateInput birthDateStr={birthDateStr} onBirthDateChange={setBirthDateStr} />

      <EventManager events={events} onEventsChange={setEvents} />

      {/* Calendar Grid */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Calendar (0-39 years) */}
        <div className="space-y-1">
          <CalendarHeader weeksPerYear={WEEKS_PER_YEAR} />
          <CalendarGrid
            startYear={0}
            endYear={MAX_YEARS / 2}
            weeksPerYear={WEEKS_PER_YEAR}
            livedWeeks={livedWeeks}
            birthDate={birthDate}
            events={events}
          />
        </div>

        {/* Right Calendar (40-79 years) */}
        <div className="space-y-1 mt-8 lg:mt-0">
          <CalendarHeader weeksPerYear={WEEKS_PER_YEAR} />
          <CalendarGrid
            startYear={MAX_YEARS / 2}
            endYear={MAX_YEARS}
            weeksPerYear={WEEKS_PER_YEAR}
            livedWeeks={livedWeeks}
            birthDate={birthDate}
            events={events}
          />
        </div>
      </div>
    </div>
  );
}
