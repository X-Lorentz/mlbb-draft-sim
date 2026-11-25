"use client";

import { useMemo } from "react";
import {
  LEAGUE_LABELS,
  REGION_LABELS,
  leaguesIn,
  regionsIn,
  type RegionLeagueValue,
} from "@/lib/leagues";
import type { League, Region } from "@/types/mlbb";

interface RegionLeagueFilterProps {
  /** Daftar item sebelum difilter, dipakai untuk menampilkan hanya opsi yang ada datanya. */
  items: { region: Region; league: League }[];
  value: RegionLeagueValue;
  onChange: (value: RegionLeagueValue) => void;
  label: string;
}

export function RegionLeagueFilter({ items, value, onChange, label }: RegionLeagueFilterProps) {
  const regions = useMemo(() => regionsIn(items), [items]);
  const leagues = useMemo(() => leaguesIn(items, value.region), [items, value.region]);

  const countFor = (region: Region | "all") =>
    items.filter((i) => region === "all" || i.region === region).length;

  const tab = (active: boolean) =>
    `rounded-sm border px-3 py-1.5 text-sm font-semibold transition-colors ${
      active
        ? "border-gold bg-gold text-ink-950"
        : "border-line text-mute hover:border-mute hover:text-fog"
    }`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label={`Region ${label}`} className="flex flex-wrap gap-1.5">
        <button
          type="button"
          aria-pressed={value.region === "all"}
          className={tab(value.region === "all")}
          onClick={() => onChange({ region: "all", league: "all" })}
        >
          Semua ({countFor("all")})
        </button>
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            aria-pressed={value.region === region}
            className={tab(value.region === region)}
            onClick={() => onChange({ region, league: "all" })}
          >
            {REGION_LABELS[region]} ({countFor(region)})
          </button>
        ))}
      </div>

      <select
        aria-label={`Liga ${label}`}
        value={value.league}
        onChange={(e) => onChange({ ...value, league: e.target.value as League | "all" })}
        className="rounded-sm border border-line bg-ink-800 px-3 py-2 text-sm text-fog"
      >
        <option value="all">Semua liga</option>
        {leagues.map((league) => (
          <option key={league} value={league}>
            {LEAGUE_LABELS[league]}
          </option>
        ))}
      </select>
    </div>
  );
}
