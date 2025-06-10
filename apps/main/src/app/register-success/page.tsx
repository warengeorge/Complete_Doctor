import Auth from '@/app/components/Auth';
import RegisterSuccessMessage from '@/app/components/register/RegistrationSuccessMessage';

export default function ResetSuccessPage() {
  return (
    <Auth>
      <RegisterSuccessMessage />
    </Auth>
  );
}
