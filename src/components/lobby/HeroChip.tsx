import { ROLE_COLORS } from "@/lib/roles";
import type { Hero } from "@/types/mlbb";

export function HeroChip({ hero }: { hero: Hero }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-ink-800 px-2 py-0.5 text-xs text-fog"
      title={`${hero.name}: tier ${hero.tier}, power spike ${hero.power_spike}`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: ROLE_COLORS[hero.role] }}
      />
      {hero.name}
      <span className="text-mute">{hero.tier}</span>
    </span>
  );
}
