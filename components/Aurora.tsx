/**
 * Ambient page backdrop: Elegant gold-amber & teal aurora for Aestora's luxury cloud aesthetic.
 * Soft drifting blooms, refined light beams, subtle grid + noise texture.
 * Purely decorative, fixed behind all content.
 */
export default function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grain sits in its own layer. Previously `.noise` was on the wrapper,
          so its `opacity: 0.65` washed out every bloom underneath it. */}
      <div className="absolute inset-0 noise" />

      {/* Base wash - deep elegant navy with subtle gold spot */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, var(--spot), transparent 60%)",
        }}
      />

      <div className="absolute inset-0 grid-bg mask-fade-b" />

      {/* Drifting luxury aurora blooms (gold + teal) */}
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

      {/* Elegant vertical light beams (refined for premium look) */}
      <div className="absolute inset-x-0 top-0 h-[70vh] overflow-hidden">
        <div
          className="absolute -top-[30%] left-[18%] h-[130%] w-[16vw] rotate-12 blur-3xl animate-beam"
          style={{
            background:
              "linear-gradient(to bottom, var(--glow-a), transparent 72%)",
          }}
        />
        <div
          className="absolute -top-[30%] right-[22%] h-[130%] w-[11vw] -rotate-12 blur-3xl animate-beam"
          style={{
            animationDelay: "-2.2s",
            background:
              "linear-gradient(to bottom, var(--glow-b), transparent 72%)",
          }}
        />
      </div>

      {/* Cursor-following bloom.
          --gx/--gy are written to <body> by Interactions; this layer is a
          descendant of <body>, so it inherits them. The old
          `transition: background` animated a gradient that browsers cannot
          interpolate cheaply — it forced a repaint of a full-viewport layer on
          every pointer frame. The rAF throttle upstream is smoothing enough. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--gx, -999px) var(--gy, -999px), var(--spot), transparent 70%)",
        }}
      />
    </div>
  );
}
