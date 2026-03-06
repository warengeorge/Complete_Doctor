export type SettingsProfile = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

export type SettingsPasswordForm = {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
};

export const initialSettingsProfile: SettingsProfile = {
  firstName: "Joanne",
  lastName: "Featherington",
  email: "joannefeatherington@gmail.com",
  avatar: "",
};

export const initialSettingsPassword: SettingsPasswordForm = {
  currentPassword: "",
  newPassword: "",
  retypePassword: "",
};

export function getProfileInitials({
  firstName,
  lastName,
}: Pick<SettingsProfile, "firstName" | "lastName">) {
  const safeFirstName = firstName.trim();
  const safeLastName = lastName.trim();

  const firstInitial = safeFirstName.charAt(0);
  const lastInitial = safeLastName.charAt(0);

  if (!firstInitial && !lastInitial) return "NA";
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function validateSettingsPassword(passwordData: SettingsPasswordForm) {
  if (!passwordData.currentPassword) {
    return "Enter your current password.";
  }

  if (!passwordData.newPassword || !passwordData.retypePassword) {
    return "Enter and confirm your new password.";
  }

  if (passwordData.newPassword.length < 8) {
    return "New password must be at least 8 characters.";
  }

  if (passwordData.newPassword !== passwordData.retypePassword) {
    return "New password and retyped password do not match.";
  }

  return null;
}
