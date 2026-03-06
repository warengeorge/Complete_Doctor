import Image from "next/image";
import { AdminLoginForm } from "./admin-login-form";

export function AdminLoginView() {
  return (
    <main className="grid min-h-screen w-full bg-[#FAFAFA] lg:grid-cols-[1fr_1fr]">
      <section className="flex items-center justify-center px-6 py-10">
        <AdminLoginForm />
      </section>

      <section className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/auth-background.svg"
          alt="Medical learning"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
      </section>
    </main>
  );
}
