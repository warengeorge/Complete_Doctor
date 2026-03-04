import { BadgeCheck, FastForward, Shuffle } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { DESCRIPTION_LIMIT } from "./constants";
import type { QuestionBankSettings } from "./types";

type CourseDetailQuestionBankSetupStateProps = {
  settings: QuestionBankSettings;
  onSettingChange: (key: keyof QuestionBankSettings, value: string | boolean) => void;
  onContinue: () => void;
};

export function CourseDetailQuestionBankSetupState({
  settings,
  onSettingChange,
  onContinue,
}: CourseDetailQuestionBankSetupStateProps) {
  return (
    <>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-[#ECECEC] bg-white">
          <div className="border-b border-[#ECECEC] px-5 py-4 sm:px-6">
            <h2 className="text-[15px] font-semibold text-[#151515]">Overview</h2>
          </div>

          <div className="space-y-7 px-5 py-6 sm:px-6">
            <div className="space-y-3">
              <label
                htmlFor="question-bank-title"
                className="block text-[14px] font-semibold text-[#313131]"
              >
                Title
              </label>
              <input
                id="question-bank-title"
                value={settings.title}
                onChange={(event) => onSettingChange("title", event.target.value)}
                placeholder="Add a name/title"
                className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 text-[13px] text-[#B5B5B5] outline-none placeholder:text-[#9D9DA2] focus:border-[#007AFF]"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="question-bank-description"
                className="block text-[14px] font-semibold text-[#313131]"
              >
                Description
              </label>
              <textarea
                id="question-bank-description"
                value={settings.description}
                maxLength={DESCRIPTION_LIMIT}
                onChange={(event) => onSettingChange("description", event.target.value)}
                placeholder="Describe the test"
                className="min-h-80 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-3 text-[13px] text-[#B5B5B5] outline-none placeholder:text-[#9D9DA2] focus:border-[#007AFF]"
              />
              <p className="text-right text-[11px] text-[#737373]">
                Maximum character limit: {DESCRIPTION_LIMIT}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#ECECEC] bg-white">
          <div className="border-b border-[#ECECEC] px-5 py-4 sm:px-6">
            <h2 className="text-[15px] font-semibold text-[#151515]">Settings</h2>
          </div>

          <div className="space-y-6 px-5 py-6 sm:px-6">
            <div className="space-y-3">
              <h3 className="text-[13px] font-semibold text-[#151515]">Duration</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    value={settings.durationHours}
                    onChange={(event) => onSettingChange("durationHours", event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#DCDCE0] bg-[#FAFAFACC] px-4 pr-12 text-[14px] text-[#1C1C1E] outline-none focus:border-[#007AFF]"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#6A6A6E]">
                    hrs
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={settings.durationMinutes}
                    onChange={(event) => onSettingChange("durationMinutes", event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 pr-12 text-[14px] text-[#1C1C1E] outline-none focus:border-[#007AFF]"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#6A6A6E]">
                    min
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#ECECEC] pt-5">
              <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                <div className="flex items-center gap-3">
                  <Shuffle className="h-5 w-5 text-[#2E2E30]" />
                  <div>
                    <p className="text-[14px] font-semibold text-[#0C0C0C]">Shuffle questions</p>
                    <p className="text-[12px] text-[#646464]">
                      Mix up the question order each time the quiz is taken.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.shuffleQuestions}
                  onCheckedChange={(checked) => onSettingChange("shuffleQuestions", checked)}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                <div className="flex items-center gap-3">
                  <FastForward className="h-5 w-5 text-[#2E2E30]" />
                  <div>
                    <p className="text-[14px] font-semibold text-[#0C0C0C]">Skip questions</p>
                    <p className="text-[12px] text-[#646464]">
                      Let users skip questions and come back to them later.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.skipQuestions}
                  onCheckedChange={(checked) => onSettingChange("skipQuestions", checked)}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFACC] px-4 py-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-[#2E2E30]" />
                  <div>
                    <p className="text-[14px] font-semibold text-[#0C0C0C]">Pass mark</p>
                    <p className="text-[12px] text-[#646464]">
                      Set the score students need to pass this quiz.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.passMark}
                  onCheckedChange={(checked) => onSettingChange("passMark", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-md bg-[#007AFF] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#006DE0]"
        >
          Save &amp; continue
        </button>
      </div>
    </>
  );
}
