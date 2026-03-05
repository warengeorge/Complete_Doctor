import Auth from "@/components/features/auth/Auth";
import RegistrationForm from "@/components/features/auth/register/RegistrationForm";

export default function RegisterPage() {
  return (
    <Auth>
      <RegistrationForm />
    </Auth>
  );
}
