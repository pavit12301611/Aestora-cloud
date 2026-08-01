"use client";

/**
 * Ambient page backdrop: electric-violet aurora over deep ink.
 * Soft drifting blooms, refined light beams, subtle grid + noise texture.
 * Purely decorative, fixed behind all content.
 * 
 * Mobile-optimized: reduces blur intensity, disables heavy animations on phones
 */
export default function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grain sits in its own layer. Disabled on mobile for performance */}
      <div className="absolute inset-0 noise hidden md:block" />

      {/* Base wash — deep ink with a violet spot bleeding down from the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, var(--spot), transparent 60%)",
        }}
      />

      <div className="absolute inset-0 grid-bg mask-fade-b" />

      {/* Drifting luxury aurora blooms (gold + teal) 
          Mobile: reduced size, blur, and animation complexity */}
      <div
        className="absolute -left-[18%] -top-[22%] rounded-full animate-drift"
        style={{
          height: "clamp(180px, 40vw, 68vw)",
          width: "clamp(180px, 40vw, 68vw)",
          filter: "blur(min(80px, 12vw))",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-a), transparent 68%)",
        }}
      />
      <div
        className="absolute -right-[16%] top-[8%] rounded-full animate-drift hidden sm:block"
        style={{
          height: "clamp(120px, 30vw, 54vw)",
          width: "clamp(120px, 30vw, 54vw)",
          filter: "blur(min(90px, 10vw))",
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-b), transparent 68%)",
        }}
      />
      <div
        className="absolute bottom-[-24%] left-[22%] rounded-full animate-drift hidden sm:block"
        style={{
          height: "clamp(100px, 28vw, 58vw)",
          width: "clamp(100px, 28vw, 58vw)",
          filter: "blur(min(100px, 8vw))",
          animationDelay: "-16s",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-c), transparent 70%)",
        }}
      />

      {/* Elegant vertical light beams — desktop only, reduced on tablet */}
      <div className="absolute inset-x-0 top-0 h-[70vh] overflow-hidden hidden lg:block">
        <div
          className="absolute -top-[30%] left-[18%] h-[130%] w-[16vw] rotate-12 animate-beam"
          style={{
            filter: "blur(40px)",
            background:
              "linear-gradient(to bottom, var(--glow-a), transparent 72%)",
          }}
        />
        <div
          className="absolute -top-[30%] right-[22%] h-[130%] w-[11vw] -rotate-12 animate-beam"
          style={{
            filter: "blur(40px)",
            animationDelay: "-2.2s",
            background:
              "linear-gradient(to bottom, var(--glow-b), transparent 72%)",
          }}
        />
      </div>

      {/* Cursor-following bloom — desktop only */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--gx, -999px) var(--gy, -999px), var(--spot), transparent 70%)",
        }}
      />
    </div>
  );
}
