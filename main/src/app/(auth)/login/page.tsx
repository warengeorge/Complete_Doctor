import Auth from "@/components/features/auth/Auth";
import LoginForm from "@/components/features/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <Auth>
      <LoginForm />
    </Auth>
  );
}
