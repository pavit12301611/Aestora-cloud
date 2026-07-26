import Aurora from "@/components/Aurora";
import Logo from "@/components/Logo";
import Interactions from "@/components/Interactions";
import Cursor from "@/components/Cursor";

export default function NotFound() {
  return (
    <>
      <Aurora />
      <Interactions />
      <Cursor />
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
            data-magnetic="0.2"
            className="shine magnetic rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white glow-ring transition-shadow duration-300 hover:shadow-[0_26px_60px_-18px_rgba(122,81,255,.9)]"
          >
            <span className="shine-layer" aria-hidden="true" />
            <span className="relative">Go home</span>
          </a>
          <a
            href="/storage"
            data-magnetic="0.14"
            className="magnetic rounded-2xl glass px-7 py-3.5 text-[15px] font-semibold transition-colors duration-300 hover:border-brand-400/40"
          >
            My Storage
          </a>
        </div>
      </div>
    </>
  );
}
