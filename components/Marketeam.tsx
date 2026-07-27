"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- useCountUp: 0 → target with easeOutCubic ---------- */
function useCountUp(target: number, duration = 2000, delay = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let startTs = 0;

    const timer = window.setTimeout(() => {
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const t = Math.min(elapsed / duration, 1);
        setValue(Math.round(target * easeOutCubic(t)));
        if (t < 1) raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
}

/* ---------- TypewriterHeading ---------- */
type TypewriterProps = {
  text: string;
  splitAt: number; // first `splitAt` chars in dark color, rest in light
  speed?: number;
  delay?: number;
  onDone?: () => void;
};

function TypewriterHeading({
  text,
  splitAt,
  speed = 35,
  delay = 400,
  onDone,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const doneFired = useRef(false);

  useEffect(() => {
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    if (count >= text.length && !doneFired.current) {
      doneFired.current = true;
      onDone?.();
    }
  }, [count, text.length, onDone]);

  const dark = text.slice(0, Math.min(count, splitAt));
  const light =
    count > splitAt ? text.slice(splitAt, count) : "";

  return (
    <h1 className="mt-heading">
      <span>{dark}</span>
      <span className="mt-typed-light">{light}</span>
      {count < text.length && <span className="mt-cursor-blink" aria-hidden />}
    </h1>
  );
}

/* ---------- Right arrow chevron ---------- */
function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- David cursor SVG ---------- */
function CursorArrow() {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 2L20 12L12 14.5L9 22L2 2Z"
        fill="#A068FF"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Avatars data ---------- */
type AvatarSpec = {
  src: string;
  orbit: number; // orbit index for animation reference
  angleDeg: number;
  radius: number;
  size: number;
  radius20?: boolean;
  radius24?: boolean;
  glow: "purple" | "yellow" | "pink" | "blue" | "orange";
  delay: number; // seconds
};

const AVATARS: AvatarSpec[] = [
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png",
    orbit: 1,
    angleDeg: 270,
    radius: 177,
    size: 58,
    radius20: true,
    glow: "purple",
    delay: 0.6,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png",
    orbit: 2,
    angleDeg: 60,
    radius: 251,
    size: 58,
    glow: "yellow",
    delay: 0.85,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png",
    orbit: 2,
    angleDeg: 180,
    radius: 251,
    size: 78,
    glow: "pink",
    delay: 1.05,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png",
    orbit: 2,
    angleDeg: 300,
    radius: 251,
    size: 58,
    radius20: true,
    glow: "blue",
    delay: 1.25,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png",
    orbit: 3,
    angleDeg: 130,
    radius: 325,
    size: 88,
    glow: "pink",
    delay: 1.5,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png",
    orbit: 4,
    angleDeg: 30,
    radius: 399,
    size: 58,
    glow: "purple",
    delay: 1.75,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png",
    orbit: 4,
    angleDeg: 95,
    radius: 399,
    size: 88,
    radius24: true,
    glow: "orange",
    delay: 1.95,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png",
    orbit: 4,
    angleDeg: 220,
    radius: 399,
    size: 88,
    radius24: true,
    glow: "pink",
    delay: 2.15,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png",
    orbit: 4,
    angleDeg: 320,
    radius: 399,
    size: 58,
    glow: "purple",
    delay: 2.3,
  },
];

/* ---------- Logo ticker data ---------- */
const TICKER_LOGOS = [
  "https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg",
];

/* ---------- Main component ---------- */
export default function Marketeam() {
  const HEADING =
    "Unlock Top Marketing Talent You Thought Was Out of Reach — Now Just One Click Away!";
  const count = useCountUp(20, 2000, 1200);
  // Repeat logos 4x for a seamless-looking loop
  const tickerLoop = [...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS];

  return (
    <div className="app">
      {/* -------------------- Header -------------------- */}
      <header className="mt-header">
        <div className="mt-header-left">
          <a href="#" aria-label="Marketeam home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mt-logo"
              src="https://polo-pecan-73837341.figma.site/_assets/v11/17ae538989a509947a8de3892c644664895e69b1.png"
              alt="Marketeam"
            />
          </a>
          <nav className="mt-nav">
            <a className="mt-nav-link" href="#">Your Team</a>
            <a className="mt-nav-link" href="#">Solutions</a>
            <a className="mt-nav-link" href="#">Blog</a>
            <a className="mt-nav-link" href="#">Pricing</a>
          </nav>
        </div>

        <div className="mt-header-right">
          <a className="mt-login" href="#">Log In</a>
          <div className="btn-border-wrap">
            <a className="mt-btn" href="#">
              <span>Join Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* -------------------- Hero -------------------- */}
      <section className="mt-hero" id="main">
        {/* Left */}
        <div className="mt-hero-left">
          <TypewriterHeading
            text={HEADING}
            splitAt={67}
            speed={35}
            delay={400}
          />

          <div className="mt-start-wrap">
            <div className="btn-border-wrap">
              <a className="mt-btn mt-btn-start" href="#">
                <span>Start Project</span>
                <ArrowRight />
              </a>
            </div>
          </div>

          <div className="mt-david-wrap">
            <CursorArrow />
            <span className="mt-david-badge">David</span>
          </div>
        </div>

        {/* Right — orbits */}
        <div className="mt-hero-right" aria-hidden>
          <div className="mt-circles">
            <div className="mt-orbit mt-orbit-4">
              {AVATARS.filter((a) => a.orbit === 4).map((a, i) => (
                <AvatarOnOrbit key={`o4-${i}`} spec={a} />
              ))}
            </div>
            <div className="mt-orbit mt-orbit-3">
              {AVATARS.filter((a) => a.orbit === 3).map((a, i) => (
                <AvatarOnOrbit key={`o3-${i}`} spec={a} />
              ))}
            </div>
            <div className="mt-orbit mt-orbit-2">
              {AVATARS.filter((a) => a.orbit === 2).map((a, i) => (
                <AvatarOnOrbit key={`o2-${i}`} spec={a} />
              ))}
            </div>
            <div className="mt-orbit mt-orbit-1">
              {AVATARS.filter((a) => a.orbit === 1).map((a, i) => (
                <AvatarOnOrbit key={`o1-${i}`} spec={a} />
              ))}
              <div className="mt-center">
                <div className="mt-center-number">{count}k+</div>
                <div className="mt-center-label">Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- Logo Ticker -------------------- */}
      <div className="mt-ticker" aria-hidden>
        <div className="mt-ticker-track">
          {tickerLoop.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`t-${i}`}
              className="mt-ticker-logo"
              src={src}
              alt=""
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Avatar placed on an orbit ---------- */
function AvatarOnOrbit({ spec }: { spec: AvatarSpec }) {
  const {
    angleDeg,
    radius,
    size,
    radius20,
    radius24,
    glow,
    src,
    delay,
  } = spec;

  // Position the 0×0 slot on the orbit ring, then counter-rotate so
  // avatars stay upright as the orbit spins.
  const slotStyle: React.CSSProperties = {
    transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radius}px) rotate(-${angleDeg}deg)`,
  };

  const glowClass = `mt-avatar-glow-${glow}`;
  const borderRadius = radius24 ? 24 : radius20 ? 20 : "50%";

  const imgStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius,
    animationDelay: `${delay}s`,
  };

  return (
    <div className="mt-avatar-slot" style={slotStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`mt-avatar ${glowClass}`}
        style={imgStyle}
        loading="lazy"
      />
    </div>
  );
}
