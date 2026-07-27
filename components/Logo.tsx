export default function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`group/logo inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 shadow-lg shadow-brand-500/40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-105">
        {/* Sweeping highlight on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover/logo:translate-x-full"
        />
        <svg
          viewBox="0 0 24 24"
          className="relative h-[19px] w-[19px] text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98 6.5 6.5 0 0 0-12.6-1.6A4.25 4.25 0 0 0 6 19z" />
          <path d="M12 15.5v-5M9.75 12.5 12 10.25l2.25 2.25" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[18px] font-semibold tracking-tight">Aestora</span>
      )}
    </span>
  );
}
