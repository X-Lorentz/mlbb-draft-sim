"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface PickerDialogProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

/** Dialog modal native: Escape, focus trap, dan inert background ditangani browser. */
export function PickerDialog({ title, subtitle, onClose, children }: PickerDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="m-auto max-h-[88vh] w-[min(980px,94vw)] overflow-hidden rounded-sm border border-line bg-ink-900 p-0 text-fog backdrop:bg-black/75"
    >
      <div className="flex max-h-[88vh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-mute">{subtitle}</p>}
          </div>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Tutup
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </dialog>
  );
}
