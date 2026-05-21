import {
  FormLayout,
  SubmoduleFormSection,
  VisibilityApiSide,
} from "../shared";

type CreateSubmoduleTabProps = {
  selectedModuleTitle: string;
  selectedModuleWeekLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export function CreateSubmoduleTab({
  selectedModuleTitle,
  selectedModuleWeekLabel,
  onCancel,
  onSubmit,
}: CreateSubmoduleTabProps) {
  return (
    <FormLayout
      title="New submodule"
      subtitle={selectedModuleTitle}
      breadcrumbs={["Modules", selectedModuleWeekLabel, "SubModules", "New"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Create submodule"
      main={<SubmoduleFormSection />}
      side={
        <VisibilityApiSide
          showApiPreview={false}
          showCoverImageUpload
          variant="submodule"
        />
      }
    />
  );
}
