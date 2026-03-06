"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { SettingsPasswordForm } from "../store";

type SecurityCardProps = {
  values: SettingsPasswordForm;
  isBusy: boolean;
  onChange: (field: keyof SettingsPasswordForm, value: string) => void;
  onUpdate: () => void;
};

export function SecurityCard({
  values,
  isBusy,
  onChange,
  onUpdate,
}: SecurityCardProps) {
  return (
    <Card className="gap-0 rounded-lg border-[#E1E1E3] bg-[#FAFAFA] py-0 shadow-none">
      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-xs tracking-wide text-[#676767] uppercase">
          Security
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-10">
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A1A]">
              Update password
            </p>
            <p className="mt-1 text-sm text-[#838383] leading-[1.35]">
              Keep your account safe with a new password
            </p>
          </div>

          <div className="space-y-5">
            <div className="max-w-[420px] space-y-2">
              <label
                htmlFor="settings-current-password"
                className="text-sm text-[#595959]"
              >
                Current Password
              </label>
              <Input
                id="settings-current-password"
                type="password"
                value={values.currentPassword}
                onChange={(event) =>
                  onChange("currentPassword", event.target.value)
                }
                className="h-11 border-[#696969] bg-[#FAFAFA] text-[16px] text-[#171717]"
                placeholder="**********"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="settings-new-password"
                  className="text-sm text-[#595959]"
                >
                  New password
                </label>
                <Input
                  id="settings-new-password"
                  type="password"
                  value={values.newPassword}
                  onChange={(event) => onChange("newPassword", event.target.value)}
                  className="h-11 border-[#D7D7DA] bg-[#F4F4F4] text-[16px] text-[#171717]"
                  placeholder="**********"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="settings-retype-password"
                  className="text-sm text-[#595959]"
                >
                  Retype password
                </label>
                <Input
                  id="settings-retype-password"
                  type="password"
                  value={values.retypePassword}
                  onChange={(event) =>
                    onChange("retypePassword", event.target.value)
                  }
                  className="h-11 border-[#D7D7DA] bg-[#F4F4F4] text-[16px] text-[#171717]"
                  placeholder="**********"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={onUpdate}
              disabled={isBusy}
              className="h-11 rounded-md bg-[#007AFF] px-6 text-sm font-semibold text-white hover:bg-[#006DE0] disabled:bg-[#67AEFF]"
            >
              {isBusy ? "Updating..." : "Update password"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
