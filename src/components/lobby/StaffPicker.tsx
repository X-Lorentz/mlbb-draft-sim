"use client";

import type { Analyst, HeadCoach } from "@/types/mlbb";
import { PickerDialog } from "./PickerDialog";
import { AnalystCard, CoachCard } from "./StaffCards";

interface BasePickerProps {
  selectedId: string | null;
  onClose: () => void;
}

export function CoachPicker({
  coaches,
  selectedId,
  onSelect,
  onClose,
}: BasePickerProps & { coaches: HeadCoach[]; onSelect: (id: string) => void }) {
  return (
    <PickerDialog
      title="Pilih Head Coach"
      subtitle="Memberi buff pasif ke statistik tim saat simulasi pertandingan."
      onClose={onClose}
    >
      <ul className="grid gap-3 md:grid-cols-2">
        {coaches.map((coach) => {
          const selected = coach.id === selectedId;
          return (
            <li
              key={coach.id}
              className={`flex flex-col gap-3 rounded-sm border bg-ink-800 p-4 ${
                selected ? "border-gold" : "border-line"
              }`}
            >
              <CoachCard coach={coach} />
              <button
                type="button"
                className={selected ? "btn-ghost" : "btn-primary"}
                onClick={() => {
                  onSelect(coach.id);
                  onClose();
                }}
              >
                {selected ? "Sedang dipilih" : `Pilih ${coach.name}`}
              </button>
            </li>
          );
        })}
      </ul>
    </PickerDialog>
  );
}

export function AnalystPicker({
  analysts,
  selectedId,
  onSelect,
  onClose,
}: BasePickerProps & { analysts: Analyst[]; onSelect: (id: string) => void }) {
  return (
    <PickerDialog
      title="Pilih Analyst"
      subtitle="Membuka radar real-time di layar Draft: prediksi pick, saran counter, dan peringatan signature hero."
      onClose={onClose}
    >
      <ul className="grid gap-3 md:grid-cols-2">
        {analysts.map((analyst) => {
          const selected = analyst.id === selectedId;
          return (
            <li
              key={analyst.id}
              className={`flex flex-col gap-3 rounded-sm border bg-ink-800 p-4 ${
                selected ? "border-ice" : "border-line"
              }`}
            >
              <AnalystCard analyst={analyst} />
              <button
                type="button"
                className={selected ? "btn-ghost" : "btn-primary"}
                onClick={() => {
                  onSelect(analyst.id);
                  onClose();
                }}
              >
                {selected ? "Sedang dipilih" : `Pilih ${analyst.name}`}
              </button>
            </li>
          );
        })}
      </ul>
    </PickerDialog>
  );
}
