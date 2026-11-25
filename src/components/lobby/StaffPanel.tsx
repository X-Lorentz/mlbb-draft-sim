"use client";

import type { Analyst, HeadCoach } from "@/types/mlbb";
import { AnalystCard, CoachCard } from "./StaffCards";

interface StaffPanelProps {
  coach?: HeadCoach;
  analyst?: Analyst;
  onPickCoach: () => void;
  onPickAnalyst: () => void;
  onClearCoach: () => void;
  onClearAnalyst: () => void;
}

export function StaffPanel({
  coach,
  analyst,
  onPickCoach,
  onPickAnalyst,
  onClearCoach,
  onClearAnalyst,
}: StaffPanelProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="cut-corner flex flex-col gap-3 border-l-4 border-gold bg-ink-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-gold">Head Coach</h3>
          {coach && (
            <button
              type="button"
              className="text-xs text-mute underline underline-offset-2 hover:text-fog"
              onClick={onClearCoach}
            >
              Lepas
            </button>
          )}
        </div>
        {coach ? <CoachCard coach={coach} /> : (
          <p className="text-sm text-mute">
            Belum dipilih. Coach memberi buff pasif ke statistik tim.
          </p>
        )}
        <button type="button" className={coach ? "btn-ghost" : "btn-primary"} onClick={onPickCoach}>
          {coach ? "Ganti coach" : "Pilih Head Coach"}
        </button>
      </div>

      <div className="cut-corner flex flex-col gap-3 border-l-4 border-ice bg-ink-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-ice">Analyst</h3>
          {analyst && (
            <button
              type="button"
              className="text-xs text-mute underline underline-offset-2 hover:text-fog"
              onClick={onClearAnalyst}
            >
              Lepas
            </button>
          )}
        </div>
        {analyst ? <AnalystCard analyst={analyst} /> : (
          <p className="text-sm text-mute">
            Belum dipilih. Analyst membuka radar prediksi di layar Draft.
          </p>
        )}
        <button type="button" className={analyst ? "btn-ghost" : "btn-primary"} onClick={onPickAnalyst}>
          {analyst ? "Ganti analyst" : "Pilih Analyst"}
        </button>
      </div>
    </div>
  );
}
