/**
 * Shared eyebrow + title + subtitle block so every section shares one rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div
      className={`reveal max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
        />
        {eyebrow}
      </span>

      <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-[1.06]">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-gradient">{accent}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-[17px] leading-relaxed text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
