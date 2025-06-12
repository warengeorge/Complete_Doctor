"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "../../../../store/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key } from '../icons/icons'

export default function ForgotPasswordForm() {
  const router = useRouter()
  const { setResetEmail } = useAuthStore()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // when backend ready, this would call an API to send a reset email
      // simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the email in the auth store for the next step
      setResetEmail(email)

      // navigate to reset password page
      router.push("/verify-forgot-password")
    // } catch (err) {
    //   setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[540px] max-w-md h-[650px] flex flex-col gap-10 justify-center px-5">
      <div className="text-center flex items-center flex-col gap-2">
        <span className="w-10 h-9 flex items-center justify-center rounded-[5px] border border-[#D9D9D9] mb-8">
          <Key />
        </span>
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-[#737373] leading-[24px]">
          Please enter your email address to get your reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="space-y-4">
          <div className='flex flex-col justify-between gap-2'>
            <Label htmlFor="email" className='text-sm text-[#737373] dark:text-[#fafafa]'>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              value={email}
              className='h-[50px] placeholder:text-[#D1D5DB] rounded-[5px] bg-[rgba(250,250,250,0.8)]'
              onChange={(e) => setEmail(e.target.value)}
              data-testid="forgot-password-email"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
          disabled={isSubmitting}
          data-testid="forgot-password-submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/login" className="text-blue-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}
