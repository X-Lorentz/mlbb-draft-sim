"use client";

import { ROLE_COLORS, ROLE_LABELS } from "@/lib/roles";
import { ROLES } from "@/types/mlbb";
import type { Hero, Player, Role, RosterSelection } from "@/types/mlbb";
import { PlayerCard } from "./PlayerCard";

interface RosterBoardProps {
  roster: RosterSelection;
  playerMap: Record<string, Player>;
  heroMap: Record<string, Hero>;
  onPick: (role: Role) => void;
  onClear: (role: Role) => void;
}

export function RosterBoard({ roster, playerMap, heroMap, onPick, onClear }: RosterBoardProps) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {ROLES.map((role) => {
        const player = roster[role] ? playerMap[roster[role]!] : undefined;
        return (
          <li
            key={role}
            className="cut-corner flex flex-col gap-3 border-l-4 bg-ink-900 p-4"
            style={{ borderLeftColor: ROLE_COLORS[role] }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold" style={{ color: ROLE_COLORS[role] }}>
                {ROLE_LABELS[role]}
              </h3>
              {player && (
                <button
                  type="button"
                  className="text-xs text-mute underline underline-offset-2 hover:text-fog"
                  onClick={() => onClear(role)}
                >
                  Lepas
                </button>
              )}
            </div>

            {player ? (
              <>
                <PlayerCard player={player} heroMap={heroMap} />
                <button type="button" className="btn-ghost" onClick={() => onPick(role)}>
                  Ganti pemain
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => onPick(role)}
                className="flex min-h-[9rem] flex-1 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-line text-sm text-mute transition-colors hover:border-gold hover:text-fog"
              >
                <span className="font-semibold text-fog">Pilih {ROLE_LABELS[role]}</span>
                <span>Slot masih kosong</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
