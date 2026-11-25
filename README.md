# MLBB Pro Draft & Esports Simulator

Fase 1: pondasi data dan lobby Team & Staff Builder (Next.js App Router, TypeScript, Tailwind CSS).

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

Deploy: push ke GitHub, impor repo di Vercel. Fase 1 tidak butuh environment variable.

## Struktur

- `src/types/mlbb.ts` skema TypeScript (Player, Hero, HeadCoach, Analyst, OpponentTeam, LobbyState)
- `src/data/*.json` data awal (`players`, `staff`, `heroes`, `opponents`), tiap file punya `meta` atribusi
- `src/lib/data.ts` pembaca data (dipanggil dari Server Component)
- `src/lib/teamStats.ts` hitung rating tim dan buff coach
- `src/lib/lobbyStorage.ts` simpan/baca lobby di localStorage (`mlbb-sim:lobby:v1`), dibaca `/draft`
- `src/components/lobby/*` Client Component lobby

## Catatan data

- Tim dan role pemain berstatus `verified` dicek ke pemberitaan roster MPL ID Season 18.
- Rating playstyle (1-100), `signature_heroes`, tier/power spike hero, dan efek staf adalah estimasi desain.
- `region` = region liga saat ini, `league` = liga (MPL ID, MDL ID, MPL PH, MPL MY, CN, MCC, FA), `nationality` = asal bila berbeda (pemain impor).
- Cakupan: MPL ID, MDL ID (Bigetron Academy, Team Liquid Academy ID), MPL PH, MPL MY (Selangor Red Giants), China (DianFengYaoGuai), dan EECA (Team Spirit). MENA belum punya data terverifikasi.
- Savero dan Kingkong terverifikasi di ONIC PH. Alex adalah free agent (`league: "FA"`).
- Honjaw, Facehugger, dan Alex bertanda `unverified`. Opponent dengan `head_coach_id: null` berarti coach belum terverifikasi.
- Data turunan Liquipedia wajib mempertahankan atribusi CC-BY-SA 3.0 (lihat `meta.attribution`).
