"use client";

import { useMemo, useState } from "react";
import { useLobbyState } from "@/hooks/useLobbyState";
import { isLobbyReady } from "@/lib/lobbyStorage";
import { computeTeam } from "@/lib/teamStats";
import { ROLES } from "@/types/mlbb";
import type { Analyst, HeadCoach, Hero, LobbyData, Player, Role } from "@/types/mlbb";
import { OpponentPanel } from "./OpponentPanel";
import { PlayerPicker } from "./PlayerPicker";
import { RosterBoard } from "./RosterBoard";
import { AnalystPicker, CoachPicker } from "./StaffPicker";
import { StaffPanel } from "./StaffPanel";
import { SummaryPanel } from "./SummaryPanel";

type PickerTarget = { kind: "player"; role: Role } | { kind: "coach" } | { kind: "analyst" } | null;

function indexById<T extends { id: string }>(list: T[]): Record<string, T> {
  return Object.fromEntries(list.map((item) => [item.id, item]));
}

function SectionTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="text-sm text-mute">{hint}</p>
    </div>
  );
}

export default function TeamBuilder({ data }: { data: LobbyData }) {
  const { lobby, hydrated, setPlayer, setHeadCoach, setAnalyst, setOpponent, autoFill, reset } =
    useLobbyState(data);
  const [picker, setPicker] = useState<PickerTarget>(null);

  const playerMap = useMemo<Record<string, Player>>(() => indexById(data.players), [data.players]);
  const heroMap = useMemo<Record<string, Hero>>(() => indexById(data.heroes), [data.heroes]);
  const coachMap = useMemo<Record<string, HeadCoach>>(
    () => indexById(data.headCoaches),
    [data.headCoaches],
  );
  const analystMap = useMemo<Record<string, Analyst>>(
    () => indexById(data.analysts),
    [data.analysts],
  );

  const rosterPlayers = useMemo(
    () => ROLES.map((role) => lobby.roster[role]).filter((id): id is string => Boolean(id)).map((id) => playerMap[id]),
    [lobby.roster, playerMap],
  );
  const coach = lobby.headCoachId ? coachMap[lobby.headCoachId] : undefined;
  const analyst = lobby.analystId ? analystMap[lobby.analystId] : undefined;
  const opponent = data.opponents.find((o) => o.id === lobby.opponentId);

  const team = useMemo(() => computeTeam(rosterPlayers, coach), [rosterPlayers, coach]);

  const opponentOverall = useMemo(() => {
    const result: Record<string, number> = {};
    for (const opp of data.opponents) {
      const players = ROLES.map((role) => playerMap[opp.roster[role]]).filter(Boolean);
      result[opp.id] = computeTeam(players, opp.head_coach_id ? coachMap[opp.head_coach_id] : undefined).overall;
    }
    return result;
  }, [data.opponents, playerMap, coachMap]);

  const mirrorPlayers = useMemo(() => {
    if (!opponent) return [];
    const theirs = new Set(Object.values(opponent.roster));
    return rosterPlayers.filter((p) => theirs.has(p.id)).map((p) => p.ign);
  }, [opponent, rosterPlayers]);

  const checklist = [
    { label: `Roster ${rosterPlayers.length}/5 pemain`, done: rosterPlayers.length === 5 },
    { label: "Head Coach dipilih", done: Boolean(coach) },
    { label: "Analyst dipilih", done: Boolean(analyst) },
    { label: "Tim lawan dipilih", done: Boolean(opponent) },
  ];
  const ready = hydrated && isLobbyReady(lobby);

  const close = () => setPicker(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex flex-col gap-10">
        <section aria-labelledby="roster-title">
          <div id="roster-title">
            <SectionTitle
              title="Roster"
              hint="Satu pemain per role. Bebas campur pemain dari tim mana pun."
            />
          </div>
          <RosterBoard
            roster={lobby.roster}
            playerMap={playerMap}
            heroMap={heroMap}
            onPick={(role) => setPicker({ kind: "player", role })}
            onClear={(role) => setPlayer(role, null)}
          />
        </section>

        <section aria-labelledby="staff-title">
          <div id="staff-title">
            <SectionTitle
              title="Staf"
              hint="Coach menambah statistik tim. Analyst membuka radar di arena draft."
            />
          </div>
          <StaffPanel
            coach={coach}
            analyst={analyst}
            onPickCoach={() => setPicker({ kind: "coach" })}
            onPickAnalyst={() => setPicker({ kind: "analyst" })}
            onClearCoach={() => setHeadCoach(null)}
            onClearAnalyst={() => setAnalyst(null)}
          />
        </section>

        <section aria-labelledby="opponent-title">
          <div id="opponent-title">
            <SectionTitle
              title="Tim lawan"
              hint="Lintas liga: MPL, MDL, China, dan EECA. Lawan memakai roster dan staf bawaannya, lalu bereaksi pada signature hero rostermu."
            />
          </div>
          <OpponentPanel
            opponents={data.opponents}
            selectedId={lobby.opponentId}
            playerMap={playerMap}
            coachMap={coachMap}
            analystMap={analystMap}
            overallById={opponentOverall}
            onSelect={setOpponent}
          />
        </section>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <SummaryPanel
          team={team}
          opponent={opponent}
          opponentOverall={opponent ? opponentOverall[opponent.id] : undefined}
          checklist={checklist}
          ready={ready}
          mirrorPlayers={mirrorPlayers}
          onAutoFill={autoFill}
          onReset={reset}
        />
      </div>

      {picker?.kind === "player" && (
        <PlayerPicker
          key={picker.role}
          role={picker.role}
          players={data.players}
          heroMap={heroMap}
          selectedId={lobby.roster[picker.role]}
          onSelect={(id) => setPlayer(picker.role, id)}
          onClose={close}
        />
      )}
      {picker?.kind === "coach" && (
        <CoachPicker
          coaches={data.headCoaches}
          selectedId={lobby.headCoachId}
          onSelect={setHeadCoach}
          onClose={close}
        />
      )}
      {picker?.kind === "analyst" && (
        <AnalystPicker
          analysts={data.analysts}
          selectedId={lobby.analystId}
          onSelect={setAnalyst}
          onClose={close}
        />
      )}
    </div>
  );
}
