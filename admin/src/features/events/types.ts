export type EventActionType = "join" | "countdown";

export type EventBadge = {
  label: string;
  tone: "danger";
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  coverImageName?: string;
  coverImageSizeKb?: number;
  link?: string;
  setReminder?: boolean;
  startDate: string;
  endDate: string;
  slotsLeft: number;
  slotsTotal: number;
  action: EventActionType;
  badge?: EventBadge;
};

export type EventGroup = {
  key: string;
  label: string;
  events: EventItem[];
};
