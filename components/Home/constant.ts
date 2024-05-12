import { MEETING_STATES } from "./types";

export const cardList = [
  {
    value: MEETING_STATES.INSTANT,
    title: "New Meeting",
    description: "Start an instant meeting",
    icon: "icons/add-meeting.svg",
    className: "bg-orange-1",
  },
  {
    value: MEETING_STATES.SCHUEDULE,
    title: "Schedule Meeting",
    description: "Plan your meeting",
    icon: "icons/schedule.svg",
    className: "bg-blue-1",
  },
  {
    value: MEETING_STATES.RECORDINGS,
    title: "View Recordings",
    description: "Checkout your recordings",
    icon: "icons/recordings.svg",
    className: "bg-purple-500",
  },
  {
    value: MEETING_STATES.JOINING,
    title: "Join Meeting",
    description: "via invitation linl",
    icon: "icons/join-meeting.svg",
    className: "bg-yellow-500",
  },
];
