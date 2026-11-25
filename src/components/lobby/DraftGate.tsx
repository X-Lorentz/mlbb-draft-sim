"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { emptyLobby, isLobbyReady, loadLobby } from "@/lib/lobbyStorage";
import { LEAGUE_LABELS } from "@/lib/leagues";
import { ROLE_LABELS } from "@/lib/roles";
import { computeTeam } from "@/lib/teamStats";
import { ROLES } from "@/types/mlbb";
import type { LobbyData, LobbyState } from "@/types/mlbb";

/** Gerbang /draft: membaca state lobby dari localStorage. Arena 10-ban dibangun di Fase 2. */
export default function DraftGate({ data }: { data: LobbyData }) {
  const [lobby, setLobby] = useState<LobbyState>(emptyLobby);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLobby(loadLobby(data));
    setLoaded(true);
  }, [data]);

  const view = useMemo(() => {
    const player = (id?: string) => data.players.find((p) => p.id === id);
    const mine = ROLES.map((role) => ({ role, player: player(lobby.roster[role]) }));
    const opponent = data.opponents.find((o) => o.id === lobby.opponentId);
    const coach = data.headCoaches.find((c) => c.id === lobby.headCoachId);
    const analyst = data.analysts.find((a) => a.id === lobby.analystId);
    const theirs = opponent
      ? ROLES.map((role) => ({ role, player: player(opponent.roster[role]) }))
      : [];
    const overall = computeTeam(
      mine.flatMap((m) => (m.player ? [m.player] : [])),
      coach,
    ).overall;
    return { mine, theirs, opponent, coach, analyst, overall };
  }, [data, lobby]);

  if (!loaded) return <p className="text-sm text-mute">Memuat lobby...</p>;

  if (!isLobbyReady(lobby)) {
    return (
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-display text-3xl font-bold">Lobby belum lengkap</h1>
        <p className="text-mute">
          Arena draft butuh 5 pemain, Head Coach, Analyst, dan tim lawan. Lengkapi dulu di lobby.
        </p>
        <Link href="/" className="btn-primary">
          Kembali ke lobby
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold">Arena Draft siap dibuka</h1>
        <p className="max-w-2xl text-mute">
          Lobby tersimpan dan terbaca. Format 3 ban, 3 pick, 2 ban, 2 pick dibangun di Fase 2
          memakai data ini.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="cut-corner border-t-4 border-gold bg-ink-900 p-4">
          <h2 className="font-display text-lg font-bold">Timmu (rating {view.overall})</h2>
          <ul className="mt-3 grid gap-1 text-sm">
            {view.mine.map(({ role, player }) => (
              <li key={role} className="flex justify-between gap-3">
                <span className="text-mute">{ROLE_LABELS[role]}</span>
                <span className="font-semibold">{player?.ign}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-mute">
            Coach {view.coach?.name}, analyst {view.analyst?.name}
          </p>
        </section>

        <section
          className="cut-corner border-t-4 bg-ink-900 p-4"
          style={{ borderTopColor: view.opponent?.color }}
        >
          <h2 className="font-display text-lg font-bold">{view.opponent?.name}</h2>
          <p className="text-xs text-mute">{view.opponent && LEAGUE_LABELS[view.opponent.league]}</p>
          <ul className="mt-3 grid gap-1 text-sm">
            {view.theirs.map(({ role, player }) => (
              <li key={role} className="flex justify-between gap-3">
                <span className="text-mute">{ROLE_LABELS[role]}</span>
                <span className="font-semibold">{player?.ign}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Link href="/" className="btn-ghost self-start">
        Ubah susunan tim
      </Link>
    </div>
  );
}
