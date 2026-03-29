import { Calendar } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";
import type { AvailabilityData } from "@/constants/TimeMeeting";
import type { Locale } from "date-fns";

interface CalendarPickerProps {
  selectedDate: Date | undefined;
  availability: AvailabilityData;
  locale: Locale;
  onSelect: (date: Date | undefined) => void;
  onMonthChange?: () => void;
}

export function CalendarPicker({
  selectedDate,
  availability,
  locale,
  onSelect,
  onMonthChange,
}: CalendarPickerProps) {
  const availableDates = availability.map((e) => e.date);

  function isDateDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return !availableDates.some((d) => isSameDay(d, date));
  }

  return (
    <div className="flex justify-center my-3 sm:my-4">
      <div className="dark rounded-xl border border-white/10 bg-white/5 p-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          disabled={isDateDisabled}
          showOutsideDays={false}
          className="rounded-xl"
          locale={locale}
          modifiers={{ available: availableDates }}
          modifiersClassNames={{
            available: "!text-[#8656ec] font-semibold",
          }}
          onMonthChange={onMonthChange}
        />
      </div>
    </div>
  );
}
