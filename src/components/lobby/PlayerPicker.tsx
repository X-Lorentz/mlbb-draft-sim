"use client";

import { useMemo, useState } from "react";
import { ALL_REGIONS, matchesRegionLeague, type RegionLeagueValue } from "@/lib/leagues";
import { ROLE_LABELS } from "@/lib/roles";
import { playerOverall } from "@/lib/teamStats";
import type { Hero, Player, Role } from "@/types/mlbb";
import { PickerDialog } from "./PickerDialog";
import { PlayerCard } from "./PlayerCard";
import { RegionLeagueFilter } from "./RegionLeagueFilter";

interface PlayerPickerProps {
  role: Role;
  players: Player[];
  heroMap: Record<string, Hero>;
  selectedId?: string;
  onSelect: (playerId: string) => void;
  onClose: () => void;
}

export function PlayerPicker({
  role,
  players,
  heroMap,
  selectedId,
  onSelect,
  onClose,
}: PlayerPickerProps) {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("all");
  const [location, setLocation] = useState<RegionLeagueValue>(ALL_REGIONS);

  const pool = useMemo(() => players.filter((p) => p.role === role), [players, role]);

  const inLocation = useMemo(
    () => pool.filter((p) => matchesRegionLeague(p, location)),
    [pool, location],
  );
  const teams = useMemo(
    () => Array.from(new Set(inLocation.map((p) => p.team))).sort((a, b) => a.localeCompare(b)),
    [inLocation],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inLocation
      .filter((p) => (team === "all" || p.team === team) && (!q || p.ign.toLowerCase().includes(q)))
      .sort((a, b) => playerOverall(b) - playerOverall(a));
  }, [inLocation, query, team]);

  const handleLocation = (next: RegionLeagueValue) => {
    setLocation(next);
    setTeam("all");
  };

  return (
    <PickerDialog
      title={`Pilih ${ROLE_LABELS[role]}`}
      subtitle={`${pool.length} pemain tersedia dari berbagai liga. Bebas lintas tim, tanpa batas budget.`}
      onClose={onClose}
    >
      <div className="mb-4 flex flex-col gap-3">
        <RegionLeagueFilter
          items={pool}
          value={location}
          onChange={handleLocation}
          label="pemain"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama pemain"
            aria-label="Cari nama pemain"
            className="w-full rounded-sm border border-line bg-ink-800 px-3 py-2 text-sm text-fog placeholder:text-mute sm:max-w-xs"
          />
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            aria-label="Filter tim"
            className="rounded-sm border border-line bg-ink-800 px-3 py-2 text-sm text-fog"
          >
            <option value="all">Semua tim</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-mute">
          Tidak ada pemain yang cocok. Ubah region, liga, atau kata kunci.
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {visible.map((player) => {
            const selected = player.id === selectedId;
            return (
              <li
                key={player.id}
                className={`flex flex-col gap-3 rounded-sm border bg-ink-800 p-4 ${
                  selected ? "border-gold" : "border-line"
                }`}
              >
                <PlayerCard player={player} heroMap={heroMap} />
                <button
                  type="button"
                  className={selected ? "btn-ghost" : "btn-primary"}
                  onClick={() => {
                    onSelect(player.id);
                    onClose();
                  }}
                >
                  {selected ? "Sedang dipilih" : `Pilih ${player.ign}`}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </PickerDialog>
  );
}
