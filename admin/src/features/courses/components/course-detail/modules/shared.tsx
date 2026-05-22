import { useRef, useState } from "react";
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
    <span
      className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}
    >
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
    <span
      className={`rounded px-2 py-1 text-[10px] font-semibold ${toneClass}`}
    >
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
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E5E8] bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-[#E5E5E8] px-4 py-3">
        <h3 className="text-[13px] font-semibold text-[#121212]">{title}</h3>
        {action}
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
        <PrerequisiteManager
          emptyLabel="No prerequisites set"
          selectLabel="— Add prerequisite module —"
          options={[
            "mod-001 · Week 1 - Neuroscience foundations",
            "mod-002 · Week 2 - Psychology & development",
            "mod-003 · Week 3 - Psychopharmacology",
          ]}
          initialTags={["mod-001"]}
        />
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
      <Card title="Prerequisites">
        <p className="mb-2 text-[12px] text-[#6B6B6B]">
          Submodules that must be completed before this one unlocks within the
          same module.
        </p>
        <PrerequisiteManager
          emptyLabel="No prerequisites set"
          selectLabel="— Add prerequisite submodule —"
          options={[
            "sub-001 · Neuroanatomy & functional systems",
            "sub-002 · Neurophysiology & neurotransmitters",
            "sub-003 · Clinical correlation and application",
          ]}
        />
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
            <p className="mt-2 rounded-md bg-[#F5F5F7] px-3 py-2 text-[12px] text-[#6B6B6B]">
              Zoom, Google Meet, or MS Teams URL. Shown to learners at session
              time.
            </p>
          </Field>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
              Attachments
            </p>
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
              <span className="text-[16px] text-[#6B6B6B]">📄</span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#121212]">
                Week 1 live session slides.pdf
              </span>
              <span className="text-[12px] text-[#6B6B6B]">1.8 MB</span>
              <button
                type="button"
                className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#D92D20] hover:bg-white"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              className="mt-3 rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              + Upload attachment
            </button>
          </div>
        </div>
      </Card>

      <Card title="Prerequisites">
        <PrerequisiteManager
          emptyLabel="No prerequisites set"
          selectLabel="— Add prerequisite lesson —"
          options={[
            "les-001 · Pre-session quiz",
            "les-002 · Live session: cortical anatomy",
            "les-003 · Post-session slides",
          ]}
          initialTags={["les-001 · Pre-session quiz"]}
        />
      </Card>
    </div>
  );
}

export function EditLessonFormSection() {
  return (
    <div className="space-y-3">
      <Card
        title="Content"
        action={
          <span className="rounded bg-[#EEF3FF] px-2 py-1 text-[11px] font-semibold text-[#1D4ED8]">
            LIVE type
          </span>
        }
      >
        <div className="space-y-4">
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
            <p className="mt-2 rounded-md bg-[#F5F5F7] px-3 py-2 text-[12px] text-[#6B6B6B]">
              Zoom, Google Meet, or MS Teams URL. Shown to learners at session
              time.
            </p>
          </Field>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
              Attachments
            </p>
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
              <span className="text-[16px] text-[#6B6B6B]">📄</span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#121212]">
                Week 1 live session slides.pdf
              </span>
              <span className="text-[12px] text-[#6B6B6B]">1.8 MB</span>
              <button
                type="button"
                className="rounded-md border border-[#E5E5E8] px-2 py-1 text-[12px] font-medium text-[#D92D20] hover:bg-white"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              className="mt-3 rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
            >
              + Upload attachment
            </button>
          </div>
        </div>
      </Card>

      <Card title="Prerequisites">
        <PrerequisiteManager
          emptyLabel="No prerequisites set"
          selectLabel="— Add prerequisite lesson —"
          options={[
            "les-001 · Pre-session quiz",
            "les-002 · Live session: cortical anatomy",
            "les-003 · Post-session slides",
          ]}
          initialTags={["les-001 · Pre-session quiz"]}
        />
      </Card>
    </div>
  );
}

export function EditLessonSide({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="space-y-3">
      <Card title="Scheduling">
        <div className="space-y-3">
          <Field label="Scheduled at">
            <input
              type="text"
              defaultValue="07/28/2025 07:00 PM"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
          <Field label="Ends at">
            <input
              type="text"
              defaultValue="07/28/2025 08:30 PM"
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
      </Card>

      <Card title="Visibility">
        <div className="space-y-2 text-[13px] text-[#6B6B6B]">
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            <div>
              <p className="font-semibold text-[#121212]">Published</p>
              <p className="text-[12px] text-[#6B6B6B]">
                Visible to enrolled learners
              </p>
            </div>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
            <div>
              <p className="font-semibold text-[#121212]">Required</p>
              <p className="text-[12px] text-[#6B6B6B]">
                Counts toward module progress
              </p>
            </div>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </Card>

      <DangerZone
        body="Deleting this lesson will remove it and all learner progress records for this lesson."
        label="Delete lesson"
        onDelete={onDelete}
      />
    </div>
  );
}

export function CreateLessonSide({ endpoint }: { endpoint: string }) {
  return (
    <div className="space-y-3">
      <Card title="Scheduling">
        <div className="space-y-3">
          <Field label="Scheduled at">
            <input
              type="text"
              defaultValue="07/28/2025 07:00 PM"
              className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px]"
            />
          </Field>
          <Field label="Ends at">
            <input
              type="text"
              defaultValue="07/28/2025 08:30 PM"
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
      </Card>

      <VisibilityApiSide variant="lesson" endpoint={endpoint} />
    </div>
  );
}

