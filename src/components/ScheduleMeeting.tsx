import { useState, useEffect, type FormEvent } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ButtonGlass } from "@/components/ui/ButtonGlass";
import { useScheduleMeeting } from "./schedule/useScheduleMeeting";
import { CalendarPicker } from "./schedule/CalendarPicker";
import { TimeSelector } from "./schedule/TimeSelector";
import { MeetingForm } from "./schedule/MeetingForm";
import { ErrorAlert } from "./schedule/ErrorAlert";
import { SuccessView } from "./schedule/SuccessView";
import { LoadingView } from "./schedule/LoadingView";
import { getBrowserLocale } from "@/lib/utils";
import { useMemo } from "react";

export function ScheduleMeeting() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const {
    availability,
    loading,
    submitting,
    confirmed,
    error,
    inputData,
    fetchAvailability,
    handleConfirm,
    setInputData,
    resetError,
  } = useScheduleMeeting();

  const locale = useMemo(() => getBrowserLocale(), []);

  // Cargar disponibilidad al abrir el modal
  useEffect(() => {
    if (isOpen && availability.length === 0) {
      fetchAvailability();
    }
  }, [isOpen, availability.length, fetchAvailability]);

  // Resetear selección de hora cuando cambia la fecha
  useEffect(() => {
    setInputData((prev) => ({ ...prev, time: "" }));
  }, [selectedDate, setInputData]);

  // Resetear estado al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedDate(undefined);
        setInputData((prev) => ({ ...prev, email: "" }));
        resetError();
      }, 300);
    }
  }, [isOpen, setInputData, resetError]);

  const handleOpenChange = (open: boolean) => {
    if (!open && confirmed) {
      setSelectedDate(undefined);
      setInputData((prev) => ({ ...prev, email: "" }));
      resetError();
    }
    setIsOpen(open);
  };

  const handleChangeInput = (name: string, value: string) => {
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !inputData.time || !inputData.name || !inputData.email || !inputData.summary) return;
    handleConfirm({ date: selectedDate, inputData });
  };

  const isFormValid = 
    selectedDate && 
    inputData.time && 
    inputData.name && 
    inputData.email && 
    inputData.summary;

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
          p-4 sm:p-6 md:p-8
          max-h-[70vh] sm:max-h-[75vh] md:max-h-[85vh]
          overflow-hidden flex flex-col no-scrollbar
        "
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-1 -mx-1 no-scrollbar">
        {/* Loading */}
        {loading && <LoadingView />}

        {/* Success */}
        {!loading && confirmed && (
          <SuccessView
            date={selectedDate}
            time={inputData.time}
            onClose={() => setIsOpen(false)}
          />
        )}

        {/* Form */}
        {!loading && !confirmed && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-medium text-white">
                Agenda tu reunión
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm">
                Selecciona una fecha y hora disponibles para tu cita.
              </DialogDescription>
            </DialogHeader>

            {/* Error Alert */}
            {error && (
              <ErrorAlert 
                message={error.message} 
                onClose={resetError}
              />
            )}

            {/* Calendario */}
            <CalendarPicker
              selectedDate={selectedDate}
              availability={availability}
              locale={locale}
              onSelect={setSelectedDate}
              onMonthChange={() => {
                setSelectedDate(undefined);
                setInputData((prev) => ({ ...prev, time: "" }));
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-[20px]">
              {/* Selector de hora */}
              <TimeSelector
                selectedDate={selectedDate}
                availability={availability}
                value={inputData.time}
                onChange={(time) => handleChangeInput("time", time)}
              />

              {/* Formulario */}
              <MeetingForm
                inputData={inputData}
                onChange={handleChangeInput}
                disabled={submitting}
              />

              {/* Botón confirmar */}
              <ButtonGlass
                variant="textIcon"
                disabled={!isFormValid || submitting}
                aria-disabled={!isFormValid || submitting}
                className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed mt-2"
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
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
