import Auth from '@/app/components/Auth';
import ResetSuccessMessage from '@/app/components/forgot-password/ResetSuccessMessage';
export default function ResetSuccessPage() {
  return (
    <Auth>
      <ResetSuccessMessage />
    </Auth>
  );
}
