import Auth from "@/components/features/auth/Auth";
import ResetSuccessMessage from "@/components/features/auth/register/RegistrationSuccessMessage";

export default function ResetSuccessPage() {
  return (
    <Auth>
      <ResetSuccessMessage />
    </Auth>
  );
}
