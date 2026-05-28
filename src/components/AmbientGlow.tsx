export default function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(245,158,11,0.09) 0%, transparent 70%)",
      }}
    />
  );
}
