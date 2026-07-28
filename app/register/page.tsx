import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";
import SmartLink from "@/components/SmartLink";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your free Aestora account in seconds.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Get 1 GB free — no credit card required"
      footer={
        <>
          Already have an account?{" "}
          <SmartLink
            href="/login"
            className="font-semibold text-link transition-colors"
          >
            Sign in
          </SmartLink>
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
            // The placeholder promised a minimum that was never enforced.
            minLength: 8,
          },
        ]}
      />
    </AuthShell>
  );
}
