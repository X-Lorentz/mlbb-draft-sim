import TeamBuilder from "@/components/lobby/TeamBuilder";
import { getLobbyData } from "@/lib/data";

export default function HomePage() {
  // Server Component: data JSON dibaca di server dan dikirim sebagai props ke Client Component.
  const data = getLobbyData();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6">
      <header className="mb-8 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gold">MLBB Pro Draft &amp; Esports Simulator</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Susun tim, pilih lawan, masuk draft.
          </h1>
        </div>
        <p className="max-w-sm text-sm text-mute">
          Pilih lima pemain lintas tim, satu Head Coach, dan satu Analyst. Pilihanmu otomatis
          tersimpan untuk arena draft.
        </p>
      </header>

      <main className="flex-1">
        <TeamBuilder data={data} />
      </main>

      <footer className="mt-12 border-t border-line pt-5 text-xs leading-relaxed text-mute">
        <p>
          Data roster dan staf mengacu pada pemberitaan MPL ID Season 18 dan Liquipedia (
          <a
            className="text-ice underline underline-offset-2"
            href="https://liquipedia.net/mobilelegends"
            target="_blank"
            rel="noreferrer"
          >
            liquipedia.net/mobilelegends
          </a>
          ), dilisensikan CC-BY-SA 3.0. Rating playstyle, signature hero, dan efek staf adalah
          estimasi desain game, bukan statistik resmi. Proyek penggemar, tidak berafiliasi dengan
          Moonton.
        </p>
      </footer>
    </div>
  );
}
