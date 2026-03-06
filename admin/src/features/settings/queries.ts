import type { SettingsPasswordForm, SettingsProfile } from "./store";

function sleep(durationMs: number) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

export async function saveSettingsProfile(profile: SettingsProfile) {
  await sleep(650);
  return profile;
}

export async function updateSettingsPassword(_: SettingsPasswordForm) {
  await sleep(650);
}

export async function uploadSettingsAvatar(file: File) {
  await sleep(450);
  return URL.createObjectURL(file);
}
