"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/store/user/user.store";
// import { AppleIcon, GoogleIcon } from '../icons/icons';

export default function LoginForm() {
  const router = useRouter();
  const { loginUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email, "Password:", password); // Debugging

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const success = loginUser(email, password);

    if (success) {
      console.log("Login successful"); // Debugging
      router.push("/");
    } else {
      console.log("Login failed"); // Debugging
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger OAuth
    // loginUser("google-user@example.com", "")
    router.push("/");
  };

  return (
    <div className="relative w-full h-[80%] max-w-md flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-[372px] h-15 flex flex-col items-center justify-between">
          <h1 className="text-[#0C0C0C] text-2xl font-semibold">
            Welcome Back!
          </h1>
          <h2 className="text-[#847A8D]">
            Your journey to medical exam success continues.
          </h2>
        </div>
        {/* <div className='mt-15 h-[50px] flex items-center gap-4'>
          <Button
            type='button'
            variant='outline'
            className='text-[#151515] text-xs font-medium h-full flex-1'
            onClick={handleGoogleSignIn}
            data-testid='google-login-button'
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button
            type='button'
            variant='outline'
            className='text-[#151515] text-xs font-medium h-full flex-1'
            onClick={handleGoogleSignIn}
            data-testid='google-login-button'
          >
            <AppleIcon />
            Continue with Apple
          </Button>
        </div> */}

        {/* <div className='relative flex items-center py-10 px-15'>
         
          <div className='flex-grow border-t border-[#B5B5B5]'></div>
          
          <span className='flex-shrink px-4 text-[13px] text-[#B5B5B5]'>
            or
          </span>
          
          <div className='flex-grow border-t border-[#B5B5B5]'></div>
        </div> */}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[15px] text-[#212529] font-medium"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                className="h-[50px] placeholder:text-xs placeholder:text-[#B5B5B5] rounded-[5px] bg-[rgba(250,250,250,0.8)]"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="login-email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-[15px] text-[#212529] font-medium"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-[50px] placeholder:text-xs placeholder:text-[#B5B5B5] rounded-[5px] bg-[rgba(250,250,250,0.8)]"
                  data-testid="login-password"
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
              <Link
                href="/forgot-password"
                className="text-sm text-[#212529] font-medium hover:underline self-end"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
            data-testid="login-button"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-10 text-gray-600 text-center w-full">
          <span className="text-sm text-[#212529]">
            Don&apos;t yet have an account?{" "}
          </span>
          <Link
            href="/register"
            className="text-[#0C0C0C] text-[15px] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
