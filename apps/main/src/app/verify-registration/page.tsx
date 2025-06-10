import Auth from '@/app/components/Auth';
import RegisterVerificationForm from '@/app/components/register/RegistrationVerificationForm';

export default function VerifyPage() {
  return (
    <Auth>
      <RegisterVerificationForm />
    </Auth>
  );
}
