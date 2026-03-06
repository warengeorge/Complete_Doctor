import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function SettingsHeader() {
  return (
    <header className="space-y-4">
      <div className="flex items-center gap-2 text-[13px] text-[#6B6B6B]">
        <Link href="/dashboard" className="hover:text-[#313131]">
          Home
        </Link>
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="font-semibold text-[#151515]">Settings</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-[40px] font-semibold leading-[1.2] text-[#121212]">
          Settings
        </h1>
        <p className="max-w-[560px] text-base leading-7 text-[#5F5F5F]">
          Manage your account, preferences, and learning experience.
        </p>
      </div>
    </header>
  );
}
