import DraftGate from "@/components/lobby/DraftGate";
import { getLobbyData } from "@/lib/data";

export const metadata = { title: "Arena Draft | MLBB Pro Draft & Esports Simulator" };

export default function DraftPage() {
  const data = getLobbyData();
  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
      <DraftGate data={data} />
    </div>
  );
}
