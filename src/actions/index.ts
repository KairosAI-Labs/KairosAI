import { defineAction } from 'astro:actions';
import { z } from 'zod';

const url = import.meta.env.N8N_WEBHOOK_URL_BASE;
const token = import.meta.env.N8N_WEBHOOK_TOKEN;

export const server = {
  getAvailability: defineAction({
    handler: async () => {
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Fallo en la conexión ");

        //Extraer datos
        const raw = await res.json();

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
          message: "Error desconocido",
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
        const res = await fetch(url, {
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
          const errorText = await res.text();
          console.error(`Error HTTP ${res.status} desde n8n:`, errorText);

          throw new Error(`Fallo en n8n: ${res.status} - ${errorText}`);
        }


        return { success: true, message: "Cita guardada correctamente" };
      } catch (error) {
        console.error("Error en saveMeeting:", error);
        return { success: false, error:true, message: "No se pudo guardar la cita" };
      }
    }
  })
};

