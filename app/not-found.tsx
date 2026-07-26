import Aurora from "@/components/Aurora";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <>
      <Aurora />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <a href="/" aria-label="Aestora home">
          <Logo />
        </a>

        <p className="mt-12 text-[clamp(5rem,18vw,10rem)] font-semibold leading-none tracking-tighter text-gradient">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm text-[15px] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5"
          >
            Go home
          </a>
          <a
            href="/storage"
            className="rounded-2xl glass px-7 py-3.5 text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:border-brand-400/40"
          >
            My Storage
          </a>
        </div>
      </div>
    </>
  );
}
