"use client";

/**
 * Instant loading skeleton that shows immediately.
 * Optimized for mobile with minimal layout shift.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Minimal loading indicator */}
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing logo placeholder */}
        <div 
          className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400"
          style={{
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div className="h-1.5 w-24 rounded-full bg-[rgb(var(--hairline))] overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400"
            style={{
              width: "60%",
              animation: "loading-slide 1.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
