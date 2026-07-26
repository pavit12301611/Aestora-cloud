import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Anchor that upgrades internal route navigation to Next's client-side router.
 *
 * The site previously used raw `<a href="/register">` everywhere, which forces
 * a full document reload (and re-download of the whole JS/CSS payload) for
 * what should be an instant, prefetched transition.
 *
 * In-page hashes (`#pricing`) and external/protocol URLs stay as plain
 * anchors, where the native behaviour is what we actually want.
 */
export default function SmartLink({
  href,
  ...props
}: ComponentPropsWithoutRef<"a"> & { href: string }) {
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return <NextLink href={href} {...props} />;
  }

  const isExternal = /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");

  return (
    <a
      href={href}
      // Never leak the opener to a cross-origin tab.
      {...(isExternal && props.target === "_blank"
        ? { rel: props.rel ?? "noopener noreferrer" }
        : {})}
      {...props}
    />
  );
}
