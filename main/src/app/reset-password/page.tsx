import Auth from '@/app/components/Auth';
import ResetPasswordForm from '@/app/components/forgot-password/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Auth>
      <ResetPasswordForm />
    </Auth>
  );
}
