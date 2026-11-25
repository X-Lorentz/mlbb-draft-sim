import { RATING_KEYS } from "@/types/mlbb";
import type { HeadCoach, Player, PlaystyleRatings } from "@/types/mlbb";

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function emptyRatings(): PlaystyleRatings {
  return {
    aggression: 0,
    objective_control: 0,
    teamfight: 0,
    early_game: 0,
    late_game: 0,
  };
}

export function averageRatings(players: Player[]): PlaystyleRatings {
  const result = emptyRatings();
  if (players.length === 0) return result;
  for (const key of RATING_KEYS) {
    const sum = players.reduce((acc, p) => acc + p.ratings[key], 0);
    result[key] = Math.round(sum / players.length);
  }
  return result;
}

/** Bonus Head Coach per statistik (sebelum pembatasan 100). */
export function coachBonuses(coach: HeadCoach | undefined): PlaystyleRatings {
  const result = emptyRatings();
  if (!coach) return result;
  for (const buff of coach.buffs) result[buff.stat] += buff.bonus;
  return result;
}

export function overallRating(ratings: PlaystyleRatings): number {
  const total = RATING_KEYS.reduce((acc, key) => acc + ratings[key], 0);
  return Math.round(total / RATING_KEYS.length);
}

export interface TeamSnapshot {
  base: PlaystyleRatings;
  bonus: PlaystyleRatings;
  final: PlaystyleRatings;
  overall: number;
}

export function computeTeam(players: Player[], coach?: HeadCoach): TeamSnapshot {
  const base = averageRatings(players);
  const rawBonus = coachBonuses(coach);
  const bonus = emptyRatings();
  const final = emptyRatings();
  for (const key of RATING_KEYS) {
    final[key] = players.length === 0 ? 0 : clamp(base[key] + rawBonus[key]);
    bonus[key] = players.length === 0 ? 0 : final[key] - base[key];
  }
  return { base, bonus, final, overall: overallRating(final) };
}

export function playerOverall(player: Player): number {
  return overallRating(player.ratings);
}
