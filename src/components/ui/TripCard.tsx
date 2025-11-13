import { Card, CardContent } from "./Card";
import { MapPin } from "lucide-react";
import type { TripCardProps } from "../../types/dashboard";

export const TripCard = ({ trip }: TripCardProps) => {
  const getDaysUntilTrip = (departureDate: string): number => {
    const today = new Date();
    const departure = new Date(departureDate);
    
    today.setHours(0, 0, 0, 0);
    departure.setHours(0, 0, 0, 0);
    
    const diffTime = departure.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatTripDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const daysUntil = getDaysUntilTrip(trip.departureDate);
  
  const getStatusColor = (days: number): string => {
    if (days === 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-500';
    return 'text-green-600';
  };

  const getStatusText = (days: number): string => {
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Mañana';
    return `En ${days} días`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {trip.destination}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {formatTripDate(trip.departureDate)}
                {trip.flightNumber && ` • ${trip.flightNumber}`}
              </p>
              {trip.type && (
                <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {trip.type}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className={`text-sm font-semibold ${getStatusColor(daysUntil)}`}>
              {getStatusText(daysUntil)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};