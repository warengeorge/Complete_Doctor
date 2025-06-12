import Auth from '@/app/components/Auth';
import ResetVerificationForm from '@/app/components/forgot-password/ResetVerificationForm';

export default function VerifyPage() {
  return (
    <Auth>
      <ResetVerificationForm />
    </Auth>
  );
}