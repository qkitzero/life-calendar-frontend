'use client';

import { useUser } from '@/context/UserContext';
import { Event } from '@/types/event';
import { useState } from 'react';

interface EventManagerProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

export default function EventManager({ events, onEventsChange }: EventManagerProps) {
  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#1e2939');

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setTitle('New Event');
    setDescription('New Event Description');
    setStartTime(new Date().toISOString().split('T')[0]);
    setEndTime(new Date().toISOString().split('T')[0]);
    setColor('#1e2939');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime.toISOString().split('T')[0]);
    setEndTime(event.endTime.toISOString().split('T')[0]);
    setColor(event.color);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (user) {
      try {
        const startTimeISO = new Date(startTime).toISOString();
        const endTimeISO = new Date(endTime).toISOString();
        const res = await fetch('/api/event/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            startTimeISO,
            endTimeISO,
            color,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to create event');
        }

        const data = await res.json();

        const newEvent: Event = {
          id: data.event.id,
          title: data.event.title,
          description: data.event.description,
          startTime: new Date(data.event.startTime),
          endTime: new Date(data.event.endTime),
          color,
        };

        onEventsChange([...events, newEvent]);
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const newEvent: Event = {
          id: Math.random().toString(),
          title,
          description,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          color,
        };
        onEventsChange([...events, newEvent]);
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    if (loading) return;
    setLoading(true);
    if (user) {
      try {
        const startTimeISO = new Date(startTime).toISOString();
        const endTimeISO = new Date(endTime).toISOString();
        const res = await fetch('/api/event/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingEvent.id,
            title,
            description,
            startTimeISO,
            endTimeISO,
            color,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update event');
        }

        const data = await res.json();

        const updatedEvents = events.map((event) =>
          event.id === editingEvent.id
            ? {
                id: data.event.id,
                title: data.event.title,
                description: data.event.description,
                startTime: new Date(data.event.startTime),
                endTime: new Date(data.event.endTime),
                color,
              }
            : event,
        );
        onEventsChange(updatedEvents);
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
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
            : event,
        );
        onEventsChange(updatedEvents);
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (!editingEvent) return;
    if (loading) return;
    setLoading(true);
    if (user) {
      try {
        const res = await fetch('/api/event/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingEvent.id,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to delete event');
        }

        onEventsChange(events.filter((event) => event.id !== editingEvent.id));
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        onEventsChange(events.filter((event) => event.id !== editingEvent.id));
        handleCloseModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap space-x-2 space-y-2 overflow-x-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg hover:scale-110 ring-1 ring-[var(--ring-subtle)] transition-transform"
            style={{ backgroundColor: event.color }}
            onClick={() => handleOpenEditModal(event)}
          ></div>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center cursor-pointer bg-raised-hover text-secondary rounded-lg hover:bg-raised-strong transition"
          onClick={handleOpenCreateModal}
        >
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay backdrop-blur-sm z-50">
          <div className="w-full max-w-lg mx-4 p-8 rounded-2xl bg-modal backdrop-blur-xl border border-subtle shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <form
              onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-secondary">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-1 text-sm font-medium text-secondary">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block mb-1 text-sm font-medium text-secondary">
                  Start Date
                </label>
                <input
                  id="startTime"
                  type="date"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block mb-1 text-sm font-medium text-secondary">
                  End Date
                </label>
                <input
                  id="endTime"
                  type="date"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full bg-raised border border-subtle rounded-xl px-3 py-2 text-primary focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="color" className="block mb-1 text-sm font-medium text-secondary">
                  Color
                </label>
                <input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 bg-raised border border-subtle rounded-xl p-1 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:outline-none transition"
                />
              </div>

              <div className="flex space-x-2">
                {editingEvent && (
                  <button
                    type="button"
                    className="w-full bg-rose-500/80 text-white py-2 rounded-xl hover:bg-rose-500 transition"
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </button>
                )}

                <button
                  type="button"
                  className="w-full bg-raised-hover text-secondary py-2 rounded-xl hover:bg-raised-strong hover:text-primary transition"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
