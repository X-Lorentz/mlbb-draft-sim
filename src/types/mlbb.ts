/** Skema inti MLBB Pro Draft & Esports Simulator (Fase 1). */

export const ROLES = ["EXP", "Jungler", "Mid", "Gold", "Roam"] as const;
export type Role = (typeof ROLES)[number];

export const RATING_KEYS = [
  "aggression",
  "objective_control",
  "teamfight",
  "early_game",
  "late_game",
] as const;
export type RatingKey = (typeof RATING_KEYS)[number];
export type PlaystyleRatings = Record<RatingKey, number>;

/** MPL = liga utama, MDL = liga pengembangan, PRO = sirkuit profesional lain (CN, MCC, dll). */
export type CompetitionTier = "MPL" | "MDL" | "PRO";

/** Region kompetitif tempat liga berlangsung (bukan kewarganegaraan). */
export type Region = "ID" | "PH" | "MY" | "CN" | "EECA" | "MENA" | "INTL";

/** Liga tempat pemain/staf/tim bertanding saat ini. "FA" = free agent. */
export type League =
  | "MPL ID"
  | "MDL ID"
  | "MPL PH"
  | "MDL PH"
  | "MPL MY"
  | "MDL MY"
  | "MCC"
  | "MPL MENA"
  | "CN"
  | "INTL"
  | "FA";
export type VerificationStatus = "verified" | "unverified";

/** Metadata atribusi. Wajib dipertahankan oleh GitHub Actions (Liquipedia CC-BY-SA). */
export interface DataMeta {
  source: string;
  license: string;
  attribution: string;
  updatedAt: string;
  notes?: string;
}

export interface DataFile<T> {
  meta: DataMeta;
  items: T[];
}

export interface Player {
  id: string;
  ign: string;
  realName?: string;
  role: Role;
  teamId: string;
  team: string;
  region: Region;
  league: League;
  /** Kewarganegaraan bila berbeda dari region liga (mis. pemain impor). */
  nationality?: Region;
  tier: CompetitionTier;
  /** Skala 1-100. */
  ratings: PlaystyleRatings;
  /** ID hero dari heroes.json. */
  signature_heroes: string[];
  status: VerificationStatus;
}

export type HeroTier = "S" | "A" | "B";
export type PowerSpike = "early" | "mid" | "late";

export interface Hero {
  id: string;
  name: string;
  role: Role;
  tier: HeroTier;
  power_spike: PowerSpike;
  /** Hero yang ditekan oleh hero ini. */
  strong_against: string[];
  /** Hero yang menjadi counter hero ini. */
  countered_by: string[];
}

export interface StatBuff {
  stat: RatingKey;
  bonus: number;
}

export interface HeadCoach {
  id: string;
  name: string;
  realName?: string;
  teamId: string;
  team: string;
  region: Region;
  league: League;
  title: string;
  philosophy: string;
  buffs: StatBuff[];
  status: VerificationStatus;
}

/** Kemampuan radar yang dibuka Analyst di layar Draft (Fase 2). */
export interface AnalystRadar {
  /** Akurasi prediksi pick lawan, 0-100. */
  pick_prediction_accuracy: number;
  /** Jumlah saran counter hero per pick lawan. */
  counter_suggestions: number;
  /** Peringatan saat lawan memiliki signature hero yang masih terbuka. */
  signature_alert: boolean;
  /** Jumlah petunjuk prioritas ban per fase. */
  ban_priority_hints: number;
}

export interface Analyst {
  id: string;
  name: string;
  teamId: string;
  team: string;
  region: Region;
  league: League;
  title: string;
  specialty: string;
  radar: AnalystRadar;
  status: VerificationStatus;
}

export interface StaffFile {
  meta: DataMeta;
  head_coaches: HeadCoach[];
  analysts: Analyst[];
}

export interface OpponentTeam {
  id: string;
  name: string;
  tag: string;
  tagline: string;
  color: string;
  region: Region;
  league: League;
  roster: Record<Role, string>;
  /** null bila coach tim ini belum terverifikasi. */
  head_coach_id: string | null;
  /** null bila tim ini tidak punya analyst terverifikasi. */
  analyst_id: string | null;
}

export type RosterSelection = Partial<Record<Role, string>>;

/** State lobby yang disimpan di localStorage dan dibaca halaman /draft. */
export interface LobbyState {
  version: 1;
  roster: RosterSelection;
  headCoachId: string | null;
  analystId: string | null;
  opponentId: string | null;
  updatedAt: string;
}

export interface LobbyData {
  players: Player[];
  headCoaches: HeadCoach[];
  analysts: Analyst[];
  heroes: Hero[];
  opponents: OpponentTeam[];
  attributions: DataMeta[];
}
