import { LEAGUE_LABELS } from "@/lib/leagues";
import { RATING_LABELS } from "@/lib/roles";
import type { Analyst, HeadCoach } from "@/types/mlbb";

function Unverified({ status }: { status: "verified" | "unverified" }) {
  if (status === "verified") return null;
  return (
    <span className="rounded-sm bg-blaze/15 px-1.5 text-[11px] text-blaze">Belum terverifikasi</span>
  );
}

export function CoachCard({ coach }: { coach: HeadCoach }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-lg font-bold">{coach.name}</span>
        <Unverified status={coach.status} />
      </div>
      <p className="text-sm text-mute">
        {coach.team}, {LEAGUE_LABELS[coach.league]}
      </p>
      <p className="text-sm text-fog">{coach.philosophy}</p>
      <ul className="flex flex-wrap gap-1.5">
        {coach.buffs.map((buff) => (
          <li
            key={buff.stat}
            className="rounded-sm bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold"
          >
            {RATING_LABELS[buff.stat]} +{buff.bonus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalystCard({ analyst }: { analyst: Analyst }) {
  const { radar } = analyst;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-lg font-bold">{analyst.name}</span>
        <Unverified status={analyst.status} />
      </div>
      <p className="text-sm text-mute">
        {analyst.team}, {LEAGUE_LABELS[analyst.league]}, {analyst.title}
      </p>
      <p className="text-sm text-fog">{analyst.specialty}</p>
      <ul className="grid gap-1 text-xs text-ice sm:grid-cols-2">
        <li>Prediksi pick lawan: akurasi {radar.pick_prediction_accuracy}%</li>
        <li>Saran counter: {radar.counter_suggestions} hero per pick</li>
        <li>
          Peringatan signature hero: {radar.signature_alert ? "aktif" : "tidak tersedia"}
        </li>
        <li>Petunjuk prioritas ban: {radar.ban_priority_hints} per fase</li>
      </ul>
    </div>
  );
}
