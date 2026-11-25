"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyLobby, loadLobby, saveLobby } from "@/lib/lobbyStorage";
import { playerOverall } from "@/lib/teamStats";
import { ROLES } from "@/types/mlbb";
import type { LobbyData, LobbyState, Role } from "@/types/mlbb";

export function useLobbyState(data: LobbyData) {
  const [lobby, setLobby] = useState<LobbyState>(emptyLobby);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLobby(loadLobby(data));
    setHydrated(true);
  }, [data]);

  useEffect(() => {
    if (hydrated) saveLobby(lobby);
  }, [lobby, hydrated]);

  const update = useCallback((patch: (prev: LobbyState) => Partial<LobbyState>) => {
    setLobby((prev) => ({ ...prev, ...patch(prev), updatedAt: new Date().toISOString() }));
  }, []);

  const setPlayer = useCallback(
    (role: Role, playerId: string | null) =>
      update((prev) => {
        const roster = { ...prev.roster };
        if (playerId) roster[role] = playerId;
        else delete roster[role];
        return { roster };
      }),
    [update],
  );

  const setHeadCoach = useCallback(
    (id: string | null) => update(() => ({ headCoachId: id })),
    [update],
  );
  const setAnalyst = useCallback(
    (id: string | null) => update(() => ({ analystId: id })),
    [update],
  );
  const setOpponent = useCallback(
    (id: string | null) => update(() => ({ opponentId: id })),
    [update],
  );

  const autoFill = useCallback(() => {
    update(() => {
      const roster: LobbyState["roster"] = {};
      for (const role of ROLES) {
        const best = data.players
          .filter((p) => p.role === role && p.status === "verified")
          .sort((a, b) => playerOverall(b) - playerOverall(a))[0];
        if (best) roster[role] = best.id;
      }
      return { roster };
    });
  }, [data.players, update]);

  const reset = useCallback(() => {
    setLobby({ ...emptyLobby(), updatedAt: new Date().toISOString() });
  }, []);

  return { lobby, hydrated, setPlayer, setHeadCoach, setAnalyst, setOpponent, autoFill, reset };
}
