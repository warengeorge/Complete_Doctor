"use client";

type EventsCountdownProps = {
  startDate: string;
  now: Date;
};

function TimeBox({ value }: { value: number }) {
  return (
    <span className="flex h-8 min-w-8 items-center justify-center rounded bg-[#313131] px-2 text-sm font-semibold text-white">
      {String(value).padStart(2, "0")}
    </span>
  );
}

export function EventsCountdown({ startDate, now }: EventsCountdownProps) {
  const diff = Math.max(
    0,
    Math.floor((new Date(startDate).getTime() - now.getTime()) / 1000),
  );

  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);

  return (
    <div className="flex items-center gap-2">
      <TimeBox value={days} />
      <span className="text-lg text-[#313131]">:</span>
      <TimeBox value={hours} />
      <span className="text-lg text-[#313131]">:</span>
      <TimeBox value={minutes} />
    </div>
  );
}
