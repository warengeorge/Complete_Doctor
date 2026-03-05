import Auth from "@/components/features/auth/Auth";
import ForgotPasswordForm from "@/components/features/auth/forgot-password/ForgotPasswordForm";


export default function ForgotPasswordPage() {
  return (
    <Auth>
      <ForgotPasswordForm />
    </Auth>
  );
}
