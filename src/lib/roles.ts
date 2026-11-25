import type { Role, RatingKey } from "@/types/mlbb";

export const ROLE_COLORS: Record<Role, string> = {
  EXP: "#FF8A3D",
  Jungler: "#A78BFA",
  Mid: "#4DD8F0",
  Gold: "#F5B942",
  Roam: "#34D399",
};

export const ROLE_LABELS: Record<Role, string> = {
  EXP: "EXP Lane",
  Jungler: "Jungler",
  Mid: "Mid Lane",
  Gold: "Gold Lane",
  Roam: "Roamer",
};

export const RATING_LABELS: Record<RatingKey, string> = {
  aggression: "Agresi",
  objective_control: "Kontrol objektif",
  teamfight: "Teamfight",
  early_game: "Early game",
  late_game: "Late game",
};

export const SPIKE_LABELS = {
  early: "Early",
  mid: "Mid",
  late: "Late",
} as const;
