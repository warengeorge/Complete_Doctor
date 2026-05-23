import { EditLessonFormSection, EditLessonSide, FormLayout } from "../shared";

type EditLessonTabProps = {
  selectedLessonId: string | null;
  selectedLessonTitle: string;
  selectedLessonType: string;
  selectedLessonDescription: string;
  selectedLessonContent: string;
  selectedLessonMediaCount: number;
  selectedLessonScheduled: string;
  selectedLessonEndsAt: string;
  selectedLessonDurationMinutes: number | null;
  selectedLessonPublished: boolean;
  selectedLessonRequired: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteLesson: () => void;
};

export function EditLessonTab({
  selectedLessonId,
  selectedLessonTitle,
  selectedLessonType,
  selectedLessonDescription,
  selectedLessonContent,
  selectedLessonMediaCount,
  selectedLessonScheduled,
  selectedLessonEndsAt,
  selectedLessonDurationMinutes,
  selectedLessonPublished,
  selectedLessonRequired,
  onCancel,
  onSubmit,
  onDeleteLesson,
}: EditLessonTabProps) {
  return (
    <FormLayout
      title="Edit lesson"
      subtitle={`${selectedLessonTitle} · ${selectedLessonId ?? "—"}`}
      breadcrumbs={["Lessons", selectedLessonId ?? "—", "Edit"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Save changes"
      main={
        <EditLessonFormSection
          initialValues={{
            type: selectedLessonType,
            title: selectedLessonTitle,
            description: selectedLessonDescription,
            content: selectedLessonContent,
            mediaCount: selectedLessonMediaCount,
          }}
        />
      }
      side={
        <EditLessonSide
          initialValues={{
            scheduledAt: selectedLessonScheduled,
            endsAt: selectedLessonEndsAt,
            durationMinutes: selectedLessonDurationMinutes,
            isPublished: selectedLessonPublished,
            isRequired: selectedLessonRequired,
          }}
          onDelete={onDeleteLesson}
        />
      }
    />
  );
}
