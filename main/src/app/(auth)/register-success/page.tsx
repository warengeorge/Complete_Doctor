import Auth from "@/components/features/auth/Auth";
import RegisterSuccessMessage from "@/components/features/auth/register/RegistrationSuccessMessage";

export default function ResetSuccessPage() {
  return (
    <Auth>
      <RegisterSuccessMessage />
    </Auth>
  );
}
