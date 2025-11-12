import { LucideIcon } from "lucide-react";
import { Trip, User } from "./index";

export interface DashboardStats {
  upcomingTrips: number;
  totalTripsBasedOnAccount: number;
  travelerType: TravelerType;
  nextTrip: NextTrip | null;
  uniqueDestinations: number;
  tripsByType: TripsByType;
}

export interface TravelerType {
  type: string;
  description: string;
  color: string;
  icon: LucideIcon;
}

export interface NextTrip extends Trip {
  daysUntil: number;
  status: string;
}

export interface TripsByType {
  business: number;
  leisure: number;
  family: number;
}

export interface TripCardProps {
  trip: Trip;
  onClick?: (trip: Trip) => void;
}

export interface UseDashboardData {
  user: User | null;
  trips: Trip[];
  loading: boolean;
  stats: DashboardStats;
  userInitials: string;
}