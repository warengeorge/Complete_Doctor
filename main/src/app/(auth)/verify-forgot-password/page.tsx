import Auth from "@/components/features/auth/Auth";
import ResetVerificationForm from "@/components/features/auth/forgot-password/ResetVerificationForm";

export default function VerifyPage() {
  return (
    <Auth>
      <ResetVerificationForm />
    </Auth>
  );
}
