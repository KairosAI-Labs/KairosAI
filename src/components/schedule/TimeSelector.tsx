import { CalendarClock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AvailabilityData } from "@/constants/TimeMeeting";
import { isSameDay } from "date-fns";

interface TimeSelectorProps {
  selectedDate: Date | undefined;
  availability: AvailabilityData;
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

export function TimeSelector({ 
  selectedDate, 
  availability, 
  value, 
  onChange,
  disabled 
}: TimeSelectorProps) {
  if (!selectedDate) return null;

  const slotsForSelectedDate = selectedDate
    ? (availability.find((e) => isSameDay(e.date, selectedDate))?.slots ?? [])
    : [];

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="time-select"
        className="text-sm text-white/70 font-medium flex items-center gap-1.5"
      >
        <CalendarClock size={14} aria-hidden="true"/>
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
        value={value}
        onValueChange={onChange}
        disabled={disabled}
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
  );
}
