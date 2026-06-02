import {
  DangerZone,
  FormLayout,
  SubmoduleFormSection,
  VisibilityApiSide,
} from "../shared";

type EditSubmoduleTabProps = {
  selectedSubmoduleTitle: string;
  selectedSubmoduleIdentifier: string;
  selectedSubmoduleDescription: string;
  selectedSubmoduleDisplayOrder: number;
  selectedSubmoduleDuration: number | null;
  selectedSubmoduleTrack: string;
  selectedSubmoduleIsPublished: boolean;
  selectedSubmoduleIsRequired: boolean;
  selectedModuleWeekLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  onDeleteSubmodule: () => void;
};

export function EditSubmoduleTab({
  selectedSubmoduleTitle,
  selectedSubmoduleIdentifier,
  selectedSubmoduleDescription,
  selectedSubmoduleDisplayOrder,
  selectedSubmoduleDuration,
  selectedSubmoduleTrack,
  selectedSubmoduleIsPublished,
  selectedSubmoduleIsRequired,
  selectedModuleWeekLabel,
  onCancel,
  onSubmit,
  onDeleteSubmodule,
}: EditSubmoduleTabProps) {
  return (
    <FormLayout
      title="Edit submodule"
      subtitle={`${selectedSubmoduleTitle} · ${selectedSubmoduleIdentifier}`}
      breadcrumbs={[selectedModuleWeekLabel, "SubModules", "Edit"]}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitLabel="Save changes"
      main={
        <SubmoduleFormSection
          initialValues={{
            title: selectedSubmoduleTitle,
            displayOrder: selectedSubmoduleDisplayOrder,
            duration: selectedSubmoduleDuration,
            description: selectedSubmoduleDescription,
          }}
        />
      }
      side={
        <div className="space-y-3">
          <VisibilityApiSide
            showApiPreview={false}
            variant="submodule"
            initialValues={{
              track: selectedSubmoduleTrack,
              isPublished: selectedSubmoduleIsPublished,
              isRequired: selectedSubmoduleIsRequired,
            }}
          />
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
