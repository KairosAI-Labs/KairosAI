import { Loader2 } from "lucide-react";

export function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2
        className="animate-spin text-primary"
        size={32}
        aria-hidden="true"
      />
      <p className="text-white/60 text-sm">Cargando disponibilidad…</p>
    </div>
  );
}
