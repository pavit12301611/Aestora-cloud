import type { Metadata } from "next";
import Aurora from "@/components/Aurora";
import Logo from "@/components/Logo";
import Interactions from "@/components/Interactions";
import Cursor from "@/components/Cursor";
import SmartLink from "@/components/SmartLink";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed, and the page previously had no metadata at
  // all, so it inherited the homepage title and description.
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Aurora />
      <Interactions />
      <Cursor />
      <main className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <SmartLink href="/" aria-label="Aestora home" className="rounded-xl">
          <Logo />
        </SmartLink>

        {/* Decorative numeral — the real page title is the <h1> below, so the
            "404" must not be read out as part of the heading. */}
        <p
          aria-hidden="true"
          className="mt-12 text-[clamp(5rem,18vw,10rem)] font-semibold leading-none tracking-tighter text-gradient"
        >
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm text-[15px] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <span className="btn-border-wrap">
            <SmartLink
              href="/"
              data-magnetic="0.2"
              className="pill-btn magnetic bg-[#060218] px-7 py-3.5 text-[15px] font-semibold text-white"
            >
              <span className="relative">Go home</span>
            </SmartLink>
          </span>
          <SmartLink
            href="/storage"
            data-magnetic="0.14"
            className="pill-btn pill-btn-rtl magnetic glass px-7 py-3.5 text-[15px] font-semibold transition-colors duration-300 hover:border-brand-400/40 hover:text-white"
          >
            <span className="relative">My Storage</span>
          </SmartLink>
        </div>
      </main>
    </>
  );
}
