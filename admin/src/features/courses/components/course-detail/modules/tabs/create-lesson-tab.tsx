import { CreateLessonSide, FormLayout, LessonFormSection } from "../shared";

type CreateLessonTabProps = {
  hasSubmodules: boolean;
  hasModules: boolean;
  courseName: string;
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export function CreateLessonTab({
  hasSubmodules,
  hasModules,
  courseName,
  selectedModuleTitle,
  selectedModuleIdentifier,
  onCancel,
  onSubmit,
}: CreateLessonTabProps) {
  const endpoint = hasSubmodules
    ? "POST /api/courses/{id}/modules/{id}/submodules/{id}/lessons"
    : hasModules
      ? "POST /api/courses/{id}/modules/{id}/lessons"
      : "POST /api/courses/{id}/lessons";

  return (
    <FormLayout
      title="New lesson"
      subtitle={
        hasSubmodules
          ? "Neuroanatomy & functional systems · sub-001"
          : hasModules
            ? `${selectedModuleTitle} · ${selectedModuleIdentifier}`
            : courseName
      }
      breadcrumbs={
        hasSubmodules
          ? ["SubModules", "Lessons", "New"]
          : hasModules
            ? ["Modules", "Lessons", "New"]
            : ["Courses", "Lessons", "New"]
      }
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Create lesson"
      main={<LessonFormSection />}
      side={<CreateLessonSide endpoint={endpoint} />}
    />
  );
}
