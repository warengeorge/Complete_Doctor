import { EditLessonFormSection, EditLessonSide, FormLayout } from "../shared";

type EditLessonTabProps = {
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteLesson: () => void;
};

export function EditLessonTab({
  onCancel,
  onSubmit,
  onDeleteLesson,
}: EditLessonTabProps) {
  return (
    <FormLayout
      title="Edit lesson"
      subtitle="Live session: cortical anatomy · les-002"
      breadcrumbs={["Lessons", "les-002", "Edit"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Save changes"
      main={<EditLessonFormSection />}
      side={<EditLessonSide onDelete={onDeleteLesson} />}
    />
  );
}
