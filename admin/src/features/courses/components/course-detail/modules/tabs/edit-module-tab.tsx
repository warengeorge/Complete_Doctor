import { DangerZone, FormLayout, ModuleFormSection, VisibilityApiSide } from "../shared";

type EditModuleTabProps = {
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  selectedModuleWeekLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteModule: () => void;
};

export function EditModuleTab({
  selectedModuleTitle,
  selectedModuleIdentifier,
  selectedModuleWeekLabel,
  onCancel,
  onSubmit,
  onDeleteModule,
}: EditModuleTabProps) {
  return (
    <FormLayout
      title="Edit module"
      subtitle={`${selectedModuleTitle} · ${selectedModuleIdentifier}`}
      breadcrumbs={["Modules", selectedModuleWeekLabel, "Edit"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Save changes"
      main={<ModuleFormSection />}
      side={
        <div className="space-y-3">
          <VisibilityApiSide showApiPreview={false} variant="module" />
          <DangerZone
            body="Deleting this module will also remove submodules, lessons, and learner progress records."
            label="Delete module"
            onDelete={onDeleteModule}
          />
        </div>
      }
    />
  );
}
