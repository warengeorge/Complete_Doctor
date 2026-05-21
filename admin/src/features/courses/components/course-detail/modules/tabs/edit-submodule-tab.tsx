import {
  DangerZone,
  FormLayout,
  SubmoduleFormSection,
  VisibilityApiSide,
} from "../shared";

type EditSubmoduleTabProps = {
  selectedModuleWeekLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteSubmodule: () => void;
};

export function EditSubmoduleTab({
  selectedModuleWeekLabel,
  onCancel,
  onSubmit,
  onDeleteSubmodule,
}: EditSubmoduleTabProps) {
  return (
    <FormLayout
      title="Edit submodule"
      subtitle="Neuroanatomy & functional systems · sub-001"
      breadcrumbs={[selectedModuleWeekLabel, "SubModules", "Edit"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Save changes"
      main={<SubmoduleFormSection />}
      side={
        <div className="space-y-3">
          <VisibilityApiSide showApiPreview={false} variant="submodule" />
          <DangerZone
            body="Deleting this submodule will also remove lessons and learner progress records."
            label="Delete submodule"
            onDelete={onDeleteSubmodule}
          />
        </div>
      }
    />
  );
}
