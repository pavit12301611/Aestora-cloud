import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Aestora account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Aestora account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-brand-400 transition-colors hover:text-brand-300"
          >
            Create one
          </a>
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
