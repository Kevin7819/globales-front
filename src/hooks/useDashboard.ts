import { useState, useEffect, useMemo } from "react";
import { UserApi } from "../services/UserApi";
import { TripApi } from "../services/TripApi";
import type { User, Trip } from "../types";
import type { DashboardStats, UseDashboardData } from "../types/dashboard";
import { Briefcase, Compass, Globe, Heart, Palette, Scale, Users, Zap } from "lucide-react";

export const useDashboard = (): UseDashboardData => {
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          throw new Error("No user ID found in localStorage");
        }

        const [userData, tripsData] = await Promise.all([
          UserApi.getCurrentUser(Number(storedUserId)),
          TripApi.getTrips(),
        ]);

        setUser(userData);
        setTrips(tripsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions
  const getDaysUntilTrip = (departureDate: string): number => {
    const today = new Date();
    const departure = new Date(departureDate);
    
    today.setHours(0, 0, 0, 0);
    departure.setHours(0, 0, 0, 0);
    
    const diffTime = departure.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTravelerType = (trips: Trip[]) => {
    const businessTrips = trips.filter(t => t.type?.toLowerCase() === 'business').length;
    const leisureTrips = trips.filter(t => t.type?.toLowerCase() === 'leisure').length;
    const familyTrips = trips.filter(t => t.type?.toLowerCase() === 'family').length;
    const total = trips.length;

    if (total === 0) return { 
      type: "Explorador Novato", 
      description: "Comienza tu aventura",
      color: "from-gray-600 to-gray-700",
      icon: Users
    };

    const businessPercent = (businessTrips / total) * 100;
    const leisurePercent = (leisureTrips / total) * 100;
    const familyPercent = (familyTrips / total) * 100;
    
    if (businessPercent >= 60) return { 
      type: "Ejecutivo Global", 
      description: `${Math.round(businessPercent)}% negocios`,
      color: "from-blue-600 to-blue-700",
      icon: Briefcase
    };
    
    if (leisurePercent >= 60) return { 
      type: "Aventurero Cultural", 
      description: `${Math.round(leisurePercent)}% turismo`,
      color: "from-green-600 to-green-700", 
      icon: Compass
    };
    
    if (familyPercent >= 60) return { 
      type: "Viajero Familiar", 
      description: `${Math.round(familyPercent)}% familia`,
      color: "from-purple-600 to-purple-700",
      icon: Users
    };
    
    const types = [];
    if (businessPercent > 25) types.push("negocios");
    if (leisurePercent > 25) types.push("turismo");
    if (familyPercent > 25) types.push("familia");
    
    if (types.length === 3) return {
      type: "Viajero Versátil",
      description: "Equilibrado en todos los tipos",
      color: "from-indigo-600 to-purple-600",
      icon: Globe
    };
    
    if (types.length === 2) {
      const isBusinessLeisure = types.includes("negocios") && types.includes("turismo");
      const isBusinessFamily = types.includes("negocios") && types.includes("familia");
      const isLeisureFamily = types.includes("turismo") && types.includes("familia");
      
      if (isBusinessLeisure) return {
        type: "Profesional Dinámico",
        description: "Negocios y placer",
        color: "from-cyan-600 to-blue-600",
        icon: Zap
      };
      
      if (isBusinessFamily) return {
        type: "Equilibrista Familiar",
        description: "Trabajo y familia",
        color: "from-orange-600 to-red-600",
        icon: Scale
      };

      if (isLeisureFamily) return {
        type: "Aventurero Familiar",
        description: "Turismo y familia",
        color: "from-orange-600 to-red-600",
        icon: Scale
      };
      
      return {
        type: "Explorador Balanceado",
        description: types.join(" + "),
        color: "from-teal-600 to-green-600",
        icon: Palette
      };
    }
    
    return {
      type: "Viajero Único",
      description: "Estilo personalizado",
      color: "from-pink-600 to-rose-600",
      icon: Heart
    };
  };

  const calculateNextTrip = (trips: Trip[]) => {
    const upcoming = trips
      .filter(trip => new Date(trip.departureDate) > new Date())
      .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())[0];
    
    if (!upcoming) return null;
    
    const daysUntil = getDaysUntilTrip(upcoming.departureDate);
    
    return {
      ...upcoming,
      daysUntil,
      status: daysUntil === 0 ? "Hoy" : daysUntil === 1 ? "Mañana" : `En ${daysUntil} días`
    };
  };

  const stats = useMemo((): DashboardStats => {
    const upcomingTrips = trips.filter(trip => new Date(trip.departureDate) > new Date()).length;
    const totalTrips = trips.length;

    return {
      upcomingTrips,
      totalTripsBasedOnAccount: totalTrips,
      travelerType: calculateTravelerType(trips),
      nextTrip: calculateNextTrip(trips),
      uniqueDestinations: new Set(trips.map(trip => trip.destination)).size,
      tripsByType: {
        business: trips.filter(trip => trip.type?.toLowerCase() === 'business').length,
        leisure: trips.filter(trip => trip.type?.toLowerCase() === 'leisure').length,
        family: trips.filter(trip => trip.type?.toLowerCase() === 'family').length
      }
    };
  }, [trips]);

  const getUserInitials = (user: User): string => {
    if (user.UserName) {
      return user.UserName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  const userInitials = user ? getUserInitials(user) : "";

  return {
    user,
    trips,
    loading,
    stats,
    userInitials
  };
};