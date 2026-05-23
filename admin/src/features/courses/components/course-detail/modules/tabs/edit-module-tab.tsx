import { DangerZone, FormLayout, ModuleFormSection, VisibilityApiSide } from "../shared";

type EditModuleTabProps = {
  selectedModuleTitle: string;
  selectedModuleIdentifier: string;
  selectedModuleWeekLabel: string;
  selectedModuleWeekNumber: number | null;
  selectedModuleDisplayOrder: number;
  selectedModuleDescription: string;
  selectedModuleIsPublished: boolean;
  selectedModuleIsRequired: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteModule: () => void;
};

export function EditModuleTab({
  selectedModuleTitle,
  selectedModuleIdentifier,
  selectedModuleWeekLabel,
  selectedModuleWeekNumber,
  selectedModuleDisplayOrder,
  selectedModuleDescription,
  selectedModuleIsPublished,
  selectedModuleIsRequired,
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
      main={
        <ModuleFormSection
          initialValues={{
            title: selectedModuleTitle,
            weekNumber: selectedModuleWeekNumber,
            displayOrder: selectedModuleDisplayOrder,
            description: selectedModuleDescription,
          }}
        />
      }
      side={
        <div className="space-y-3">
          <VisibilityApiSide
            showApiPreview={false}
            variant="module"
            initialValues={{
              isPublished: selectedModuleIsPublished,
              isRequired: selectedModuleIsRequired,
            }}
          />
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
