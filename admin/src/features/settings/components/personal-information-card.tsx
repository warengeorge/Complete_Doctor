"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { SettingsProfile } from "../store";
import { getProfileInitials } from "../store";

type PersonalInformationCardProps = {
  profile: SettingsProfile;
  avatarUrl: string | null;
  isBusy: boolean;
  onProfileChange: (
    field: keyof Pick<SettingsProfile, "firstName" | "lastName" | "email">,
    value: string,
  ) => void;
  onAvatarUpload: (file: File) => void;
  onSave: () => void;
};

export function PersonalInformationCard({
  profile,
  avatarUrl,
  isBusy,
  onProfileChange,
  onAvatarUpload,
  onSave,
}: PersonalInformationCardProps) {
  return (
    <Card className="gap-0 rounded-lg border-[#E1E1E3] bg-[#FAFAFA] py-0 shadow-none">
      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-xs tracking-wide text-[#676767] uppercase">
          Personal information
        </h2>

        <div className="mt-8 grid gap-6 border-b border-[#E1E1E3] pb-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-10">
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A1A]">
              Display picture
            </p>
            <p className="mt-1 text-sm text-[#838383] leading-[1.35]">
              Personalize your profile with a photo
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8E8EA]">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Profile avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[20px] font-semibold text-[#333333]">
                  {getProfileInitials(profile)}
                </span>
              )}
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={isBusy}
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];
                  if (selectedFile) {
                    onAvatarUpload(selectedFile);
                  }
                  event.currentTarget.value = "";
                }}
              />
              <span className="inline-flex h-10 items-center gap-2 rounded-md border border-[#D9D9DD] bg-[#F5F5F6] px-4 text-sm font-medium text-[#3A3A3A] transition-colors hover:bg-[#EEEEEF]">
                <Upload className="h-4 w-4" />
                Upload
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-10">
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A1A]">
              Profile Information
            </p>
            <p className="mt-1 text-sm text-[#838383] leading-[1.35]">
              Edit your details to keep your profile up to date
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="settings-first-name"
                  className="text-sm text-[#595959]"
                >
                  First name
                </label>
                <Input
                  id="settings-first-name"
                  value={profile.firstName}
                  onChange={(event) =>
                    onProfileChange("firstName", event.target.value)
                  }
                  className="h-11 border-[#696969] bg-[#FAFAFA] text-[16px] text-[#171717] placeholder:text-[#9D9D9D]"
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="settings-last-name"
                  className="text-sm text-[#595959]"
                >
                  Last name
                </label>
                <Input
                  id="settings-last-name"
                  value={profile.lastName}
                  onChange={(event) =>
                    onProfileChange("lastName", event.target.value)
                  }
                  className="h-11 border-[#696969] bg-[#FAFAFA] text-[16px] text-[#171717] placeholder:text-[#9D9D9D]"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="settings-email"
                className="text-sm text-[#595959]"
              >
                Email address
              </label>
              <Input
                id="settings-email"
                type="email"
                value={profile.email}
                onChange={(event) => onProfileChange("email", event.target.value)}
                className="h-11 border-[#696969] bg-[#FAFAFA] text-[16px] text-[#171717] placeholder:text-[#9D9D9D]"
                placeholder="Email address"
              />
            </div>

            <Button
              type="button"
              onClick={onSave}
              disabled={isBusy}
              className="h-11 rounded-md bg-[#007AFF] px-6 text-sm font-semibold text-white hover:bg-[#006DE0] disabled:bg-[#67AEFF]"
            >
              {isBusy ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
