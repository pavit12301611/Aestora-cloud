"use client";

import { useId, useState } from "react";

export type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  hint?: { label: string; href: string };
  /** Forwarded to the input so the browser can validate before submit. */
  minLength?: number;
  inputMode?: "text" | "email" | "numeric";
};

export default function AuthForm({
  fields,
  submitLabel,
  onSubmit,
}: {
  fields: Field[];
  submitLabel: string;
  /**
   * Wire this to the real auth endpoint. Left optional so the screens can be
   * previewed standalone, but the default is now an explicit, visible
   * "not connected yet" state instead of a submit button that silently does
   * nothing — which reads to a user as a broken login.
   */
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
}) {
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  // Namespaced so two AuthForms on one page can't collide on `id="email"`,
  // which would break every <label for> pairing.
  const uid = useId();
  const fieldId = (id: string) => `${uid}-${id}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      fields.map((f) => [f.id, String(data.get(f.id) ?? "")])
    );

    if (!onSubmit) {
      setNotice(
        "This is a preview build — authentication isn't connected yet."
      );
      return;
    }

    setNotice(null);
    setPending(true);
    try {
      await onSubmit(values);
    } catch {
      setNotice("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate={false}>
      {fields.map((field) => {
        const isPassword = field.type === "password";
        const revealed = Boolean(show[field.id]);
        const inputId = fieldId(field.id);
        return (
          <div key={field.id}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label
                htmlFor={inputId}
                className="text-[13px] font-medium text-muted"
              >
                {field.label}
              </label>
              {field.hint && (
                <a
                  href={field.hint.href}
                  className="text-[12.5px] font-medium text-brand-400 transition-colors hover:text-brand-300"
                >
                  {field.hint.label}
                </a>
              )}
            </div>

            <div className="relative">
              <input
                id={inputId}
                name={field.id}
                type={isPassword && revealed ? "text" : field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                minLength={field.minLength}
                inputMode={field.inputMode}
                // Browsers helpfully "correct" and capitalise the first letter
                // of an email on mobile, which breaks sign-in.
                autoCapitalize={field.type === "email" ? "none" : undefined}
                autoCorrect={field.type === "email" ? "off" : undefined}
                spellCheck={field.type === "email" ? false : undefined}
                required
                disabled={pending}
                // Right padding clears the reveal button so a long value can't
                // slide underneath it.
                className={`w-full rounded-2xl surface py-3 pl-4 text-[14.5px] outline-none transition-all duration-300 placeholder:text-faint hover:border-[rgb(var(--hairline-strong))] focus:border-brand-400/60 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60 ${
                  isPassword ? "pr-12" : "pr-4"
                }`}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() =>
                    setShow((s) => ({ ...s, [field.id]: !s[field.id] }))
                  }
                  aria-label={revealed ? "Hide password" : "Show password"}
                  aria-pressed={revealed}
                  aria-controls={inputId}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-faint transition-colors hover:text-[var(--text)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {revealed ? (
                      <>
                        <path d="M2 2l20 20M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M6.7 6.7C4.4 8.2 2.7 10.3 2 12c1.7 3.9 5.6 6.5 10 6.5 1.7 0 3.3-.4 4.7-1.1M9.9 5.7A10 10 0 0 1 12 5.5c4.4 0 8.3 2.6 10 6.5-.7 1.6-1.9 3.1-3.4 4.3" />
                      </>
                    ) : (
                      <>
                        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
                        <circle cx="12" cy="12" r="2.6" />
                      </>
                    )}
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}

      {notice && (
        // `role="status"` so the message is announced when it appears.
        <p
          role="status"
          className="rounded-2xl border border-brand-400/30 bg-brand-500/10 px-4 py-3 text-[13.5px] text-muted"
        >
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="shine group relative mt-2 w-full rounded-2xl bg-gradient-to-r from-brand-500 via-brand-500 to-brand-600 px-6 py-3.5 text-[15px] font-semibold text-white glow-ring transition-shadow duration-300 hover:shadow-[0_24px_55px_-18px_var(--brand-glow)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="shine-layer" aria-hidden="true" />
        <span className="relative">{pending ? "Please wait…" : submitLabel}</span>
      </button>

      <div className="flex items-center gap-4 py-2">
        <span aria-hidden="true" className="h-px flex-1 bg-[rgb(var(--hairline))]" />
        <span className="text-[11px] font-medium uppercase tracking-widest text-faint">
          or
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-[rgb(var(--hairline))]" />
      </div>

      <button
        type="button"
        onClick={() =>
          setNotice("Google sign-in isn't connected in this preview build.")
        }
        className="flex w-full items-center justify-center gap-3 rounded-2xl glass px-6 py-3.5 text-[14.5px] font-semibold transition-colors duration-300 hover:border-brand-400/40"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.3a7.1 7.1 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"
          />
          <path
            fill="#EA4335"
            d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  );
}
