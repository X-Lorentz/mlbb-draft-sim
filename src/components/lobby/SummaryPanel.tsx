"use client";

import Link from "next/link";
import { RATING_LABELS } from "@/lib/roles";
import type { TeamSnapshot } from "@/lib/teamStats";
import { RATING_KEYS } from "@/types/mlbb";
import type { OpponentTeam } from "@/types/mlbb";
import { StatBar } from "./StatBar";

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface SummaryPanelProps {
  team: TeamSnapshot;
  opponent?: OpponentTeam;
  opponentOverall?: number;
  checklist: ChecklistItem[];
  ready: boolean;
  mirrorPlayers: string[];
  onAutoFill: () => void;
  onReset: () => void;
}

export function SummaryPanel({
  team,
  opponent,
  opponentOverall,
  checklist,
  ready,
  mirrorPlayers,
  onAutoFill,
  onReset,
}: SummaryPanelProps) {
  const diff = opponentOverall === undefined ? null : team.overall - opponentOverall;

  return (
    <aside className="cut-corner flex flex-col gap-5 border border-line bg-ink-900 p-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-lg font-bold">Ringkasan tim</h2>
          <p className="text-xs text-mute">Rata-rata roster ditambah buff coach</p>
        </div>
        <div className="font-display text-4xl font-bold tabular-nums text-gold">
          {team.overall}
        </div>
      </div>

      <div className="grid gap-2">
        {RATING_KEYS.map((key) => (
          <StatBar
            key={key}
            label={RATING_LABELS[key]}
            value={team.base[key]}
            bonus={team.bonus[key]}
          />
        ))}
      </div>

      {opponent && opponentOverall !== undefined && diff !== null && (
        <div className="rounded-sm border border-line bg-ink-800 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-mute">Lawan: {opponent.name}</span>
            <span className="font-display font-bold tabular-nums" style={{ color: opponent.color }}>
              {opponentOverall}
            </span>
          </div>
          <p className="mt-1 text-xs text-mute">
            {diff > 0 && `Timmu unggul ${diff} poin rating.`}
            {diff < 0 && `Timmu tertinggal ${Math.abs(diff)} poin rating.`}
            {diff === 0 && "Rating kedua tim seimbang."}
          </p>
        </div>
      )}

      {mirrorPlayers.length > 0 && (
        <p className="rounded-sm border border-gold/40 bg-gold/10 p-3 text-xs text-gold">
          {mirrorPlayers.join(", ")} juga ada di roster lawan. Tetap boleh, jadi satu pemain
          bermain di kedua sisi.
        </p>
      )}

      <ul className="grid gap-1.5 text-sm">
        {checklist.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                item.done ? "bg-gold text-ink-950" : "border border-line text-transparent"
              }`}
            >
              ✓
            </span>
            <span className={item.done ? "text-fog" : "text-mute"}>
              {item.label}
              <span className="sr-only">{item.done ? " (selesai)" : " (belum)"}</span>
            </span>
          </li>
        ))}
      </ul>

      {ready ? (
        <Link href="/draft" className="btn-primary w-full py-3 text-base">
          Masuk Arena Draft
        </Link>
      ) : (
        <button type="button" disabled className="btn-primary w-full py-3 text-base">
          Lengkapi tim dulu
        </button>
      )}

      <div className="flex gap-2">
        <button type="button" className="btn-ghost flex-1" onClick={onAutoFill}>
          Isi roster terbaik
        </button>
        <button type="button" className="btn-ghost flex-1" onClick={onReset}>
          Reset lobby
        </button>
      </div>
    </aside>
  );
}
