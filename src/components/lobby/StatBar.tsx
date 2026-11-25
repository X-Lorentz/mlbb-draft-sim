interface StatBarProps {
  label: string;
  value: number;
  bonus?: number;
}

export function StatBar({ label, value, bonus = 0 }: StatBarProps) {
  const total = Math.min(100, value + bonus);
  return (
    <div className="flex items-center gap-2">
      <span className="w-28 shrink-0 text-[11px] text-mute">{label}</span>
      <div
        className="relative h-1.5 flex-1 overflow-hidden rounded-sm bg-ink-700"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={total}
      >
        <div className="absolute inset-y-0 left-0 bg-ice" style={{ width: `${value}%` }} />
        {bonus > 0 && (
          <div
            className="absolute inset-y-0 bg-gold"
            style={{ left: `${value}%`, width: `${total - value}%` }}
          />
        )}
      </div>
      <span className="w-14 shrink-0 text-right text-xs tabular-nums text-fog">
        {value}
        {bonus > 0 && <span className="text-gold">+{bonus}</span>}
      </span>
    </div>
  );
}
