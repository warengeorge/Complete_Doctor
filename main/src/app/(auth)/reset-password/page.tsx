import Auth from "@/components/features/auth/Auth";
import ResetPasswordForm from "@/components/features/auth/forgot-password/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Auth>
      <ResetPasswordForm />
    </Auth>
  );
}
