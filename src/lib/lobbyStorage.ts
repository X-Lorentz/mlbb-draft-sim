import { ROLES } from "@/types/mlbb";
import type { LobbyData, LobbyState, RosterSelection } from "@/types/mlbb";

export const LOBBY_STORAGE_KEY = "mlbb-sim:lobby:v1";

export function emptyLobby(): LobbyState {
  return {
    version: 1,
    roster: {},
    headCoachId: null,
    analystId: null,
    opponentId: null,
    updatedAt: new Date(0).toISOString(),
  };
}

/** Membuang ID yang sudah tidak ada di data (mis. setelah auto-update) agar state tetap valid. */
export function sanitizeLobby(raw: unknown, data: LobbyData): LobbyState {
  const fallback = emptyLobby();
  if (typeof raw !== "object" || raw === null) return fallback;
  const input = raw as Partial<LobbyState>;
  if (input.version !== 1) return fallback;

  const roster: RosterSelection = {};
  for (const role of ROLES) {
    const id = input.roster?.[role];
    const player = data.players.find((p) => p.id === id);
    if (player && player.role === role) roster[role] = player.id;
  }

  const pick = <T extends { id: string }>(list: T[], id: unknown): string | null =>
    typeof id === "string" && list.some((item) => item.id === id) ? id : null;

  return {
    version: 1,
    roster,
    headCoachId: pick(data.headCoaches, input.headCoachId),
    analystId: pick(data.analysts, input.analystId),
    opponentId: pick(data.opponents, input.opponentId),
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : fallback.updatedAt,
  };
}

export function loadLobby(data: LobbyData): LobbyState {
  if (typeof window === "undefined") return emptyLobby();
  try {
    const text = window.localStorage.getItem(LOBBY_STORAGE_KEY);
    return text ? sanitizeLobby(JSON.parse(text), data) : emptyLobby();
  } catch {
    return emptyLobby();
  }
}

export function saveLobby(state: LobbyState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOBBY_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Penyimpanan penuh atau diblokir: lobby tetap berjalan di memori. */
  }
}

export function isLobbyReady(state: LobbyState): boolean {
  return (
    ROLES.every((role) => Boolean(state.roster[role])) &&
    Boolean(state.headCoachId) &&
    Boolean(state.analystId) &&
    Boolean(state.opponentId)
  );
}
