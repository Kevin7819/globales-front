import Api from "./Api";
import type { Trip, ClaimTripResponse } from "../types";


// Traductor de mensajes del backend
const translateApiMessage = (message: string): string => {
  if (!message) return "Ocurrió un error desconocido.";

  const translations: Record<string, string> = {
    "This reservation code has already been used.": "Este código de reserva ya fue utilizado.",
    "Reservation code not found.": "No se encontró ningún viaje con ese código de reserva.",
    "Invalid reservation code.": "El código de reserva ingresado no es válido.",
    "Trip already claimed.": "Este viaje ya fue reclamado.",
    "Error connecting to server.": "Error al conectar con el servidor.",
    "Trip successfully claimed.": "¡Viaje reclamado exitosamente!",
  };

  return translations[message] || message; // Si no existe traducción, muestra el mensaje original
};



export const TripApi = {
  // Get Trips
  getTrips: async (): Promise<Trip[]> => {
    try {
      const response = await Api.get("/Trip");
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viajes:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get Nearest Trip
  getNearestTrip: async (): Promise<Trip> => {
    try {
      const response = await Api.get("/Trip/nearest");
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viaje más cercano:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get Trip by ID
  getTripById: async (id: string | number): Promise<Trip> => {
    try {
      const response = await Api.get(`/Trip/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al obtener viaje por ID:", error.response?.data || error.message);
      throw error;
    }
  },

  // Claim Trip by Reservation Code
claimTripByReservationCode: async (reservationCode: string): Promise<ClaimTripResponse> => {
  try {
    const response = await Api.post("/Trip/claim", reservationCode, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      isSuccess: true,
      message: translateApiMessage(response.data.message || "Viaje reclamado exitosamente."),
    };
  } catch (error: any) {
    console.error("[TripApi] Error al reclamar viaje:", error.response?.data || error.message);

    return {
      isSuccess: false,
      message: translateApiMessage(error.response?.data?.message || "Error al conectar con el servidor."),
    };
  }
},



  // Los siguientes métodos están comentados porque el CRUD fue eliminado del backend
  /*
  // Create Trip (ELIMINADO - No se usa más)
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

  // Delete Trip (ELIMINADO - No se usa más)
  deleteTrip: async (id: number) => {
    try {
      await Api.delete(`/Trip/${id}`);
      return true;
    } catch (error: any) {
      console.error("[TripApi] Error al eliminar viaje:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update Trip (ELIMINADO - No se usa más)
  updateTrip: async (id: number, tripData: any) => {
    try {
      const response = await Api.put(`/Trip/${id}`, tripData);
      return response.data;
    } catch (error: any) {
      console.error("[TripApi] Error al actualizar viaje:", error.response?.data || error.message);
      throw error;
    }
  },
  */
};