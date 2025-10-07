export interface Trip {
  tripId: number;
  userId: number;
  destination: string;
  departureDate: string;
  returnDate?: string; 
  flightNumber?: string;
  type: string;
}
