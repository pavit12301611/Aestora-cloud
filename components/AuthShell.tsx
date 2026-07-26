import Logo from "./Logo";
import Aurora from "./Aurora";
import ThemeToggle from "./ThemeToggle";
import Interactions from "./Interactions";
import Cursor from "./Cursor";
import SmartLink from "./SmartLink";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <>
      <Aurora />
      <Interactions />
      <Cursor />

      <div className="relative flex min-h-screen items-center justify-center px-5 py-14">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>

        <div
          className="w-full max-w-[430px] opacity-0 [animation:rise_.9s_var(--ease-out-expo)_forwards]"
        >
          <div className="flex justify-center">
            <SmartLink href="/" aria-label="Aestora home" className="rounded-xl">
              <Logo />
            </SmartLink>
          </div>

          <div className="tilt-scene mt-8">
            <div className="spotlight ring-gradient relative overflow-hidden rounded-4xl glass-strong sheen p-8 shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 50%, var(--glow-a), transparent 70%)",
                }}
              />

              <h1 className="relative text-center text-[26px] font-semibold tracking-tight">
                {title}
              </h1>
              <p className="relative mt-2 text-center text-[14.5px] text-muted">
                {subtitle}
              </p>

              <div className="relative mt-8">{children}</div>
            </div>
          </div>

          <p className="mt-6 text-center text-[14px] text-muted">{footer}</p>
        </div>
      </div>
    </>
  );
}
