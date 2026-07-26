"use client";

import { useEffect, useState } from "react";

type FileKind = "zip" | "video" | "doc" | "image";

const files: {
  name: string;
  size: string;
  tint: string;
  kind: FileKind;
}[] = [
  { name: "brand-kit-final.zip", size: "84.2 MB", tint: "from-brand-400 to-brand-600", kind: "zip" },
  { name: "launch-teaser.mp4", size: "62.8 MB", tint: "from-accent-400 to-accent-600", kind: "video" },
  // Was `from-fuchsia-400` — an off-palette magenta left over from the old
  // violet theme. Swapped to the plasma ramp that the design system defines.
  { name: "portfolio-2026.pdf", size: "12.4 MB", tint: "from-plasma-400 to-brand-500", kind: "doc" },
  { name: "cover-art@2x.png", size: "8.6 MB", tint: "from-brand-300 to-plasma-500", kind: "image" },
];

// Keyed by the union, so adding a kind without an icon is a compile error
// instead of a silently empty <svg> at runtime.
const icons: Record<FileKind, React.ReactNode> = {
  zip: <path d="M10 3v2M14 5v2M10 7v2M14 9v2M10 11v2M12 13h.01M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />,
  video: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9.5 5 2.5-5 2.5z" /></>,
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m5 18 5-4.5 3.5 3L17 13l2 2" /></>,
};

export default function StoragePanel() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(72);
      return;
    }

    let id: ReturnType<typeof setInterval> | undefined;

    const tick = () =>
      // Clamp at 100 before wrapping so the readout can't render "101%".
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 1.4)));

    const run = () => {
      if (id === undefined) id = setInterval(tick, 45);
    };
    const pause = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };

    // A decorative 22 Hz timer has no business running in a hidden tab.
    const onVisibility = () => (document.hidden ? pause() : run());

    run();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    // A decorative product mock full of invented filenames and a fake upload
    // percentage. Announcing it would tell a screen-reader user they have 27
    // files and an upload in flight, none of which is true.
    <div
      className="tilt relative animate-float"
      data-tilt="8"
      aria-hidden="true"
    >
      {/* Glow bed */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 60% 30%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="ring-gradient overflow-hidden rounded-4xl glass-strong sheen shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-[rgb(var(--hairline))] px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 rounded-lg bg-[rgb(var(--hairline))] px-3 py-1 text-center text-[11px] font-medium text-faint">
            cloud.aestora.cc / storage
          </div>
        </div>

        <div className="p-5">
          {/* Dropzone */}
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-brand-400/35 bg-brand-500/[0.06] p-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-600/30">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5M4 17v1.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V17" />
              </svg>
            </div>
            <p className="mt-3 text-sm font-semibold">Drop files to upload</p>
            <p className="mt-1 text-xs text-faint">or click to browse — up to 200 MB</p>
          </div>

          {/* Active upload */}
          <div className="mt-4 rounded-2xl surface p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">session-master.wav</span>
              <span className="font-mono text-faint">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400 shadow-[0_0_12px] shadow-brand-500/60 transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>

          {/* File list */}
          <ul className="mt-4 space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[rgb(var(--hairline))]"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${file.tint}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[17px] w-[17px] text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icons[file.kind]}
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">
                    {file.name}
                  </span>
                  <span className="block text-[11px] text-faint">{file.size}</span>
                </span>
                <span className="rounded-lg px-2 py-1 text-[11px] font-medium text-faint opacity-0 transition-opacity group-hover:opacity-100">
                  Share
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl glass-strong px-4 py-3 shadow-xl sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-500/15">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-accent-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m20 6-11 11-5-5" />
          </svg>
        </span>
        <span className="text-[12px] leading-tight">
          <span className="block font-semibold">Synced</span>
          <span className="block text-faint">a moment ago</span>
        </span>
      </div>
    </div>
  );
}
