import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SmartLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

/** Merge caller-supplied `rel` tokens with the ones we require, no duplicates. */
function withRelTokens(rel: string | undefined, ...required: string[]) {
  const tokens = new Set(
    [...(rel?.split(/\s+/) ?? []), ...required].filter(Boolean)
  );
  return Array.from(tokens).join(" ");
}

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
export default function SmartLink({ href, ...props }: SmartLinkProps) {
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    // An internal route can still be opened in a new tab, and it still needs
    // `noopener` — the old code only considered protocol-qualified URLs.
    const rel =
      props.target === "_blank"
        ? withRelTokens(props.rel, "noopener", "noreferrer")
        : props.rel;

    return <NextLink href={href} {...props} rel={rel} />;
  }

  const isExternal = /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");

  /*
    Two bugs lived here:

    1. The security `rel` was spread *before* `{...props}`, so it was the first
       thing the caller's own props overwrote. A link written as
       `<SmartLink target="_blank" rel="nofollow">` ended up with just
       `rel="nofollow"` — the `noopener` was silently dropped and the
       cross-origin tab got a live `window.opener` handle back to this page.

    2. `noopener` was only applied when `target === "_blank"` was passed
       explicitly, so an external link opened by any other means was unguarded.

    Now the tokens are merged rather than replaced, and `rel` is applied after
    the spread so it cannot be clobbered.
  */
  const rel =
    isExternal && props.target === "_blank"
      ? withRelTokens(props.rel, "noopener", "noreferrer")
      : props.rel;

  return <a {...props} href={href} rel={rel} />;
}
