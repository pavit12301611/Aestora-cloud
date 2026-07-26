import Logo from "./Logo";
import Aurora from "./Aurora";
import ThemeToggle from "./ThemeToggle";

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
      <div className="relative flex min-h-screen items-center justify-center px-5 py-14">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[420px]">
          <div className="flex justify-center">
            <a href="/" aria-label="Aestora home">
              <Logo />
            </a>
          </div>

          <div className="ring-gradient mt-8 rounded-4xl glass-strong p-8 shadow-2xl">
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-center text-[14.5px] text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>
          </div>

          <p className="mt-6 text-center text-[14px] text-muted">{footer}</p>
        </div>
      </div>
    </>
  );
}
