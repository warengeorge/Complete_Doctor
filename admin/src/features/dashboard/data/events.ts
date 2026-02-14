type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
};

export const events: Event[] = [
  {
    id: "1",
    title: "MRCGP AKT Essentials: Clinical Knowledge Masterclass",
    startDate: "2025-03-21T07:00:00",
    endDate: "2025-03-21T09:00:00",
    image: "/images/event-image1.svg",
  },
  {
    id: "2",
    title: "MSRA Preparation: Core Clinical Topics Simplified",
    startDate: "2026-03-28T07:00:00",
    endDate: "2026-03-28T09:00:00",
    image: "/images/event-image2.svg",
  },
];
