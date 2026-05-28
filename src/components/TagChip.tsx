const tagColors: Record<string, string> = {
  "React Native": "#61DAFB",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  Expo: "#000020",
  Accessibility: "#7C3AED",
  Vite: "#646CFF",
  Performance: "#10B981",
  Motion: "#F59E0B",
  JavaScript: "#F7DF1E",
  "Chrome APIs": "#4285F4",
  Firebase: "#FFCA28",
};

const defaultTagColor = "#F59E0B";

export default function TagChip({ tag }: { tag: string }) {
  const color = tagColors[tag] ?? defaultTagColor;

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-sm text-gray-300 border transition-colors font-mono tracking-tight"
      style={{
        backgroundColor: `${color}14`,
        borderColor: `${color}30`,
      }}
    >
      <span
        className="w-1 h-1 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {tag}
    </span>
  );
}
