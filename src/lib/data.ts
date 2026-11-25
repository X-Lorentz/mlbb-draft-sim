import heroesFile from "@/data/heroes.json";
import opponentsFile from "@/data/opponents.json";
import playersFile from "@/data/players.json";
import staffFile from "@/data/staff.json";
import type {
  DataFile,
  Hero,
  LobbyData,
  OpponentTeam,
  Player,
  StaffFile,
} from "@/types/mlbb";

/** Dipanggil dari Server Component. Fase berikutnya menaruh logika yang butuh API key di sisi server juga. */
export function getLobbyData(): LobbyData {
  const players = playersFile as unknown as DataFile<Player>;
  const heroes = heroesFile as unknown as DataFile<Hero>;
  const opponents = opponentsFile as unknown as DataFile<OpponentTeam>;
  const staff = staffFile as unknown as StaffFile;

  return {
    players: players.items,
    heroes: heroes.items,
    opponents: opponents.items,
    headCoaches: staff.head_coaches,
    analysts: staff.analysts,
    attributions: [players.meta, staff.meta, opponents.meta, heroes.meta],
  };
}
