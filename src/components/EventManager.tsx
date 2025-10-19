"use client";

import { Event } from "@/types/event";

interface EventManagerProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

export default function EventManager({ events }: EventManagerProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap space-x-2 space-y-2 overflow-x-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: event.color }}
          ></div>
        ))}
        <button className="w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300 ">
          +
        </button>
      </div>
    </div>
  );
}
