"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FileKind = "zip" | "video" | "doc" | "image";

const files: {
  name: string;
  size: string;
  tint: string;
  kind: FileKind;
  id: string;
}[] = [
  { id: "1", name: "brand-kit-final.zip", size: "84.2 MB", tint: "from-brand-400 to-brand-600", kind: "zip" },
  { id: "2", name: "launch-teaser.mp4", size: "62.8 MB", tint: "from-accent-400 to-accent-600", kind: "video" },
  { id: "3", name: "portfolio-2026.pdf", size: "12.4 MB", tint: "from-plasma-400 to-brand-500", kind: "doc" },
  { id: "4", name: "cover-art@2x.png", size: "8.6 MB", tint: "from-brand-300 to-plasma-500", kind: "image" },
];

const icons: Record<FileKind, React.ReactNode> = {
  zip: <path d="M10 3v2M14 5v2M10 7v2M14 9v2M10 11v2M12 13h.01M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />,
  video: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9.5 5 2.5-5 2.5z" /></>,
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m5 18 5-4.5 3.5 3L17 13l2 2" /></>,
};

type DemoFile = (typeof files)[number];

const shareUrlFor = (file: DemoFile) => `https://aestora.cc/s/${file.id}a9f4`;

export default function StoragePanel() {
  const [progress, setProgress] = useState(0);
  const [activeShare, setActiveShare] = useState<DemoFile | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  // A pending "Copied!" reset must not fire into an unmounted tree.
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  useEffect(() => {
    const canAnimate =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) {
      setProgress(72);
      return;
    }

    let id: ReturnType<typeof setInterval> | undefined;

    const tick = () =>
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

    const onVisibility = () => (document.hidden ? pause() : run());

    run();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleShareClick = (file: DemoFile, e: React.MouseEvent) => {
    e.stopPropagation();
    lastTrigger.current = e.currentTarget as HTMLElement;
    setActiveShare(file);
    setCopyState("idle");
  };

  const closeShare = useCallback(() => {
    setActiveShare(null);
    setCopyState("idle");
    // Focus was inside the overlay; returning it to the trigger keeps
    // keyboard users from being dumped back at the top of the document.
    lastTrigger.current?.focus();
  }, []);

  const handleCopyLink = useCallback(async () => {
    if (!activeShare) return;
    const url = shareUrlFor(activeShare);

    if (copyTimer.current) clearTimeout(copyTimer.current);

    try {
      // `navigator.clipboard` is undefined on insecure origins, so calling it
      // unguarded threw a TypeError that the old `.catch()` never saw.
      if (!navigator.clipboard?.writeText) throw new Error("unsupported");
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      // The old handler reported "Copied!" even when the write failed, so the
      // user pasted stale clipboard contents believing it had worked.
      setCopyState("failed");
    }

    copyTimer.current = setTimeout(() => setCopyState("idle"), 2000);
  }, [activeShare]);

  /* Escape closes the share overlay, and focus lands on its close button when
     it opens — it is a modal-ish layer, so it needs both. */
  useEffect(() => {
    if (!activeShare) return;
    closeButton.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeShare();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeShare, closeShare]);

  // Clamped once instead of re-derived at three call sites that each used a
  // slightly different expression.
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    /*
      This panel used to be `aria-hidden="true"` while still containing real
      <button> elements. That is an ARIA violation and a keyboard trap: the
      buttons stayed in the tab order but were removed from the accessibility
      tree, so a screen-reader user would tab to a control that announced
      nothing at all.

      It is a product mock, so the honest fix is to describe it as one image-
      like region and keep the decorative chrome hidden, while leaving the
      genuinely interactive share controls exposed.
    */
    <div
      className="tilt relative md:animate-float"
      data-tilt="8"
      role="group"
      aria-label="Product preview: the Aestora storage dashboard"
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

      <div className="ring-gradient relative overflow-hidden rounded-4xl glass-strong sheen shadow-2xl">
        {/* Window chrome — pure decoration. */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2 border-b border-[rgb(var(--hairline))] px-5 py-3.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 rounded-lg bg-[rgb(var(--hairline))] px-3 py-1 text-center text-[11px] font-medium text-faint">
            cloud.aestora.cc / storage
          </div>
        </div>

        <div className="p-5">
          {/* High-Fidelity Storage Metrics Header */}
          <div className="mb-4 grid grid-cols-3 gap-2 rounded-2xl bg-[rgb(var(--surface))] p-3 text-[10px] border border-[rgb(var(--hairline))]">
            <div>
              <div className="font-medium text-faint uppercase tracking-[1px]">Storage</div>
              <div className="mt-0.5 text-[13px] font-semibold tabular">248 MB <span className="font-normal text-[10px] text-faint">of 1 GB</span></div>
              <div className="mt-1 h-[3px] rounded bg-[rgb(var(--hairline))] overflow-hidden">
                <div className="h-[3px] w-[24.8%] bg-gradient-to-r from-brand-400 to-accent-400 rounded" />
              </div>
            </div>
            <div>
              <div className="font-medium text-faint uppercase tracking-[1px]">Uploads</div>
              <div className="mt-0.5 text-[13px] font-semibold tabular">27 <span className="font-normal text-[10px] text-faint">active</span></div>
            </div>
            <div>
              <div className="font-medium text-faint uppercase tracking-[1px]">Retention</div>
              <div className="mt-0.5 text-[13px] font-semibold tabular">30 days <span className="font-normal text-[10px] text-faint">auto-managed</span></div>
            </div>
          </div>

          {/* Dropzone */}
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-brand-400/35 bg-brand-500/[0.06] p-6 text-center transition-all duration-300 hover:border-brand-400/60 hover:bg-brand-500/[0.09]">
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
          <div
            className="mt-4 rounded-2xl surface p-4"
            role="progressbar"
            aria-label="Uploading session-master.wav"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(clampedProgress)}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">session-master.wav</span>
              <span className="font-mono text-faint">
                {Math.round(clampedProgress)}%
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400 shadow-[0_0_12px] shadow-brand-500/60 transition-[width] duration-150 ease-linear"
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
          </div>

          {/* File list */}
          <ul className="mt-4 space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-[rgb(var(--hairline-strong))]"
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
                  <span className="block truncate text-[13px] font-medium transition-colors duration-300 group-hover:text-brand-300">
                    {file.name}
                  </span>
                  <span className="block text-[11px] text-faint">{file.size}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => handleShareClick(file, e)}
                  aria-label={`Share ${file.name}`}
                  aria-haspopup="dialog"
                  aria-expanded={activeShare?.id === file.id}
                  // `opacity-0` with only `group-hover`/`focus` to reveal it
                  // hid the control from touch users entirely — there is no
                  // hover on a phone. It is now always visible below `md`.
                  className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-link glass transition-all duration-300 hover:bg-brand-500/15 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                >
                  Share
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Micro sharing overlay */}
        {activeShare && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label={`Share link for ${activeShare.name}`}
            className="absolute inset-0 z-20 flex flex-col justify-end bg-black/60 p-5 backdrop-blur-md transition-all duration-300 animate-rise"
          >
            <div className="rounded-3xl glass-strong sheen p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[rgb(var(--hairline))] pb-3 mb-4">
                <span className="text-[13px] font-semibold text-brand-300">Generated Share Link</span>
                <button
                  ref={closeButton}
                  type="button"
                  onClick={closeShare}
                  aria-label="Close share link"
                  className="cursor-pointer rounded-lg p-1 text-faint transition-colors hover:bg-[rgb(var(--hairline-strong))] hover:text-[var(--text)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-[11px] text-faint truncate mb-1">File: {activeShare.name}</p>
              <div className="flex items-center gap-2 rounded-xl bg-black/40 p-2.5 border border-[rgb(var(--hairline))]">
                <span className="text-xs text-muted truncate flex-1 select-all font-mono">
                  {shareUrlFor(activeShare)}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn-primary cursor-pointer rounded-lg px-3 py-1 text-[11px] font-semibold transition-all duration-300"
                >
                  {copyState === "copied"
                    ? "Copied!"
                    : copyState === "failed"
                      ? "Copy failed"
                      : "Copy"}
                </button>
              </div>

              {/* Announced on change so the copy result isn't silent. */}
              <p role="status" className="mt-3 text-center text-[10px] text-faint">
                {copyState === "copied"
                  ? "Link copied to clipboard."
                  : copyState === "failed"
                    ? "Couldn't copy automatically — select the link and copy it."
                    : "Anyone with this link can preview and download the file."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl glass-strong px-4 py-3 shadow-xl sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-500/15">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-ink-accent"
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
