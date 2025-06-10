import Auth from '@/app/components/Auth';
import ForgotPasswordForm from '@/app/components/forgot-password/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <Auth>
      <ForgotPasswordForm />
    </Auth>
  );
}