import { LEAGUE_LABELS, REGION_LABELS } from "@/lib/leagues";
import { RATING_LABELS } from "@/lib/roles";
import { playerOverall } from "@/lib/teamStats";
import { RATING_KEYS } from "@/types/mlbb";
import type { Hero, Player } from "@/types/mlbb";
import { HeroChip } from "./HeroChip";
import { StatBar } from "./StatBar";

interface PlayerCardProps {
  player: Player;
  heroMap: Record<string, Hero>;
  showStats?: boolean;
}

export function PlayerCard({ player, heroMap, showStats = true }: PlayerCardProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-xl font-bold text-fog">{player.ign}</span>
            <span
              className={`rounded-sm border px-1.5 text-[11px] ${
                player.league === "FA" ? "border-ice text-ice" : "border-line text-mute"
              }`}
            >
              {LEAGUE_LABELS[player.league]}
            </span>
            {player.status === "unverified" && (
              <span
                className="rounded-sm bg-blaze/15 px-1.5 text-[11px] text-blaze"
                title="Tim atau role pemain ini belum bisa dikonfirmasi ke sumber terbaru."
              >
                Belum terverifikasi
              </span>
            )}
          </div>
          <p className="truncate text-sm text-mute">{player.team}</p>
          {player.realName && <p className="truncate text-xs text-mute">{player.realName}</p>}
          {player.nationality && player.nationality !== player.region && (
            <p className="text-xs text-mute">Asal {REGION_LABELS[player.nationality]}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-bold tabular-nums text-gold">
            {playerOverall(player)}
          </div>
          <div className="text-[11px] text-mute">rating</div>
        </div>
      </div>

      {showStats && (
        <div className="grid gap-1.5">
          {RATING_KEYS.map((key) => (
            <StatBar key={key} label={RATING_LABELS[key]} value={player.ratings[key]} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {player.signature_heroes.map((id) =>
          heroMap[id] ? <HeroChip key={id} hero={heroMap[id]} /> : null,
        )}
      </div>
    </div>
  );
}
