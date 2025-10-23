"use client";

import { Event } from "@/types/event";
import { useState } from "react";

interface EventManagerProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

export default function EventManager({
  events,
  onEventsChange,
}: EventManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#1e2939");

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setTitle("New Event");
    setDescription("New Event Description");
    setStartTime(new Date().toISOString().split("T")[0]);
    setEndTime(new Date().toISOString().split("T")[0]);
    setColor("#1e2939");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime.toISOString().split("T")[0]);
    setEndTime(event.endTime.toISOString().split("T")[0]);
    setColor(event.color);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    // const newEvent: Omit<Event, "id"> = {
    //   title,
    //   description,
    //   startDate: new Date(startDate),
    //   endDate: new Date(endDate),
    //   color,
    // };
    const newEvent: Event = {
      id: Math.random().toString(),
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      color,
    };

    try {
      // const res = await fetch("/api/event/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newEvent),
      // });

      // if (!res.ok) {
      //   const errData = await res.json();
      //   throw new Error(errData.message || "Event create failed");
      // }

      // const createdEvent = await res.json();
      onEventsChange([...events, newEvent]);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id
        ? {
            ...event,
            title,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            color,
          }
        : event
    );
    onEventsChange(updatedEvents);
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    if (!editingEvent) return;
    onEventsChange(events.filter((event) => event.id !== editingEvent.id));
    handleCloseModal();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap space-x-2 space-y-2 overflow-x-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: event.color }}
            onClick={() => handleOpenEditModal(event)}
          ></div>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300"
          onClick={handleOpenCreateModal}
        >
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 flex justify-center z-10">
          <div className="w-lg mx-auto p-8 rounded-md shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {editingEvent ? "Edit Event" : "Create Event"}
            </h2>
            <form
              onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="block mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block mb-1">
                  Start Date
                </label>
                <input
                  id="startTime"
                  type="date"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block mb-1">
                  End Date
                </label>
                <input
                  id="endTime"
                  type="date"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="color" className="block mb-1">
                  Color
                </label>
                <input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 border p-1 rounded"
                />
              </div>

              <div className="flex space-x-2">
                {editingEvent && (
                  <button
                    type="button"
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </button>
                )}

                <button
                  type="button"
                  className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
