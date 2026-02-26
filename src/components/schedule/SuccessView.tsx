import { CheckCircle2 } from "lucide-react";
import { ButtonGlass } from "@/components/ui/ButtonGlass";
import { formatDate } from "@/lib/utils";

interface SuccessViewProps {
  date: Date | undefined;
  time: string;
  onClose: () => void;
}

export function SuccessView({ date, time, onClose }: SuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
      <CheckCircle2
        size={48}
        className="text-[#8656ec]"
        aria-hidden="true"
      />
      <h3 className="text-lg font-medium text-white">¡Reunión creada!</h3>
      <p className="text-white/60 text-sm max-w-xs">
        Tu cita ha sido creada para el{" "}
        <span className="text-white font-medium">
          {date ? formatDate(date) : ""}
        </span>{" "}
        a las{" "}
        <span className="text-white font-medium">{time}</span>.
        <br />
        <br />
        Favor de revisar tu correo electrónico para confirmar la reunión y
        asegurar tu lugar.
      </p>
      <ButtonGlass
        variant="textIcon"
        onClick={onClose}
        className="mt-2"
      >
        Cerrar
      </ButtonGlass>
    </div>
  );
}
