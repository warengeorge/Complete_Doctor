"use client";

import { Switch } from "@/components/ui/switch";

import type { CourseCreateForm } from "../types";

type CoursePricingFormProps = {
  form: CourseCreateForm;
  onFieldChange: <K extends keyof CourseCreateForm>(
    field: K,
    value: CourseCreateForm[K],
  ) => void;
};

const inputClassName =
  "h-12 w-full rounded-xl border border-[#E6E6E8] bg-[#FAFAFACC] px-3 text-sm text-[#2D2F33] outline-none placeholder:text-[#B1B1B3] focus-visible:ring-2 focus-visible:ring-[#007AFF]";

export function CoursePricingForm({ form, onFieldChange }: CoursePricingFormProps) {
  const currencies = [
    { value: "GBP", label: "GBP — British Pound (£)" },
    { value: "USD", label: "USD — US Dollar ($)" },
    { value: "EUR", label: "EUR — Euro (€)" },
    { value: "NGN", label: "NGN — Nigerian Naira (₦)" },
  ] as const;

  const isFree = Number.parseFloat(form.price || "0") === 0;
  const currencySymbol = getCurrencySymbol(form.currency);

  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <header className="border-b border-[#E5E5E8] px-5 py-4">
        <h2 className="text-[16px] font-semibold text-[#151515]">Pricing</h2>
        <p className="text-sm text-[#6A6A6D]">
          Set the base price and optional early-bird discount.
        </p>
      </header>

      <div className="space-y-6 px-5 py-5">
        <div className="rounded-xl border border-[#E6E6E8] bg-[#F8F8FA] px-4 py-3 text-[13px] text-[#5F5F62]">
          Effective price shown to learners uses the early-bird price when active.
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Base price
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8A8A8D]">
                {currencySymbol}
              </span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(event) => onFieldChange("price", event.target.value)}
                placeholder="0.00"
                className={`${inputClassName} pl-7`}
              />
            </div>
            {isFree ? (
              <span className="inline-flex items-center rounded-lg bg-[#E9F7F2] px-3 py-1 text-[12px] font-semibold text-[#0F6E56]">
                Free course
              </span>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#313131]">
              Currency
            </label>
            <select
              value={form.currency}
              onChange={(event) =>
                onFieldChange("currency", event.target.value as CourseCreateForm["currency"])
              }
              className={inputClassName}
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#313131]">
            Price note
          </label>
          <input
            value={form.priceNote}
            onChange={(event) => onFieldChange("priceNote", event.target.value)}
            placeholder="e.g. Includes live classes, reading materials & notes"
            className={inputClassName}
          />
          <p className="text-[12px] text-[#7A7A7D]">Shown below the price.</p>
        </div>

        <hr className="border-[#E6E6E8]" />

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E6E6E8] bg-[#F8F8FA] px-4 py-3">
          <div>
            <p className="text-[14px] font-semibold text-[#1E1E20]">
              Enable early-bird pricing
            </p>
            <p className="text-[12px] text-[#7A7A7D]">
              Show a discounted price until a deadline date.
            </p>
          </div>
          <Switch
            checked={form.earlyBirdEnabled}
            onCheckedChange={(value) => onFieldChange("earlyBirdEnabled", value)}
          />
        </div>

        {form.earlyBirdEnabled ? (
          <div className="rounded-xl border border-dashed border-[#CFE3DA] bg-[#F1FBF7] p-4">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">
                  Early-bird price
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8A8A8D]">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={form.earlyBirdPrice}
                    onChange={(event) =>
                      onFieldChange("earlyBirdPrice", event.target.value)
                    }
                    placeholder="0.00"
                    className={`${inputClassName} pl-7`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#313131]">
                  Available until
                </label>
                <input
                  type="date"
                  value={form.earlyBirdUntil}
                  onChange={(event) =>
                    onFieldChange("earlyBirdUntil", event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function getCurrencySymbol(currency: CourseCreateForm["currency"]) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "NGN":
      return "₦";
    default:
      return "£";
  }
}
