import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your free Aestora account in seconds.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Get 1 GB free — no credit card required"
      footer={
        <>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-brand-400 transition-colors hover:text-brand-300"
          >
            Sign in
          </a>
        </>
      }
    >
      <AuthForm
        submitLabel="Create account"
        fields={[
          {
            id: "name",
            label: "Name",
            type: "text",
            placeholder: "Your name",
            autoComplete: "name",
          },
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
            placeholder: "At least 8 characters",
            autoComplete: "new-password",
          },
        ]}
      />
    </AuthShell>
  );
}
