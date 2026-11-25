import { ROLE_COLORS, ROLE_LABELS } from "@/lib/roles";
import type { Role } from "@/types/mlbb";

export function RoleBadge({ role }: { role: Role }) {
  const color = ROLE_COLORS[role];
  return (
    <span
      className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold"
      style={{ color, backgroundColor: `${color}22` }}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}
