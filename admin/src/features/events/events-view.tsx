"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/components/ui/card";

import { EventCard } from "./components/event-card";
import { EditEventModal } from "./components/edit-event-modal";
import type { EventMenuAction } from "./components/event-actions-menu";
import { EventsToolbar } from "./components/events-toolbar";
import { events } from "./data/events";
import type { EventItem } from "./types";
import { groupEventsByMonth } from "./utils";

export function EventsView() {
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(new Date());
  const [eventItems, setEventItems] = useState<EventItem[]>(events);
  const [activeEditEvent, setActiveEditEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return eventItems;

    return eventItems.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(normalized);
      const descriptionMatch = event.description.toLowerCase().includes(normalized);
      return titleMatch || descriptionMatch;
    });
  }, [eventItems, query]);

  const grouped = useMemo(() => groupEventsByMonth(filtered), [filtered]);

  const handleEventAction = (action: EventMenuAction, event: EventItem) => {
    if (action === "edit") {
      setActiveEditEvent(event);
    }
  };

  const handleEditSubmit = (updatedEvent: EventItem) => {
    setEventItems((prev) =>
      prev.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)),
    );
    setActiveEditEvent(updatedEvent);
  };

  return (
    <section className="w-full space-y-6">
      <EventsToolbar query={query} onQueryChange={setQuery} />

      {grouped.length === 0 ? (
        <Card className="rounded-xl border border-[#E4E4E7] bg-white px-6 py-10 text-center shadow-none">
          <p className="text-base font-medium text-[#646464]">
            No events match your search.
          </p>
        </Card>
      ) : (
        grouped.map((group, index) => (
          <div key={group.key} className="space-y-4">
            {index > 0 ? (
              <h2 className="text-3xl font-semibold text-[#0C0C0C]">{group.label}</h2>
            ) : null}
            <div className="space-y-4">
              {group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  now={now}
                  onAction={handleEventAction}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <EditEventModal
        open={Boolean(activeEditEvent)}
        event={activeEditEvent}
        onOpenChange={(open) => {
          if (!open) setActiveEditEvent(null);
        }}
        onSubmit={handleEditSubmit}
      />
    </section>
  );
}
