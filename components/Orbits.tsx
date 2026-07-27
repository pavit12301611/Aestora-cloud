/**
 * Decorative concentric orbit rings behind the hero visual.
 *
 * Four gradient hairline circles, alternating spin direction at different
 * speeds, each carrying a small glowing node that flies in on load. Purely
 * presentational — it carries no copy, so nothing here competes with the
 * headline for meaning.
 */

type Node = {
  /** Which ring the node rides on. */
  orbit: 1 | 2 | 3 | 4;
  /** Position around the ring, in degrees. */
  angle: number;
  size: number;
  /** Square nodes get a radius; round ones stay pills. */
  square?: number;
  glow: "violet" | "orchid" | "rose" | "azure" | "amber";
  delay: number;
};

const RINGS: Record<Node["orbit"], { d: number; r: number; spin: string; secs: number }> = {
  1: { d: 353, r: 177, spin: "spin-left", secs: 30 },
  2: { d: 501, r: 251, spin: "spin-right", secs: 40 },
  3: { d: 649, r: 325, spin: "spin-right", secs: 50 },
  4: { d: 797, r: 399, spin: "spin-left", secs: 60 },
};

const GLOW: Record<Node["glow"], string> = {
  violet: "rgba(160, 104, 255, 0.65)",
  orchid: "rgba(217, 161, 255, 0.6)",
  rose: "rgba(255, 122, 180, 0.55)",
  azure: "rgba(96, 168, 255, 0.5)",
  amber: "rgba(255, 176, 92, 0.5)",
};

const NODES: Node[] = [
  { orbit: 1, angle: 270, size: 58, square: 20, glow: "violet", delay: 0.6 },
  { orbit: 2, angle: 60, size: 58, glow: "amber", delay: 0.85 },
  { orbit: 2, angle: 180, size: 78, glow: "rose", delay: 1.05 },
  { orbit: 2, angle: 300, size: 58, square: 20, glow: "azure", delay: 1.25 },
  { orbit: 3, angle: 130, size: 88, glow: "rose", delay: 1.5 },
  { orbit: 4, angle: 30, size: 58, glow: "violet", delay: 1.75 },
  { orbit: 4, angle: 95, size: 88, square: 24, glow: "amber", delay: 1.95 },
  { orbit: 4, angle: 220, size: 88, square: 24, glow: "rose", delay: 2.15 },
  { orbit: 4, angle: 320, size: 58, glow: "orchid", delay: 2.3 },
];

function OrbitNode({ node }: { node: Node }) {
  const ring = RINGS[node.orbit];

  return (
    <span
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{
        transform: `translate(-50%, -50%) rotate(${node.angle}deg) translate(${ring.r}px) rotate(-${node.angle}deg)`,
      }}
    >
      <span
        className="orbit-node absolute block bg-gradient-to-br from-brand-400/70 via-brand-600/50 to-transparent opacity-0 ring-1 ring-inset ring-white/20 backdrop-blur-sm [animation:orbit-fly-in_.9s_var(--ease-out-expo)_forwards]"
        style={{
          width: node.size,
          height: node.size,
          borderRadius: node.square ? node.square : "50%",
          boxShadow: `0 0 30px 4px ${GLOW[node.glow]}`,
          animationDelay: `${node.delay}s`,
        }}
      />
    </span>
  );
}

export default function Orbits({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-0 [animation:rise_1.2s_var(--ease-out-expo)_.3s_forwards] ${className}`}
    >
      {(Object.keys(RINGS) as unknown as Node["orbit"][])
        // Outermost first so the inner rings paint on top of it.
        .map((key) => Number(key) as Node["orbit"])
        .sort((a, b) => b - a)
        .map((orbit) => {
          const ring = RINGS[orbit];
          return (
            <div
              key={orbit}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: ring.d,
                height: ring.d,
                transform: "translate(-50%, -50%)",
                animation: `${ring.spin} ${ring.secs}s linear infinite`,
              }}
            >
              {/* Gradient hairline — a 1px padded mask, not a flat border. */}
              <span className="orbit-ring absolute inset-0 rounded-full p-px" />
              {NODES.filter((n) => n.orbit === orbit).map((n, i) => (
                <OrbitNode key={`${orbit}-${i}`} node={n} />
              ))}
            </div>
          );
        })}
    </div>
  );
}
