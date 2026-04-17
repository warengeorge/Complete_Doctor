import { Search } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  meta,
  actions,
}: {
  title: string;
  subtitle: string;
  meta?: string[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E5E5E8] bg-white px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-semibold text-[#121212]">{title}</h2>
          {meta && (
            <div className="my-2 flex flex-wrap gap-1.5">
              {meta.map((item) => (
                <Chip key={item} tone="gray">
                  {item}
                </Chip>
              ))}
            </div>
          )}

          <p className="text-[12px] text-[#6B6B6B]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6B6B6B]">
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 ? <span className="mr-2 text-[#E5E5E8]">/</span> : null}
          {item}
        </span>
      ))}
    </div>
  );
}

export function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-[#E5E5E8] bg-white px-4 py-3">
      <p className="text-[20px] font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] text-[#6B6B6B]">{label}</p>
    </div>
  );
}

export function TableCard({
  search,
  onSearch,
  placeholder,
  countLabel,
  trailing,
  filters,
  children,
}: {
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  countLabel: string;
  trailing?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E5E8] bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E5E8] px-3 py-2">
        <div className="relative min-w-[220px] flex-1 sm:max-w-[280px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-[#E5E5E8] bg-[#F5F5F7] py-1.5 pl-8 pr-3 text-[12px] text-[#121212] outline-none focus:border-[#007AFF]"
          />
        </div>
        {filters}
        <span className="ml-auto text-[11px] text-[#6B6B6B]">{countLabel}</span>
        {trailing}
      </div>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "published" | "required" | "optional";
}) {
  const toneClass =
    tone === "published"
      ? "bg-[#EAF3FF] text-[#006DE0]"
      : tone === "required"
        ? "bg-[#EEF3FF] text-[#1D4ED8]"
        : "bg-[#F5F5F7] text-[#6B6B6B]";

  return (
    <span className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}>
      {children}
    </span>
  );
}

export function Chip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "purple" | "teal" | "coral" | "amber" | "gray";
}) {
  const toneClass =
    tone === "purple"
      ? "bg-[#EEF3FF] text-[#1D4ED8]"
      : tone === "teal"
        ? "bg-[#EAF3FF] text-[#006DE0]"
        : tone === "coral"
          ? "bg-[#FFF3EE] text-[#C2410C]"
          : tone === "amber"
            ? "bg-[#FFF7E6] text-[#B45309]"
            : "bg-[#F5F5F7] text-[#6B6B6B]";

  return (
    <span className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}>
      {children}
    </span>
  );
}

