"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCheck } from 'lucide-react'

export default function ResetSuccessMessage() {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md dark:bg-[#111827]">
      <CardContent className="pt-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-[#22C55E10] p-3">
            <CheckCheck />
          </div>
        </div>

        <h1 className="text-3xl dark:text-[#fafafa] font-bold mb-2">Success</h1>
        <p className="text-gray-600 dark:text-[#fafafa] mb-6">Account created successfully</p>

        <Button
          className="w-full h-[50px] bg-[#007AFF] hover:bg-blue-800 rounded-[5px] font-medium"
          onClick={() => router.push("/login")}
          data-testid="login-again-button"
        >
          Login
        </Button>
      </CardContent>
    </Card>
  )
}