export function VisibilityApiSide({
  endpoint,
  showApiPreview = true,
  showCoverImageUpload = false,
  variant = "module",
}: {
  endpoint?: string;
  showApiPreview?: boolean;
  showCoverImageUpload?: boolean;
  variant?: "module" | "submodule" | "lesson";
}) {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  function onCoverChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
  }

  function onRemoveCover() {
    setCoverPreview(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {variant === "submodule" ? (
        <Card title="Track & visibility">
          <div className="space-y-2 text-[13px] text-[#6B6B6B]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6B6B6B]">
              Track type
            </p>
            <label className="block rounded-md border border-[#007AFF] bg-[#EAF3FF] px-3 py-2">
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="track"
                  defaultChecked
                  className="mt-0.5"
                />
                <div>
                  <p className="font-semibold text-[#121212]">Live track</p>
                  <p className="text-[12px] text-[#6B6B6B]">
                    Required · quiz + live session + slides
                  </p>
                </div>
              </div>
            </label>
            <label className="block rounded-md border border-[#E5E5E8] px-3 py-2">
              <div className="flex items-start gap-2">
                <input type="radio" name="track" className="mt-0.5" />
                <div>
                  <p className="font-semibold text-[#121212]">Reading track</p>
                  <p className="text-[12px] text-[#6B6B6B]">
                    Optional · guided reading + reading session
                  </p>
                </div>
              </div>
            </label>
            <p className="text-[12px] text-[#6B6B6B]">
              Track type determines the isRequired flag and the types of lessons
              you'll add.
            </p>
            <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
              <div>
                <p className="font-semibold text-[#121212]">Published</p>
                <p className="text-[12px] text-[#6B6B6B]">
                  Visible to enrolled learners
                </p>
              </div>
              <input type="checkbox" />
            </label>
          </div>
        </Card>
      ) : (
        <Card title="Visibility">
          <div className="space-y-2 text-[13px] text-[#6B6B6B]">
            <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
              <div>
                <p className="font-semibold text-[#121212]">Published</p>
                <p className="text-[12px] text-[#6B6B6B]">
                  Visible to enrolled learners
                </p>
              </div>
              <input type="checkbox" />
            </label>
            {variant !== "lesson" ? (
              <label className="flex items-center justify-between rounded-md border border-[#E5E5E8] bg-[#F5F5F7] px-3 py-2">
                <div>
                  <p className="font-semibold text-[#121212]">Required</p>
                  <p className="text-[12px] text-[#6B6B6B]">
                    Counts toward certificate completion
                  </p>
                </div>
                <input type="checkbox" defaultChecked />
              </label>
            ) : null}
          </div>
        </Card>
      )}
      {showCoverImageUpload ? (
        <Card title="Cover image">
          <div className="space-y-2">
            <span className="block text-[11px] text-[#6B6B6B]">
              Upload cover image (recommended 1200 x 630)
            </span>
            <div className="rounded-md border border-dashed border-[#C7C7CC] bg-[#F5F5F7] px-3 py-4 text-center text-[12px] text-[#6B6B6B]">
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={onCoverChange}
                className="mx-auto block w-full max-w-[220px] text-[12px] text-[#6B6B6B]"
              />
            </div>
            {coverPreview ? (
              <div className="space-y-2">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-40 w-full rounded-md border border-[#E5E5E8] object-cover"
                />
                <button
                  type="button"
                  onClick={onRemoveCover}
                  className="w-full rounded-md border border-[#E5E5E8] px-3 py-2 text-[12px] font-semibold text-[#6B6B6B] hover:bg-[#F5F5F7]"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-[#6B6B6B]">
                No image selected yet.
              </p>
            )}
          </div>
        </Card>
      ) : null}
      {showApiPreview ? (
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
      ) : null}
    </div>
  );
}

function PrerequisiteManager({
  emptyLabel,
  selectLabel,
  options,
  initialTags = [],
}: {
  emptyLabel: string;
  selectLabel: string;
  options: string[];
  initialTags?: string[];
}) {
  const [selected, setSelected] = useState("");
  const [tags, setTags] = useState<string[]>(initialTags);

  function addTag() {
    if (!selected || tags.includes(selected)) return;
    setTags((prev) => [...prev, selected]);
    setSelected("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((item) => item !== tag));
  }

  return (
    <div className="space-y-2">
      {tags.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded border border-[#E5E5E8] bg-[#F5F5F7] px-2 py-1 font-mono text-[11px]"
            >
              {tag.split(" · ")[0]}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-[12px] leading-none text-[#6B6B6B] hover:text-[#121212]"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="italic text-[12px] text-[#6B6B6B]">{emptyLabel}</p>
      )}
      <div className="flex gap-2">
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="w-full rounded-md border border-[#E5E5E8] bg-white px-3 py-2 text-[13px] text-[#121212]"
        >
          <option value="">{selectLabel}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addTag}
          className="rounded-md border border-[#007AFF] px-3 py-2 text-[13px] font-semibold text-[#007AFF] hover:bg-[#EAF3FF]"
        >
          Add
        </button>
      </div>
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
