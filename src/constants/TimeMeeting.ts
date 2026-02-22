import { es, enUS, fr, de, pt, it, ja, zhCN, ko, ar } from "date-fns/locale";
import type { Locale } from "date-fns";


// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
export type TimeSlot = string; // "09:00", "10:30", etc.

export interface AvailabilityEntry {
  date: Date;
  slots: TimeSlot[];
}

export type AvailabilityData = AvailabilityEntry[];

// ---------------------------------------------------------------------------
// Datos de prueba — estructura compatible con Google Calendar
// TODO: Reemplazar con llamada real al webhook de Google Calendar
// ---------------------------------------------------------------------------
export const MOCK_AVAILABILITY: AvailabilityData = [
  // Febrero 2026
  { date: new Date(2026, 1, 16), slots: ["09:00", "10:00", "15:00", "16:00"] },
  { date: new Date(2026, 1, 17), slots: ["11:00", "14:00", "17:00"] },
  { date: new Date(2026, 1, 18), slots: ["09:00", "10:00", "11:00"] },
  { date: new Date(2026, 1, 19), slots: ["14:00", "15:00"] },
  { date: new Date(2026, 1, 23), slots: ["09:00", "10:00", "16:00"] },
  { date: new Date(2026, 1, 24), slots: ["11:00", "15:00", "17:00"] },
  { date: new Date(2026, 1, 25), slots: ["09:00", "14:00"] },
  // Marzo 2026
  { date: new Date(2026, 2, 2),  slots: ["09:00", "11:00", "16:00"] },
  { date: new Date(2026, 2, 3),  slots: ["10:00", "15:00", "17:00"] },
  { date: new Date(2026, 2, 5),  slots: ["09:00", "14:00"] },
  { date: new Date(2026, 2, 9),  slots: ["10:00", "11:00", "16:00"] },
  { date: new Date(2026, 2, 10), slots: ["09:00", "15:00"] },
  { date: new Date(2026, 2, 12), slots: ["11:00", "14:00", "17:00"] },
  { date: new Date(2026, 2, 16), slots: ["09:00", "10:00"] },
  { date: new Date(2026, 2, 19), slots: ["14:00", "16:00"] },
  { date: new Date(2026, 2, 23), slots: ["09:00", "11:00", "15:00"] },
  { date: new Date(2026, 2, 26), slots: ["10:00", "17:00"] },
];


// ---------------------------------------------------------------------------
// Mapa de locales para internacionalización
// ---------------------------------------------------------------------------
export const LOCALE_MAP: Record<string, Locale> = {
  es,
  en: enUS,
  fr,
  de,
  pt,
  it,
  ja,
  zh: zhCN,
  ko,
  ar,
};