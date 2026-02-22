import { defineAction } from 'astro:actions';
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
          console.log(mapData)
          return mapData
      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: "Error desconocido",
        };

      }
    }
  })
};