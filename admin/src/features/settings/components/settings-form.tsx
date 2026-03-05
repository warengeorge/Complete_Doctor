"use client";

import { useEffect, useState } from "react";

import {
  saveSettingsProfile,
  updateSettingsPassword,
  uploadSettingsAvatar,
} from "../queries";
import {
  initialSettingsPassword,
  initialSettingsProfile,
  validateSettingsPassword,
  type SettingsPasswordForm,
  type SettingsProfile,
} from "../store";
import { PersonalInformationCard } from "./personal-information-card";
import { SecurityCard } from "./security-card";

type FeedbackState = {
  type: "success" | "error";
  message: string;
};

function releaseBlobUrl(url: string | null) {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

export function SettingsForm() {
  const [profile, setProfile] = useState<SettingsProfile>(initialSettingsProfile);
  const [passwordData, setPasswordData] =
    useState<SettingsPasswordForm>(initialSettingsPassword);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    initialSettingsProfile.avatar ?? null,
  );
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    return () => releaseBlobUrl(avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    if (!feedback) return;

    const timeoutId = window.setTimeout(() => setFeedback(null), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const handleProfileChange = (
    field: keyof Pick<SettingsProfile, "firstName" | "lastName" | "email">,
    value: string,
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (
    field: keyof SettingsPasswordForm,
    value: string,
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (file: File) => {
    setFeedback(null);
    setIsUploadingAvatar(true);

    try {
      const nextAvatarUrl = await uploadSettingsAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: nextAvatarUrl }));
      setAvatarUrl((previousUrl) => {
        releaseBlobUrl(previousUrl);
        return nextAvatarUrl;
      });
      setFeedback({
        type: "success",
        message: "Profile photo uploaded.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to upload photo right now.",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    setFeedback(null);
    setIsSavingProfile(true);

    try {
      const savedProfile = await saveSettingsProfile(profile);
      setProfile(savedProfile);
      setFeedback({
        type: "success",
        message: "Profile changes saved.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to save profile changes.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    setFeedback(null);

    const validationError = validateSettingsPassword(passwordData);
    if (validationError) {
      setFeedback({
        type: "error",
        message: validationError,
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateSettingsPassword(passwordData);
      setPasswordData(initialSettingsPassword);
      setFeedback({
        type: "success",
        message: "Password updated.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to update password.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {feedback ? (
        <p
          className={
            feedback.type === "success"
              ? "rounded-md border border-[#C8F2D7] bg-[#F1FCF5] px-3 py-2 text-sm text-[#0F7B3A]"
              : "rounded-md border border-[#FFD2D2] bg-[#FFF6F6] px-3 py-2 text-sm text-[#AC2222]"
          }
          role="status"
        >
          {feedback.message}
        </p>
      ) : null}

      <PersonalInformationCard
        profile={profile}
        avatarUrl={avatarUrl}
        isBusy={isSavingProfile || isUploadingAvatar}
        onProfileChange={handleProfileChange}
        onAvatarUpload={handleAvatarUpload}
        onSave={handleSaveProfile}
      />

      <SecurityCard
        values={passwordData}
        isBusy={isUpdatingPassword}
        onChange={handlePasswordChange}
        onUpdate={handleUpdatePassword}
      />
    </div>
  );
}
