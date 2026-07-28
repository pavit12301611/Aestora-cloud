import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";
import SmartLink from "@/components/SmartLink";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Aestora account.",
  // Without an explicit canonical every route inherited the root layout's
  // `canonical: "/"`, telling crawlers /login was a duplicate of the homepage.
  alternates: { canonical: "/login" },
  // A sign-in form is not a useful search result.
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Aestora account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <SmartLink
            href="/register"
            className="font-semibold text-link transition-colors"
          >
            Create one
          </SmartLink>
        </>
      }
    >
      <AuthForm
        submitLabel="Sign In"
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            autoComplete: "email",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            autoComplete: "current-password",
            hint: { label: "Forgot password?", href: "/reset-password" },
          },
        ]}
      />
    </AuthShell>
  );
}
