import Logo from "./Logo";
import SmartLink from "./SmartLink";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "My Storage", href: "/storage" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Reset password", href: "/reset-password" },
      { label: "Upgrade to Pro", href: "/membership/patreon" },
    ],
  },
  {
    title: "Plans",
    links: [
      { label: "Free", href: "#pricing" },
      { label: "Cloud Pro", href: "#pricing" },
      { label: "Cloud Exclusive", href: "#pricing" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[rgb(var(--hairline))]">
      {/* Horizon glow along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[70%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-a), transparent 70%)",
          opacity: 0.5,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              Fast, private, and ridiculously easy cloud storage.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[12px] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold uppercase tracking-wider text-faint">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      className="group/link inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-[var(--text)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-gradient-to-r from-brand-400 to-accent-400 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/link:w-3.5"
                      />
                      <span className="transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/link:translate-x-0.5">
                        {link.label}
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgb(var(--hairline))] pt-7 sm:flex-row">
          <p className="text-[13px] text-faint">
            © {new Date().getFullYear()} Aestora. All rights reserved.
          </p>
          <p className="text-[13px] text-faint">
            Built for people who just want their files to work.
          </p>
        </div>
      </div>
    </footer>
  );
}
