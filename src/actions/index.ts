import { defineAction } from 'astro:actions';
import { z } from 'zod';
import { getErrorMessage } from '@/lib/errors';

const url = import.meta.env.N8N_WEBHOOK_URL_BASE;
const token = import.meta.env.N8N_WEBHOOK_TOKEN;

export const server = {
  getAvailability: defineAction({
    handler: async () => {
      try {
        const res = await fetch(`${url}/agendamiento`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const codeMessage = errorData.codeMessage;
          return {
            success: false,
            codeMessage,
            message: getErrorMessage(codeMessage),
          };
        }

        //Extraer datos
        const raw = await res.json();

        // Verificar si el servidor devuelve un código de error
        const errorMessage = getErrorMessage(raw.codeMessage);
        if (errorMessage) {
          return {
            success: false,
            codeMessage: raw.codeMessage,
            message: errorMessage,
          };
        }

        const datos = raw.data || [];

        // //Formatear y devolver
        const mapData = datos
          .filter((item: any) => item.horarios.length > 0) // solo filtra
          .map((item: any) => ({
            // luego transforma
            date: new Date(item.fecha + "T00:00:00"),
            slots: item.horarios.map((h: any) => h.hora), // ✅ h es el parámetro
          }));
          
          return mapData
      } catch (error) {
        
        return {
          success: false,
          codeMessage: 'ERROR_DESCONOCIDO',
          message: getErrorMessage('ERROR_DESCONOCIDO'),
        };

      }
    }
  }),

  saveMeeting: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      time: z.string().time(),
      summary: z.string(),
      date: z.string(), // Formato YYYY-MM-DD
    }),
    handler: async (input) => {
      try {
        const res = await fetch(`${url}/agendamiento`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            nombre: input.name,
            correo: input.email,
            hora: input.time,
            asunto: input.summary,
            fecha: input.date
          }),
        });

        if (!res.ok) {
          const errorData = await res.json()
          const codeMessage = errorData.codeMessage;
          return { 
            success: false, 
            error: true,
            codeMessage,
            message: getErrorMessage(codeMessage) 
          };
        }

        const responseData = await res.json()

        // Verificar si el servidor devuelve un código de error
        const errorMessage = getErrorMessage(responseData.codeMessage);
        if (errorMessage && responseData.ok === false) {
          return { 
            success: false, 
            error: true,
            codeMessage: responseData.codeMessage,
            message: errorMessage 
          };
        }

        return { success: true, message: "Cita guardada correctamente" };
      } catch (error) {
        console.error("Error en saveMeeting:", error);
        return { 
          success: false, 
          error: true,
          codeMessage: 'ERROR_DESCONOCIDO',
          message: getErrorMessage('ERROR_DESCONOCIDO') 
        };
      }
    }
  })
};

