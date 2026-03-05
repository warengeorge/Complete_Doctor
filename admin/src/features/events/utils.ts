import type { EventGroup, EventItem } from "./types";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

export function formatEventDate(value: string): string {
  const date = new Date(value);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });

  return `${weekday}, ${day} ${month}, ${year}`;
}

export function formatEventTimeRange(start: string, end: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return `${new Date(start).toLocaleTimeString("en-US", options)} - ${new Date(
    end,
  ).toLocaleTimeString("en-US", options)}`;
}

export function buildSlotsLabel(left: number, total: number): string {
  const normalizedLeft = String(Math.max(0, left)).padStart(2, "0");
  return `${normalizedLeft}/${total} slots left`;
}

export function getSlotsProgress(left: number, total: number): number {
  if (total <= 0) return 0;
  const filled = Math.max(0, total - left);
  return Math.min(100, (filled / total) * 100);
}

export function groupEventsByMonth(items: EventItem[]): EventGroup[] {
  const grouped = new Map<string, EventItem[]>();

  const sorted = [...items].sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  for (const event of sorted) {
    const date = new Date(event.startDate);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const current = grouped.get(key) ?? [];
    current.push(event);
    grouped.set(key, current);
  }

  return Array.from(grouped.entries()).map(([key, events]) => {
    const date = new Date(events[0].startDate);
    return {
      key,
      label: monthFormatter.format(date),
      events,
    };
  });
}

export function formatDateForEditInput(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

export function formatTimeForEditInput(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function parseEditDateTime(
  dateValue: string,
  timeValue: string,
  fallback: string,
): string {
  const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const timePattern = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

  const dateMatch = dateValue.trim().match(datePattern);
  const timeMatch = timeValue.trim().match(timePattern);

  if (!dateMatch || !timeMatch) return fallback;

  const day = Number(dateMatch[1]);
  const month = Number(dateMatch[2]) - 1;
  const year = Number(dateMatch[3]);
  const hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const meridiem = timeMatch[3].toUpperCase();

  if (
    Number.isNaN(day) ||
    Number.isNaN(month) ||
    Number.isNaN(year) ||
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    day < 1 ||
    day > 31 ||
    month < 0 ||
    month > 11 ||
    hours < 1 ||
    hours > 12 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return fallback;
  }

  const hours24 = hours % 12 + (meridiem === "PM" ? 12 : 0);

  const date = new Date(year, month, day, hours24, minutes, 0);
  if (Number.isNaN(date.getTime())) return fallback;

  const isoYear = String(date.getFullYear());
  const isoMonth = String(date.getMonth() + 1).padStart(2, "0");
  const isoDay = String(date.getDate()).padStart(2, "0");
  const isoHour = String(date.getHours()).padStart(2, "0");
  const isoMinute = String(date.getMinutes()).padStart(2, "0");

  return `${isoYear}-${isoMonth}-${isoDay}T${isoHour}:${isoMinute}:00`;
}
