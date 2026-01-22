import Auth from "@/components/features/auth/Auth";
import RegisterVerificationForm from "@/components/features/auth/register/RegistrationVerificationForm";

export default function VerifyPage() {
  return (
    <Auth>
      <RegisterVerificationForm />
    </Auth>
  );
}
