import {
  FormLayout,
  ModuleFormSection,
  VisibilityApiSide,
} from "../shared";

type CreateModuleTabProps = {
  courseName: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export function CreateModuleTab({
  courseName,
  onCancel,
  onSubmit,
}: CreateModuleTabProps) {
  return (
    <FormLayout
      title="New module"
      subtitle={courseName}
      breadcrumbs={["Courses", courseName, "Modules", "New"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Create module"
      main={<ModuleFormSection />}
      side={
        <VisibilityApiSide
          showApiPreview={false}
          showCoverImageUpload
          variant="module"
        />
      }
    />
  );
}
