/**
 * Ambient page backdrop: aurora blooms + grid + noise.
 * Purely decorative, fixed behind all content.
 */
export default function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden noise"
    >
      <div className="absolute inset-0 grid-bg mask-fade-b" />

      <div
        className="absolute -left-[18%] -top-[22%] h-[68vw] w-[68vw] rounded-full blur-[120px] animate-drift"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-a), transparent 68%)",
        }}
      />
      <div
        className="absolute -right-[16%] top-[8%] h-[54vw] w-[54vw] rounded-full blur-[130px] animate-drift"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-b), transparent 68%)",
        }}
      />
      <div
        className="absolute bottom-[-24%] left-[22%] h-[58vw] w-[58vw] rounded-full blur-[140px] animate-drift"
        style={{
          animationDelay: "-16s",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-c), transparent 70%)",
        }}
      />
    </div>
  );
}
