import { useState, useCallback } from "react";
import { actions } from "astro:actions";
import type { AvailabilityData } from "@/constants/TimeMeeting";
import type { inputUserData } from "@/schema/scheduleMeetingData";

interface UseScheduleMeetingReturn {
  // Estado
  availability: AvailabilityData;
  loading: boolean;
  submitting: boolean;
  confirmed: boolean;
  error: { message: string; error: boolean } | null;
  inputData: inputUserData;
  
  // Funciones
  fetchAvailability: () => Promise<void>;
  handleConfirm: (data: { date: Date; inputData: inputUserData }) => Promise<void>;
  setInputData: React.Dispatch<React.SetStateAction<inputUserData>>;
  resetError: () => void;
}

export function useScheduleMeeting(): UseScheduleMeetingReturn {
  const [availability, setAvailability] = useState<AvailabilityData>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<{ message: string; error: boolean } | null>(null);
  
  const [inputData, setInputData] = useState<inputUserData>({
    name: "",
    email: "",
    time: "",
    summary: ""
  });

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: err } = await actions.getAvailability();
      
      if (err || (data as any)?.success === false) {
        const errorData = err || (data as any);
        console.error("Error desde el servidor:", errorData.message);
        setError({
          message: errorData.message || "Error al cargar disponibilidad",
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
  }, []);

  const handleConfirm = useCallback(async (params: { date: Date; inputData: inputUserData }) => {
    const { date, inputData: data } = params;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const fecha = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
      ].join("-");

      const { data: responseData, error } = await actions.saveMeeting({
        name: data.name,
        email: data.email,
        time: data.time,
        summary: data.summary,
        date: fecha
      });
      
      if (error || (responseData as any)?.success === false) {
        const errorData = error || (responseData as any);
        setError({
          message: errorData.message || "Tu cita no se ha podido crear",
          error: true
        });
        return;
      }
      
      setConfirmed(true);
    } catch (err) {
      console.error("Error inesperado:", err);
      setError({
        message: "Error de conexión. Por favor intenta de nuevo.",
        error: true
      });
    } finally {
      setSubmitting(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
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
  };
}
