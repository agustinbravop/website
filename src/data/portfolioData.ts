export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export interface Project {
  title: string;
  initials: string;
  year: string;
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  featured?: boolean;
  link?: string;
  linkLabel?: string;
  media?: ProjectMedia;
}

export const projects: Project[] = [
  {
    title: "Atlas Mobile",
    initials: "AM",
    year: "2025",
    featured: true,
    description:
      "A React Native app that helps families stay connected with senior relatives through lightweight check-ins, shared moments, and gentle reminders.",
    highlights: [
      "Shipped v1 in 6 weeks with a team of 5",
      "Offline-first flows for low-connectivity environments",
      "Accessibility pass (larger type, reduced motion, VoiceOver)",
    ],
    tags: ["React Native", "TypeScript", "Expo", "Accessibility"],
    gradient: "from-teal-400/30 via-cyan-500/20 to-slate-900/0",
    link: "https://example.com/atlas-mobile",
    linkLabel: "Case study",
    media: {
      type: "image",
      src: "https://picsum.photos/id/1015/1200/800",
      alt: "Phone mockups floating over a landscape background",
    },
  },
  {
    title: "Bloom Motion",
    initials: "BM",
    year: "2024",
    description:
      "A small interactive web experiment exploring motion, video, and performance on low-end devices.",
    highlights: [
      "Built a lightweight video hero with progressive enhancement",
      "Implemented route-level code splitting",
      "Measured and improved LCP by 30%",
    ],
    tags: ["Vite", "React", "Performance", "Motion"],
    gradient: "from-fuchsia-500/25 via-rose-500/15 to-slate-900/0",
    link: "https://example.com/bloom-motion",
    linkLabel: "Live demo",
    media: {
      type: "video",
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/id/1025/1200/800",
    },
  },
];
