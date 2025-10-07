import Api from "./Api";

export const TripApi = {
  // Create Trip 
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

  // Get Trips
  getTrips: async () => {
    try {
      const response = await Api.get("/Trip");
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viajes:", error.response?.data || error.message);
      throw error;
    }
  },

  // Delete Trip
  deleteTrip: async (id: number) => {
    try {
      await Api.delete(`/Trip/${id}`);
      return true;
    } catch (error: any) {
      console.error("[TripApi] Error al eliminar viaje:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update Trip
  updateTrip: async (id: number, tripData: any) => {
    try {
      const response = await Api.put(`/Trip/${id}`, tripData);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al actualizar viaje:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get Trip by ID
  getTripById: async (id: string | number) => {
    try {
      const response = await Api.get(`/Trip/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viaje por ID:", error.response?.data || error.message);
      throw error;
    }
  },
};
