import Auth from '@/app/components/Auth';
import RegistrationForm from '@/app/components/register/RegistrationForm';

export default function RegisterPage() {
  return (
    <Auth>
      <RegistrationForm />
    </Auth>
  );
}
