import { SettingsForm } from "./components/settings-form";
import { SettingsHeader } from "./components/settings-header";

export function SettingsView() {
  return (
    <section className="mx-auto w-full max-w-[1168px] space-y-5 sm:space-y-6">
      <SettingsHeader />
      <SettingsForm />
    </section>
  );
}
