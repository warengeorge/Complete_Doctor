"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
};

export function UpcomingEvents({ events }: { events: Event[] }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  const getTimeLeft = (startDate: string) => {
    const start = new Date(startDate).getTime();
    const current = now.getTime();
    const diff = start - current;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#0C0C0C]">
          Upcoming Events
        </h2>
        <Link
          href="/dashboard/events"
          className="cursor-pointer text-sm font-medium text-[#646464] hover:underline"
        >
          View all
        </Link>
      </div>

      {events.map((event) => {
        const timeLeft = getTimeLeft(event.startDate);
        const hasStarted = !timeLeft;

        return (
          <Card key={event.id} className="w-full p-3 sm:pt-2 sm:pb-2">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative h-40 w-full overflow-hidden rounded-md sm:h-26.25 sm:w-37.5 sm:shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between p-1">
                <div>
                  <h3 className="font-semibold text-sm text-[#081021]">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 font-semibold text-[11px] text-[#646464] sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.startDate).toDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(event.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                {hasStarted ? (
                  <Button className="w-22 p-[12.34px] pl-[17.63px] pr-[17.63px] bg-[#007AFF]">
                    Join
                  </Button>
                ) : (
                  timeLeft && (
                    <div className="mt-3 flex gap-2 text-sm font-medium">
                      <CountdownBox value={timeLeft.days} />
                      <span>:</span>
                      <CountdownBox value={timeLeft.hours} />
                      <span>:</span>
                      <CountdownBox value={timeLeft.minutes} />
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function CountdownBox({ value }: { value: number }) {
  return (
    <div className="bg-[#313131] text-white px-2 py-1 rounded text-xs min-w-7 text-center">
      {String(value).padStart(2, "0")}
    </div>
  );
}
