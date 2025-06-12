'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VerificationForm() {
  const router = useRouter();
  const { email, login } = useAuthStore();
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [isResending, setIsResending] = useState(false);

  // Format countdown as MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Initialize refs array
  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  // Simulate sending a verification code on component mount
  useEffect(() => {
    // In a real app, this would trigger an API call to send a verification code
    console.log('Verification code sent to', email);

    // Countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1); // Only take the first character

    setOtpValues(newOtpValues);

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        otpInputRefs.current[index - 1]?.focus();
      }
    }
    // Handle left arrow key
    else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    // Handle right arrow key
    else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpValues(digits);

      // Focus the last input
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otp = otpValues.join('');

    if (!otp || otp.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    // In a real app, you would validate the verification code against an API
    // For this example, we'll accept any 6-digit code
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }

    // Simulate successful verification
    login({
      id: 'user-123',
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${
        email.split('@')[0]
      }&background=random`,
    });

    // Redirect to dashboard
    router.push('/register-success');
  };

  const handleResendCode = () => {
    if (countdown > 0) return;

    setIsResending(true);

    // Simulate API call to resend code
    setTimeout(() => {
      setIsResending(false);
      setCountdown(180); // Reset to 3 minutes
      console.log('Verification code resent to', email);
    }, 1000);
  };

  return (
    <div className='w-[540px] flex flex-col gap-4 justify-center px-15'>
      <div className='text-center flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-[#1C1C1C] dark:text-[#fafafa] capitalize'>Verify your email address</h1>
        <p className='text-[#737373] leading-[24px]'>
          Please enter the One-Time Password (OTP) sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <div
            className='flex justify-center gap-2'
            data-testid='otp-input-group'
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                // ref={(el) => (otpInputRefs.current[index] = el)}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type='text'
                inputMode='numeric'
                value={otpValues[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className='w-12 h-12 text-center text-xl p-0'
                maxLength={1}
                data-testid={`otp-input-${index}`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          <div>
            <div className='text-center text-sm text-[#737373] dark:text-[#fafafa]'>
              OTP Code will expire in {formatCountdown()}
            </div>

            <div className='text-center'>
              <span className='text-sm text-[#737373]'>
                Didn&apos;t receive a code?{' '}
              </span>
              <button
                type='button'
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className='text-[#0D0A84] text-sm hover:underline disabled:text-gray-400 disabled:dark:text-gray-600 disabled:no-underline'
              >
                {isResending
                  ? 'Sending...'
                  : countdown > 0
                  ? 'Resend OTP'
                  : 'Resend OTP'}
              </button>
            </div>
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium'
          data-testid='verify-button'
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
