// src/services/TripApi.tsx
import Api from "./Api";

export const TripApi = {
    
  createTrip: async (tripData: {
    destination: string;
    departureDate: string;
    returnDate: string;
    flightNumber?: string;
    type: string;

  }) => {
    try {
      const response = await Api.post("/Trip/Create", tripData);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al crear viaje:", error.response?.data || error.message);
      throw error;
    }
  },

  // Obtener todos los viajes
  getTrips: async () => {
    try {
      const response = await Api.get("/Trip/List");
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viajes:", error.response?.data || error.message);
      throw error;
    }
  },

  // Eliminar un viaje por ID
  deleteTrip: async (id: number) => {
    try {
      const response = await Api.delete(`/Trip/Delete/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al eliminar viaje:", error.response?.data || error.message);
      throw error;
    }
  },
};
