import type { DeleteConfig } from "../types";

type DeleteConfirmTabProps = {
  deleteConfig: DeleteConfig;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmTab({
  deleteConfig,
  onCancel,
  onConfirm,
}: DeleteConfirmTabProps) {
  return (
    <div className="rounded-xl border border-[#E5E5E8] bg-white p-6">
      <h3 className="text-[18px] font-semibold text-[#121212]">
        {deleteConfig.title}
      </h3>
      <p className="mt-2 text-[13px] text-[#6B6B6B]">{deleteConfig.body}</p>
      <p className="mt-3 rounded-md bg-[#FEECEC] px-3 py-2 text-[12px] text-[#D92D20]">
        {deleteConfig.warning}
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[#E5E5E8] px-3 py-2 text-[13px] font-semibold text-[#6B6B6B]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-[#D92D20] px-3 py-2 text-[13px] font-semibold text-white"
        >
          {deleteConfig.cta}
        </button>
      </div>
    </div>
  );
}
