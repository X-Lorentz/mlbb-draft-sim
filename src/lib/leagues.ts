import type { League, Region } from "@/types/mlbb";

export const REGION_ORDER: Region[] = ["ID", "PH", "MY", "CN", "EECA", "MENA", "INTL"];

export const REGION_LABELS: Record<Region, string> = {
  ID: "Indonesia",
  PH: "Filipina",
  MY: "Malaysia",
  CN: "China",
  EECA: "EECA",
  MENA: "MENA",
  INTL: "Internasional",
};

export const LEAGUE_ORDER: League[] = [
  "MPL ID",
  "MDL ID",
  "MPL PH",
  "MDL PH",
  "MPL MY",
  "MDL MY",
  "CN",
  "MCC",
  "MPL MENA",
  "INTL",
  "FA",
];

export const LEAGUE_LABELS: Record<League, string> = {
  "MPL ID": "MPL ID",
  "MDL ID": "MDL ID",
  "MPL PH": "MPL PH",
  "MDL PH": "MDL PH",
  "MPL MY": "MPL MY",
  "MDL MY": "MDL MY",
  MCC: "MCC (EECA)",
  "MPL MENA": "MPL MENA",
  CN: "Liga China",
  INTL: "Internasional",
  FA: "Free agent",
};

export interface RegionLeagueValue {
  region: Region | "all";
  league: League | "all";
}

export const ALL_REGIONS: RegionLeagueValue = { region: "all", league: "all" };

interface Located {
  region: Region;
  league: League;
}

export function matchesRegionLeague(item: Located, value: RegionLeagueValue): boolean {
  return (
    (value.region === "all" || item.region === value.region) &&
    (value.league === "all" || item.league === value.league)
  );
}

export function regionsIn(items: Located[]): Region[] {
  const present = new Set(items.map((i) => i.region));
  return REGION_ORDER.filter((r) => present.has(r));
}

export function leaguesIn(items: Located[], region: Region | "all"): League[] {
  const present = new Set(
    items.filter((i) => region === "all" || i.region === region).map((i) => i.league),
  );
  return LEAGUE_ORDER.filter((l) => present.has(l));
}
