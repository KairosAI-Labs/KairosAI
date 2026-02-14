import { useMemo, useState, useEffect } from "react";
import { CalendarIcon, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonGlass } from "@/components/ui/ButtonGlass";
import { MOCK_AVAILABILITY, type AvailabilityData } from "@/constants/TimeMeeting";
import { formatDate, getBrowserLocale } from "@/lib/utils";
import { isSameDay } from "date-fns";


// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export function ScheduleMeeting() {
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityData>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const locale = useMemo(() => getBrowserLocale(), []);

  // Cargar disponibilidad al abrir el modal
  useEffect(() => {
    if (isOpen && availability.length === 0) {
      fetchAvailability();
    }
  }, [isOpen]);

  // Resetear selección de hora cuando cambia la fecha
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  async function fetchAvailability() {
    setLoading(true);
    try {
      // TODO: Reemplazar con llamada real al webhook de Google Calendar
      // Estructura esperada del webhook:
      // [{ date: "2026-02-16", slots: ["09:00", "10:00"] }, ...]
      // const res = await fetch(WEBHOOK_URL);
      // const raw = await res.json();
      // const data = raw.map((item: { date: string; slots: string[] }) => ({
      //   date: new Date(item.date),
      //   slots: item.slots,
      // }));
      // setAvailability(data);

      // Simulación de latencia de red con datos de prueba
      await new Promise((r) => setTimeout(r, 600));
      setAvailability(MOCK_AVAILABILITY);
    } finally {
      setLoading(false);
    }
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleConfirm() {
    if (!selectedDate || !selectedTime || !isEmailValid) return;
    setSubmitting(true);
    try {
      // TODO: POST al webhook de confirmación
      // await fetch(WEBHOOK_CONFIRM_URL, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     date: selectedDate.toISOString().split("T")[0],
      //     time: selectedTime,
      //     email,
      //   }),
      // });

      // Simulación de envío
      await new Promise((r) => setTimeout(r, 800));
      setConfirmed(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      // Resetear estado al cerrar
      setTimeout(() => {
        setSelectedDate(undefined);
        setSelectedTime("");
        setEmail("");
        setConfirmed(false);
      }, 300);
    }
  }

  // Fechas disponibles para el calendario
  const availableDates = availability.map((e) => e.date);

  // Slots del día seleccionado
  const slotsForSelectedDate = selectedDate
    ? (availability.find((e) => isSameDay(e.date, selectedDate))?.slots ?? [])
    : [];

  // Función para deshabilitar fechas no disponibles
  function isDateDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return !availableDates.some((d) => isSameDay(d, date));
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Trigger: botón con efecto glass */}
      <ButtonGlass
        variant="textIcon"
        onClick={() => setIsOpen(true)}
        aria-label="Agendar una cita"
      >
        Agendar Cita
        <CalendarIcon width={20} height={20} aria-hidden="true" />
      </ButtonGlass>

      {/* Modal */}
      <DialogContent
        className="
          bg-transparent border border-white/10 backdrop-blur-xl
          text-white shadow-2xl rounded-2xl
          w-[95vw] max-w-md sm:max-w-lg
          p-6 sm:p-8
        "
      >
        {!confirmed && <>
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-white">
              Agenda tu reunión
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm">
              Selecciona una fecha y hora disponibles para tu cita.
            </DialogDescription>
          </DialogHeader>
        </>}

        {/* Estado: cargando disponibilidad */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2
              className="animate-spin text-primary"
              size={32}
              aria-hidden="true"
            />
            <p className="text-white/60 text-sm">Cargando disponibilidad…</p>
          </div>
        )}

        {/* Estado: confirmado */}
        {!loading && confirmed && (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <CheckCircle2
              size={48}
              className="text-[#8656ec]"
              aria-hidden="true"
            />
            <h3 className="text-lg font-medium text-white">
              ¡Reunión creada!
            </h3>
            <p className="text-white/60 text-sm max-w-xs">
              Tu cita ha sido creada para el{" "}
              <span className="text-white font-medium">
                {selectedDate ? formatDate(selectedDate) : ""}
              </span>{" "}
              a las{" "}
              <span className="text-white font-medium">{selectedTime}</span>.
              <br />
              <br />
              Favor de revisar tu correo electrónico para confirmar la reunión y asegurar tu lugar.
            </p>
            <ButtonGlass
              variant="textIcon"
              onClick={() => handleOpenChange(false)}
              className="mt-2"
            >
              Cerrar
            </ButtonGlass>
          </div>
        )}

        {/* Estado: selección de fecha y hora */}
        {!loading && !confirmed && (
          <div className="flex flex-col gap-6 mt-2">
            {/* Calendario */}
            <div className="flex justify-center">
              <div className="dark rounded-xl border border-white/10 bg-white/5 p-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  showOutsideDays={false}
                  className="rounded-xl"
                  locale={locale}
                  modifiers={{ available: availableDates }}
                  modifiersClassNames={{
                    available: "!text-[#8656ec] font-semibold",
                  }}
                  onMonthChange={() => {
                    setSelectedDate(undefined);
                    setSelectedTime("");
                  }}
                />
              </div>
            </div>

            {/* Selector de hora */}
            {selectedDate && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="time-select"
                  className="text-sm text-white/70 font-medium"
                >
                  Hora disponible para{" "}
                  <span className="text-white">
                    {selectedDate.toLocaleDateString(navigator.language, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger
                    id="time-select"
                    className="bg-white/5 w-full border-white/10 text-white focus:ring-primary/50 rounded-xl h-11"
                    aria-label="Seleccionar hora"
                  >
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    {slotsForSelectedDate.map((slot) => (
                      <SelectItem
                        key={slot}
                        value={slot}
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Input correo */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email-input"
                className="text-sm text-white/70 font-medium flex items-center gap-1.5"
              >
                <Mail size={14} aria-hidden="true" />
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  className="
                    w-full h-11 rounded-xl px-4
                    bg-white/5 border border-white/10
                    text-white text-sm placeholder:text-white/30
                    outline-none focus:border-[#8656ec]/60 focus:ring-1 focus:ring-[#8656ec]/40
                    transition-colors duration-200
                  "
                />
              </div>
            </div>

            {/* Botón confirmar */}
            <ButtonGlass
              variant="textIcon"
              disabled={!selectedDate || !selectedTime || !isEmailValid || submitting}
              onClick={handleConfirm}
              aria-disabled={!selectedDate || !selectedTime || !isEmailValid || submitting}
              className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                  Confirmando…
                </>
              ) : (
                <>
                  <CalendarIcon size={16} aria-hidden="true" />
                  Confirmar cita
                </>
              )}
            </ButtonGlass>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
