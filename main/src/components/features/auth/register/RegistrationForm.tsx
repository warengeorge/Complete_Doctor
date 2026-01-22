"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/store/user/user.store";

export default function RegistrationForm() {
  const router = useRouter();
  const { registerUser } = useUserStore();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    terms?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
      terms?: string;
    } = {};

    if (!firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms of service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      registerUser({ firstname, lastname, email, password });
      router.push("/verify-registration");
    }
  };

  return (
    <div className="w-[540px] max-w-md h-auto flex flex-col gap-10 justify-center px-5">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl text-[#1C1C1C] font-bold dark:text-[#fafafa]">
          Create Your Account
        </h1>
        <h2 className="text-[#847A8D]">
          Access top medical courses, practice exams, and expert guidance.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col justify-between gap-2">
              <Label
                htmlFor="firstname"
                className="text-sm text-[#737373] dark:text-[#fafafa]"
              >
                First name
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={
                  errors.firstname
                    ? "h-[50px] border-red-500"
                    : "h-[50px] placeholder:text-[#B5B5B5] placeholder:text-xs pr-10 bg-[rgba(250,250,250,0.8)] rounded-[5px]"
                }
                data-testid="firstname-input"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-4">{errors.firstname}</p>
              )}
            </div>
            <div className="flex flex-col justify-between gap-2">
              <Label
                htmlFor="lastname"
                className="text-sm text-[#737373] dark:text-[#fafafa]"
              >
                Last name
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={
                  errors.lastname
                    ? "h-[50px] border-red-500"
                    : "h-[50px] placeholder:text-[#B5B5B5] placeholder:text-xs pr-10 bg-[rgba(250,250,250,0.8)] rounded-[5px]"
                }
                data-testid="lastname-input"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-4">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div className="h-18 flex flex-col justify-between gap-2">
            <Label
              htmlFor="email"
              className="text-sm text-[#737373] dark:text-[#fafafa]"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                errors.email
                  ? "h-[50px] border-red-500"
                  : "h-[50px] placeholder:text-[#B5B5B5] placeholder:text-xs pr-10 bg-[rgba(250,250,250,0.8)] rounded-[5px]"
              }
              data-testid="email-input"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-4">{errors.email}</p>
            )}
          </div>
          <div className="h-18 flex flex-col justify-between gap-2">
            <Label
              htmlFor="password"
              className="text-sm text-[#737373] dark:text-[#fafafa]"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password
                    ? "h-[50px] border-red-500 pr-10"
                    : "h-[50px] placeholder:text-[#B5B5B5] placeholder:text-xs pr-10 bg-[rgba(250,250,250,0.8)] rounded-[5px]"
                }
                data-testid="password-input"
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-4">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked === true)}
              data-testid="terms-checkbox"
            />
            <Label
              htmlFor="terms"
              className="ml-3 text-sm text-gray-700 dark:text-[#fafafa]"
            >
              I accept the{" "}
              <Link
                href="/terms"
                className="text-[#0D0A84] dark:text-blue-800 hover:underline"
              >
                Terms of Service
              </Link>
            </Label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
          data-testid="register-button"
        >
          Get Started
        </Button>
      </form>
      <div className="text-gray-600 text-center w-full">
        <span className="text-sm text-[#212529]">Have an Account? </span>
        <Link
          href="/login"
          className="text-[#0D0A84] dark:text-blue-800 text-base hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
