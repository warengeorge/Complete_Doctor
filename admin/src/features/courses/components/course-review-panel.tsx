"use client";

import type { CourseCreateForm } from "../types";

type CourseReviewPanelProps = {
  form: CourseCreateForm;
};

export function CourseReviewPanel({ form }: CourseReviewPanelProps) {
  const currencySymbol = getCurrencySymbol(form.currency);
  const basePriceValue = Number.parseFloat(form.price || "0");
  const isFree = basePriceValue === 0;

  return (
    <section className="space-y-6">
      <ReviewBlock title="Basics">
        <ReviewGrid
          items={[
            { label: "Title", value: form.title },
            { label: "Slug", value: form.slug },
            { label: "Category", value: form.category },
            { label: "Instructor", value: form.instructor },
          ]}
        />
        {form.shortDescription ? (
          <ReviewRow label="Short description" value={form.shortDescription} />
        ) : null}
        {form.tags.length ? (
          <div className="mt-3">
            <p className="text-[12px] text-[#7A7A7D]">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[#E6E6E8] bg-[#F7F7F9] px-3 py-1 text-[12px] font-medium text-[#444446]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </ReviewBlock>

      <ReviewBlock title="Structure">
        <ReviewGrid
          items={[
            { label: "Depth", value: form.depth },
            { label: "Enrolment", value: form.enrolmentType },
            { label: "Access", value: form.repeatAccess },
            {
              label: "Duration",
              value: form.durationWeeks ? `${form.durationWeeks} weeks` : "",
            },
          ]}
        />
        {form.sessionFrequency ? (
          <ReviewRow label="Session frequency" value={form.sessionFrequency} />
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip variant="teal">
            {form.requiresAccount ? "Account required" : "Guest enrolment allowed"}
          </Chip>
          <Chip variant="purple">{form.isActive ? "Active" : "Inactive"}</Chip>
        </div>
      </ReviewBlock>

      <ReviewBlock title="Content">
        <ReviewRow label="Full description" value={form.description} />
        {form.about ? <ReviewRow label="About" value={form.about} /> : null}
        <ReviewList label="Highlights" items={form.highlights} />
        <ReviewList label="Objectives" items={form.objectives} />
        <ReviewList label="Audience" items={form.audience} />
        <ReviewList label="Prerequisites" items={form.prerequisites} />
      </ReviewBlock>

      <ReviewBlock title="Pricing">
        <ReviewGrid
          items={[
            {
              label: "Base price",
              value: isFree
                ? "Free"
                : `${currencySymbol}${basePriceValue.toFixed(2)} ${form.currency}`,
            },
            { label: "Currency", value: form.currency },
            form.earlyBirdEnabled
              ? {
                  label: "Early-bird",
                  value: form.earlyBirdPrice
                    ? `${currencySymbol}${Number.parseFloat(
                        form.earlyBirdPrice || "0",
                      ).toFixed(2)} until ${form.earlyBirdUntil || "—"}`
                    : "Enabled",
                }
              : { label: "Early-bird", value: "Not enabled" },
          ]}
        />
        {form.priceNote ? (
          <ReviewRow label="Price note" value={form.priceNote} />
        ) : null}
      </ReviewBlock>

      <ReviewBlock title="Completion">
        {form.certificateEnabled ? (
          <div className="flex flex-wrap gap-2">
            <Chip variant="teal">Certificate enabled</Chip>
            {form.certificateRequireAll ? (
              <Chip variant="purple">All modules required</Chip>
            ) : null}
            {form.certificatePassMark ? (
              <Chip variant="purple">
                Pass mark: {form.certificatePassMark}%
              </Chip>
            ) : null}
          </div>
        ) : (
          <p className="text-[12px] text-[#7A7A7D]">
            No completion certificate for this course.
          </p>
        )}
        {form.syllabusLink ? (
          <ReviewRow label="Syllabus link" value={form.syllabusLink} />
        ) : null}
        {form.certificateModuleIds ? (
          <ReviewRow label="Required module IDs" value={form.certificateModuleIds} />
        ) : null}
      </ReviewBlock>

      <div className="rounded-xl border border-[#CFE3DA] bg-[#F1FBF7] px-5 py-4">
        <p className="text-[14px] font-semibold text-[#0F6E56]">Ready to save?</p>
        <p className="text-[12px] text-[#5F5F62]">
          Use Save as draft to keep it hidden, or Publish to make it live
          immediately.
        </p>
      </div>
    </section>
  );
}

function ReviewBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#E5E5E8] bg-white px-5 py-4">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#007AFF]">
        {title}
      </p>
      {children}
    </section>
  );
}

function ReviewGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="space-y-1">
          <p className="text-[11px] text-[#7A7A7D]">{item.label}</p>
          <p className="text-[14px] font-medium text-[#1D1D1F]">
            {item.value || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mt-3 space-y-1">
      <p className="text-[11px] text-[#7A7A7D]">{label}</p>
      <p className="text-[14px] font-medium text-[#1D1D1F]">{value}</p>
    </div>
  );
}

function ReviewList({ label, items }: { label: string; items: string[] }) {
  const filtered = items.filter((item) => item.trim().length > 0);
  if (!filtered.length) return null;

  return (
    <div className="mt-4">
      <p className="text-[11px] text-[#7A7A7D]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {filtered.map((item, index) => (
          <span
            key={`${label}-${index}`}
            className="rounded-lg border border-[#E6E6E8] bg-[#F7F7F9] px-3 py-1 text-[12px] font-medium text-[#444446]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Chip({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "teal" | "purple";
}) {
  const styles =
    variant === "teal"
      ? "border-[#BFE5D7] bg-[#E9F7F2] text-[#0F6E56]"
      : "border-[#DAD5F7] bg-[#F1EEFF] text-[#534AB7]";

  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1 text-[12px] font-semibold ${styles}`}
    >
      {children}
    </span>
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
