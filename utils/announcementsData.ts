export interface Announcement {
  id: string;
  title: string;
  date: Date;
  time?: Date;
  content: string;
  type: "urgent" | "general" | "event" | "reminder";
  isPinned: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Weekly Youth Program Update",
    date: new Date("2025-07-30"),
    content:
      "The youth program schedule has been updated for August. New activities include Islamic history workshops and community service projects. Ages 13-18 welcome.",
    type: "general",
    isPinned: false,
  },
  {
    id: "2",
    title: "Upcoming Eid al-Adha Celebration",
    date: new Date("2025-08-06"),
    time: new Date("2025-08-06T08:00:00"),
    content:
      "Join us for Eid al-Adha prayers and celebration. Prayer starts at 8:00 AM followed by community breakfast. Please bring a dish to share if possible.",
    type: "urgent",
    isPinned: true,
  },
  {
    id: "3",
    title: "New Quran Classes Starting Soon",
    date: new Date("2025-08-01"),
    content:
      "We are excited to announce new Quran memorization classes for children ages 8-15. Registration opens next week. Classes will be held on weekends with qualified instructors.",
    type: "event",
    isPinned: true,
  },
  {
    id: "4",
    title: "Parking Reminder for Friday Prayers",
    date: new Date("2025-07-28"),
    content:
      "Please be mindful of parking regulations during Friday prayers. Do not block driveways or fire lanes. Additional parking is available at the community center.",
    type: "reminder",
    isPinned: false,
  },
  {
    id: "5",
    title: "Community Iftar Success",
    date: new Date("2025-07-25"),
    content:
      "Thank you to everyone who participated in our community Iftar last week. Over 200 community members attended. Next community gathering will be announced soon.",
    type: "general",
    isPinned: false,
  },
  {
    id: "6",
    title: "Monthly Masjid Cleaning Day",
    date: new Date("2025-08-10"),
    time: new Date("2025-08-10T09:00:00"),
    content:
      "Monthly community cleaning day this Saturday. Volunteers needed for general cleaning, garden maintenance, and organizing. Lunch will be provided for all volunteers.",
    type: "general",
    isPinned: false,
  },
  {
    id: "7",
    title: "Guest Speaker: Dr. Ahmad Hassan",
    date: new Date("2025-08-15"),
    time: new Date("2025-08-15T19:30:00"),
    content:
      'Join us for a special lecture on "Islamic Ethics in Modern Times" by Dr. Ahmad Hassan. Light refreshments will be served after the talk.',
    type: "event",
    isPinned: false,
  },
  {
    id: "8",
    title: "Library Book Donation Drive",
    date: new Date("2025-07-20"),
    content:
      "We are collecting Islamic books, children's books, and educational materials for our community library. Drop off donations at the main office during business hours.",
    type: "general",
    isPinned: false,
  },
  {
    id: "9",
    title: "IALFM is Hiring! Multiple Open Position",
    date: new Date("2025-08-18"),
    content:
      "We are hiring for Religious Director, Sisters Program Lead, Youth Program Lead, and Facility Manager positions. Send your resume to bod@ialfm.org.",
    type: "urgent",
    isPinned: true,
  },
];

// Helper function to get the most recent announcement
export const getMostRecentAnnouncement = (): Announcement | null => {
  if (announcements.length === 0) return null;

  // Sort announcements: pinned first, then by date (newest first)
  const sortedAnnouncements = announcements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.date.getTime() - a.date.getTime();
  });

  return sortedAnnouncements[0];
};

// Helper function to format date for display
export const formatAnnouncementDate = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

// Helper function to get announcement type color
export const getAnnouncementTypeColor = (type: string): string => {
  switch (type) {
    case "urgent":
      return "#DC3545";
    case "general":
      return "#2E8B57";
    case "event":
      return "#4A90E2";
    case "reminder":
      return "#FF9800";
    default:
      return "#666";
  }
};

// Helper function to truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};
