"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { PasswordCheck } from "../icons/icons";

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    resetEmail,
    resetPassword,
    isLoading,
    error: authError,
    clearError,
  } = useAuthStore();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Password strength criteria
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isLongEnough = newPassword.length >= 8;

  useEffect(() => {
    // Redirect to forgot password if no email is set
    if (!resetEmail) {
      router.push("/forgot-password");
    }
  }, [resetEmail, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    clearError();

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (
      !isLongEnough ||
      !hasLowercase ||
      !hasUppercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setError("Your password doesn't meet the requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(newPassword);
      router.push("/reset-success");
    } catch (err) {
      console.warn("Reset failed", err);
    }
  };

  return (
    <div className="w-[540px] flex flex-col gap-10 items-center justify-center px-15">
      <div className="w-full text-center flex items-center flex-col gap-2">
        <span className="w-10 h-9 flex items-center justify-center rounded-[5px] border border-[#D9D9D9] mb-8">
          <PasswordCheck />
        </span>
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="mt-2 text-gray-600">Please enter your new password.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {(error || authError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || authError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="h-18 flex flex-col justify-between">
              <Label
                htmlFor="new-password"
                className="text-sm text-[#737373] dark:text-[#fafafa]"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  className="h-[50px] placeholder:text-[#D1D5DB] rounded-[5px] bg-[rgba(250,250,250,0.8)] pr-10"
                  onChange={(e) => setNewPassword(e.target.value)}
                  data-testid="reset-new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div
                className={`flex items-center ${
                  hasLowercase ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasLowercase ? (
                  <Check size={12} className="mr-1" />
                ) : (
                  <X size={12} className="mr-1" />
                )}
                Lowercase letter
              </div>
              <div
                className={`flex items-center ${
                  hasUppercase ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasUppercase ? (
                  <Check size={12} className="mr-1" />
                ) : (
                  <X size={12} className="mr-1" />
                )}
                Uppercase letter
              </div>
              <div
                className={`flex items-center ${
                  hasNumber ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasNumber ? (
                  <Check size={12} className="mr-1" />
                ) : (
                  <X size={12} className="mr-1" />
                )}
                Number
              </div>
              <div
                className={`flex items-center ${
                  hasSpecialChar ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasSpecialChar ? (
                  <Check size={12} className="mr-1" />
                ) : (
                  <X size={12} className="mr-1" />
                )}
                Special character
              </div>
            </div>
          </div>

          <div className="h-18 flex flex-col justify-between">
            <Label
              htmlFor="confirm-password"
              className="text-sm text-[#737373] dark:text-[#fafafa]"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                className="h-[50px] placeholder:text-[#D1D5DB] rounded-[5px] bg-[rgba(250,250,250,0.8)] pr-10"
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-testid="reset-confirm-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
          disabled={isLoading}
          data-testid="reset-password-submit"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/login" className="text-blue-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
