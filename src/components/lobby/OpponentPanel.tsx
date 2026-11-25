"use client";

import { useMemo, useState } from "react";
import {
  ALL_REGIONS,
  LEAGUE_LABELS,
  matchesRegionLeague,
  type RegionLeagueValue,
} from "@/lib/leagues";
import { ROLE_LABELS } from "@/lib/roles";
import { ROLES } from "@/types/mlbb";
import type { Analyst, HeadCoach, OpponentTeam, Player } from "@/types/mlbb";
import { RegionLeagueFilter } from "./RegionLeagueFilter";

interface OpponentPanelProps {
  opponents: OpponentTeam[];
  selectedId: string | null;
  playerMap: Record<string, Player>;
  coachMap: Record<string, HeadCoach>;
  analystMap: Record<string, Analyst>;
  overallById: Record<string, number>;
  onSelect: (id: string) => void;
}

export function OpponentPanel({
  opponents,
  selectedId,
  playerMap,
  coachMap,
  analystMap,
  overallById,
  onSelect,
}: OpponentPanelProps) {
  const [location, setLocation] = useState<RegionLeagueValue>(ALL_REGIONS);
  const visible = useMemo(
    () => opponents.filter((o) => matchesRegionLeague(o, location)),
    [opponents, location],
  );

  return (
    <div className="flex flex-col gap-4">
      <RegionLeagueFilter
        items={opponents}
        value={location}
        onChange={setLocation}
        label="tim lawan"
      />

      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-mute">
          Tidak ada tim lawan di filter ini. Pilih Semua atau region lain.
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((team) => {
            const selected = team.id === selectedId;
            const coach = team.head_coach_id ? coachMap[team.head_coach_id] : undefined;
            const analyst = team.analyst_id ? analystMap[team.analyst_id] : undefined;
            return (
              <li key={team.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(team.id)}
                  className={`cut-corner flex h-full w-full flex-col gap-3 border-t-4 p-4 text-left transition-colors ${
                    selected ? "bg-ink-700" : "bg-ink-900 hover:bg-ink-800"
                  }`}
                  style={{ borderTopColor: team.color }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-display text-lg font-bold">{team.name}</div>
                      <span className="mt-0.5 inline-block rounded-sm border border-line px-1.5 text-[11px] text-mute">
                        {LEAGUE_LABELS[team.league]}
                      </span>
                      <p className="mt-1 text-sm text-mute">{team.tagline}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className="font-display text-2xl font-bold tabular-nums"
                        style={{ color: team.color }}
                      >
                        {overallById[team.id] ?? 0}
                      </div>
                      <div className="text-[11px] text-mute">rating tim</div>
                    </div>
                  </div>

                  <dl className="grid grid-cols-[5.5rem_1fr] gap-x-2 gap-y-1 text-sm">
                    {ROLES.map((role) => (
                      <div key={role} className="contents">
                        <dt className="text-mute">{ROLE_LABELS[role]}</dt>
                        <dd className="font-semibold text-fog">
                          {playerMap[team.roster[role]]?.ign ?? "-"}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="text-xs text-mute">
                    {coach ? `Coach ${coach.name}` : "Tanpa coach terverifikasi"},{" "}
                    {analyst ? `analyst ${analyst.name}` : "tanpa analyst"}
                  </p>

                  <span
                    className={`mt-auto text-sm font-semibold ${
                      selected ? "text-gold" : "text-mute"
                    }`}
                  >
                    {selected ? "Lawan terpilih" : "Pilih sebagai lawan"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
