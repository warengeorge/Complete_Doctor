"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "../schema";
import { useLoginMutation } from "../services/useLoginMutation";

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    clearErrors();

    const parsedValues = loginSchema.safeParse(values);

    if (!parsedValues.success) {
      for (const issue of parsedValues.error.issues) {
        const field = issue.path[0];

        if (field === "email" || field === "password") {
          setError(field, {
            message: issue.message,
          });
        }
      }

      return;
    }

    try {
      await loginMutation.mutateAsync(parsedValues.data);
      toast.success("Signed in successfully.");
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      setError("root", {
        message,
      });
      toast.error(message);
    }
  });

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-[#0C0C0C]">Welcome Back!</h1>
        <p className="text-sm text-[#847A8D]">
          Sign in to access the Complete Doctor admin dashboard.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-9 space-y-5">
        {errors.root?.message ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.root.message}
          </div>
        ) : null}

        <div className="space-y-2">
          <label
            htmlFor="admin-login-email"
            className="text-[15px] text-[#212529]"
          >
            Email address
          </label>
          <Input
            id="admin-login-email"
            type="email"
            placeholder="Enter your email address"
            className="h-12 rounded-[5px] border-[#DADADD] bg-[#FAFAFA] placeholder:text-xs placeholder:text-[#B5B5B5]"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="admin-login-password"
            className="text-[15px] text-[#212529]"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="admin-login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-12 rounded-[5px] border-[#DADADD] bg-[#FAFAFA] pr-10 placeholder:text-xs placeholder:text-[#B5B5B5]"
              autoComplete="current-password"
              disabled={isSubmitting}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8C8C8C]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
          <div className="text-right">
            <Link
              href="#"
              className="text-sm font-medium text-[#212529] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {errors.password?.message ? (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || loginMutation.isPending}
          className="h-12 w-full rounded-[5px] bg-[#007AFF] text-base font-medium text-white hover:bg-[#006DE0] disabled:bg-[#66AFFF]"
        >
          {isSubmitting || loginMutation.isPending
            ? "Signing in..."
            : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
