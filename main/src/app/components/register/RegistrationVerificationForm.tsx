"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../../store/authStore";

export default function VerificationForm() {
  const router = useRouter();
  const {
    verifyEmail,
    registerComplete,
    registerStart,
    pendingRegistration,
    isLoading,
    error: authError,
    clearError,
  } = useAuthStore();
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(180); // 3 minutes
  const [isResending, setIsResending] = useState(false);

  // Redirect if no pending registration
  useEffect(() => {
    if (!pendingRegistration?.email) {
      router.push("/register");
    }
  }, [pendingRegistration, router]);

  const email = pendingRegistration?.email || "";

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtpValues(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    clearError();

    const otp = otpValues.join("");

    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    try {
      // Step 1: Verify the email address with the OTP
      await verifyEmail(otp);
      // Step 2: Complete registration (creates account with password, then logs in)
      await registerComplete(otp);
      router.push("/register-success");
    } catch (err: any) {
      console.warn("Verification failed", err);
      // authError should be set in store, but we can local fallback
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    clearError();
    try {
      await registerStart(email);
      setCountdown(180);
    } catch (err) {
      console.warn("Resend failed", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-[540px] flex flex-col gap-4 justify-center px-15">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#1C1C1C] dark:text-[#fafafa] capitalize">
          Verify your email address
        </h1>
        <p className="text-[#737373] leading-[24px]">
          Please enter the One-Time Password (OTP) sent to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {(error || authError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || authError}
          </div>
        )}

        <div className="space-y-4">
          <div
            className="flex justify-center gap-2"
            data-testid="otp-input-group"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                value={otpValues[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl p-0"
                maxLength={1}
                data-testid={`otp-input-${index}`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          <div>
            <div className="text-center text-sm text-[#737373] dark:text-[#fafafa]">
              OTP Code will expire in {formatCountdown()}
            </div>

            <div className="text-center">
              <span className="text-sm text-[#737373]">
                Didn&apos;t receive a code?{" "}
              </span>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending || isLoading}
                className="text-[#0D0A84] text-sm hover:underline disabled:text-gray-400 disabled:dark:text-gray-600 disabled:no-underline"
              >
                {isResending
                  ? "Sending..."
                  : countdown > 0
                    ? "Resend OTP"
                    : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
          data-testid="verify-button"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