export function IconButton({
  onClick,
  icon,
  label,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E5E8] text-[#6B6B6B] hover:bg-[#F5F5F7]"
    >
      {icon}
    </button>
  );
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <div className="border-b border-[#E5E5E8] px-4 py-3">
        <h3 className="text-[13px] font-semibold text-[#121212]">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function KeyValues({ rows }: { rows: [string, string][] }) {
  return (
    <div className="space-y-2">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between gap-3 border-b border-[#E5E5E8] pb-2"
        >
          <span className="text-[11px] text-[#6B6B6B]">{k}</span>
          <span className="text-right text-[12px] font-medium text-[#121212]">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FormLayout({
  title,
  subtitle,
  breadcrumbs,
  main,
  side,
  submitLabel,
  onCancel,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  main: React.ReactNode;
  side: React.ReactNode;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <Breadcrumb items={breadcrumbs} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#E5E5E8] px-4 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
          >
            Cancel
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div>{main}</div>
        <div>{side}</div>
      </div>

      <div className="flex justify-end gap-2 border-t border-[#E5E5E8] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-md bg-[#007AFF] px-3 py-2 text-[13px] font-semibold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

export function ModuleFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Basic information">
        <div className="space-y-3">
          <Field label="Module title">
            <input
              type="text"
              defaultValue="Week 1 - Neuroscience foundations"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Week number">
              <input
                type="number"
                defaultValue={1}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
            <Field label="Display order">
              <input
                type="number"
                defaultValue={10}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              defaultValue="Core neuroanatomy, neurophysiology, and neurotransmitter systems underpinning psychiatric understanding."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>

      <Card title="Prerequisites">
        <p className="mb-2 text-[12px] text-[#6B6B6B]">
          Learners must complete listed modules before this one unlocks.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded border border-[#E5E5E8] bg-[#F5F5F7] px-2 py-1 font-mono text-[11px]">
            mod-001
          </span>
        </div>
      </Card>
    </div>
  );
}

export function SubmoduleFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Basic information">
        <div className="space-y-3">
          <Field label="SubModule title">
            <input
              type="text"
              defaultValue="Neuroanatomy & functional systems"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Display order">
              <input
                type="number"
                defaultValue={10}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
            <Field label="Duration (minutes)">
              <input
                type="number"
                defaultValue={90}
                className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              defaultValue="Cortical structures, limbic system, basal ganglia, and their clinical relevance."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>

      <Card title="Track & visibility">
        <div className="space-y-2 text-[13px] text-[#6B6B6B]">
          <label className="flex items-center gap-2 rounded-md border border-[#007AFF] bg-[#EAF3FF] px-3 py-2">
            <input type="radio" name="track" defaultChecked />
            Live track (required)
          </label>
          <label className="flex items-center gap-2 rounded-md border border-[#E5E5E8] px-3 py-2">
            <input type="radio" name="track" />
            Reading track (optional)
          </label>
        </div>
      </Card>
    </div>
  );
}

export function LessonFormSection() {
  return (
    <div className="space-y-3">
      <Card title="Lesson type">
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["LIVE", "Zoom session with schedule"],
            ["VIDEO", "Pre-recorded video"],
            ["QUIZ", "Assessment link"],
            ["READING", "Guided reading"],
            ["RESOURCE", "Downloadable files"],
          ].map(([type, desc]) => (
            <label
              key={type}
              className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[12px] hover:bg-[#F5F5F7]"
            >
              <input
                type="radio"
                name="lesson-type"
                defaultChecked={type === "LIVE"}
                className="mr-2"
              />
              <span className="font-semibold text-[#121212]">{type}</span>
              <p className="mt-1 text-[11px] text-[#6B6B6B]">{desc}</p>
            </label>
          ))}
        </div>
      </Card>

      <Card title="Content">
        <div className="space-y-3">
          <Field label="Title">
            <input
              type="text"
              defaultValue="Live session: cortical anatomy"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <Field label="Description">
            <textarea
              defaultValue="Interactive live session covering cortical anatomy and functional mapping."
              className="min-h-[88px] w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>

          <Field label="Meeting URL">
            <input
              type="url"
              defaultValue="https://zoom.us/j/completedoctor-week1-live"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}

export function VisibilityApiSide({ endpoint }: { endpoint: string }) {
  return (
    <div className="space-y-3">
      <Card title="Visibility">
        <div className="space-y-2 text-[13px] text-[#6B6B6B]">
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            Published
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            Required
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </Card>
      <Card title="API preview">
        <p className="mb-2 text-[11px] text-[#6B6B6B]">{endpoint}</p>
        <pre className="overflow-auto rounded-md bg-[#F5F5F7] p-2 text-[10px] text-[#6B6B6B]">
          {`{
  "title": "...",
  "isPublished": true,
  "isRequired": true
}`}
        </pre>
      </Card>
    </div>
  );
}

export function DangerZone({
  body,
  label,
  onDelete,
}: {
  body: string;
  label: string;
  onDelete: () => void;
}) {
  return (
    <Card title="Danger zone">
      <p className="mb-3 text-[12px] text-[#6B6B6B]">{body}</p>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-md border border-[#D92D20] px-3 py-2 text-[12px] font-semibold text-[#D92D20] hover:bg-[#FEECEC]"
      >
        {label}
      </button>
    </Card>
  );
}

export function InfoPanel({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#E5E5E8] bg-white p-6 text-center">
      <h3 className="text-[18px] font-semibold text-[#121212]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[680px] text-[13px] text-[#6B6B6B]">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 rounded-md bg-[#007AFF] px-3 py-2 text-[13px] font-semibold text-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function InfoMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-r-md border-l-4 border-[#007AFF] bg-[#F5F5F7] px-3 py-2 text-[12px] text-[#6B6B6B]">
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
        {label}
      </span>
      {children}
    </label>
  );
}
