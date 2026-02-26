import { useMemo, useState, useEffect, type ChangeEvent, type FormEvent  } from "react";
import { CalendarIcon, CheckCircle2, Loader2, Mail, User,MessageCircleMore,CalendarClock, CircleX   } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import * as z from "zod";
import { inputUserSchema, type inputUserData } from "@/schema/scheduleMeetingData";
import { actions } from "astro:actions";

const WEBHOOK_DISPONIBILIDAD_URL = ""
const TOKEN = ""
// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export function ScheduleMeeting() {
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityData>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const [inputData, setInputData] = useState<inputUserData>({
    name: "",
    email: "",
    time: "",
    summary: ""
  });

  const validation = inputUserSchema.safeParse(inputData);
  const isFormValid = validation.success && selectedDate;

  const handleChangeInput = ({name, value}:{name:string, value:string}) => {
    setInputData({...inputData, [name]:value })
  }

  const locale = useMemo(() => getBrowserLocale(), []);

  // Cargar disponibilidad al abrir el modal
  useEffect(() => {
    if (isOpen && availability.length === 0) {
      fetchAvailability();
    }
  }, [isOpen]);

  // Resetear selección de hora cuando cambia la fecha
  useEffect(() => {
    setInputData({
      ...inputData,
      time: ""
    });
  }, [selectedDate]);

  async function fetchAvailability() {
   setLoading(true);
   try {
      
      const { data, error } = await actions.getAvailability();
      
      //  manejamos los errores controlados
      if (error || (data as any)?.success === false) {
        const errorData = error || (data as any);
        console.error("Error desde el servidor:", errorData.message);
        setError({
          message: errorData.message || "Tu cita no se ha podido crear",
          error: true
        });
        return;
      }
      
      if (data) {
        setAvailability(data);
      }

    } catch (err) {
      
      console.error("Error inesperado al cargar disponibilidad:", err);
      setError({
        message: "Error de conexión. Por favor intenta de nuevo.",
        error: true
      });
    } finally {
      
      setLoading(false);
    }
 }

  async function handleConfirm(e:FormEvent) {
    
    e.preventDefault()
    
    if (!isFormValid || !selectedDate) return;
    
    setSubmitting(true);
    try {

      const fecha = [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, "0"),
        String(selectedDate.getDate()).padStart(2, "0")
      ].join("-")

      const { data, error } = await actions.saveMeeting({
        name: inputData.name,
        email: inputData.email,
        time: inputData.time,
        summary: inputData.summary,
        date: fecha
      });
      
      // Verificar error del servidor
      if (error || (data as any)?.success === false) {
        const errorData = error || (data as any);
        setError({
          message: errorData.message || "Tu cita no se ha podido crear",
          error: true
        })
        return;
      }
      setConfirmed(true);
      }
      setConfirmed(true);
    } catch (error) {
      console.error("Error inesperado:", error);
    }finally {
      setSubmitting(false);
    }
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      // Resetear estado al cerrar
      setSelectedDate(undefined);
      setInputData({
        ...inputData,
        time: "",
        email: ""
      });
      setError({
        error: false,
        message: ""
      })
      setConfirmed(false);
    }
  }

  // Fechas disponibles para el calendario
  const availableDates = availability.length >= 1 ? availability.map((e) => e.date) : []

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
        {!confirmed && !error.error && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-white">
                Agenda tu reunión
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm">
                Selecciona una fecha y hora disponibles para tu cita.
              </DialogDescription>
            </DialogHeader>
          </>
        )}

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
{/*                               */}
        {/* Estado: confirmado */}
        {!loading && confirmed && (
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
                {selectedDate ? formatDate(selectedDate) : ""}
              </span>{" "}
              a las{" "}
              <span className="text-white font-medium">{inputData.time}</span>.
              <br />
              <br />
              Favor de revisar tu correo electrónico para confirmar la reunión y
              asegurar tu lugar.
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

        {/* Estado: error */}
        {!loading && error.error && (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <CircleX
              size={100}
              className="text-white/50"
              strokeWidth={1}
              aria-hidden="true"
            />
            <h3 className="text-lg font-medium text-white">¡Error!</h3>
            <p className="text-white/60 text-sm max-w-xs">
              {error.message}
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
        {!loading && !confirmed && !error.error && (
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
                    setInputData({
                      ...inputData,
                      time: ""
                    });
                  }}
                />
              </div>
            </div>
            <form onSubmit={handleConfirm} className="space-y-[20px]">
              {/* Selector de hora */}
              {selectedDate && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="time-select"
                    className="text-sm text-white/70 font-medium flex items-center gap-1.5"
                  >
                    <CalendarClock size={14} aria-hidden="true" />
                    Hora disponible para{" "}
                    <span className="text-white">
                      {selectedDate.toLocaleDateString(navigator.language, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </label>
                  <Select
                    value={inputData.time}
                    onValueChange={(e) =>
                      handleChangeInput({
                        name: "time",
                        value: e,
                      })
                    }
                  >
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
                <Label
                  htmlFor="email-input"
                  className="text-sm text-white/70 font-medium flex items-center gap-1.5"
                >
                  <Mail size={14} aria-hidden="true" />
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Input
                    id="email-input"
                    type="email"
                    value={inputData.email}
                    onChange={(e) =>
                      handleChangeInput({
                        name: "email",
                        value: e.target.value,
                      })
                    }
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

              {/* Input nombre */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name-input"
                  className="text-sm text-white/70 font-medium flex items-center gap-1.5"
                >
                  <User size={14} aria-hidden="true" />
                  Nombre
                </Label>
                <div className="relative">
                  <Input
                    id="name-input"
                    type="text"
                    value={inputData.name}
                    onChange={(e) =>
                      handleChangeInput({ name: "name", value: e.target.value })
                    }
                    placeholder=" Tu Nombre"
                    autoComplete="name"
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

              {/* Input asunto */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="summary-input"
                  className="text-sm text-white/70 font-medium flex items-center gap-1.5"
                >
                  <MessageCircleMore size={14} aria-hidden="true" />
                  Asunto
                </Label>
                <Textarea
                  id="summary-input"
                  name="summary"
                  placeholder=""
                  value={inputData.summary}
                  onChange={(e) =>
                    handleChangeInput({
                      name: "summary",
                      value: e.target.value,
                    })
                  }
                  className="
                  min-h-[100px] rounded-xl px-4
                bg-white/5 border border-white/10
                text-white text-sm placeholder:text-white/30
                  outline-none focus:border-[#8656ec]/60 focus:ring-1 focus:ring-[#8656ec]/40
                  transition-colors duration-200 resize-none 
                  "
                />
              </div>

              {/* Botón confirmar */}

              <ButtonGlass
                variant="textIcon"
                disabled={
                  !selectedDate ||
                  !inputData.name ||
                  !inputData.email ||
                  !inputData.summary ||
                  submitting
                }
                aria-disabled={
                  !selectedDate ||
                  !inputData.name ||
                  !inputData.email ||
                  !inputData.summary ||
                  submitting
                }
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
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
