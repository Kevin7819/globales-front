import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { Progress } from "../../../components/ui/Progress";
import { MapPin, Calendar, Pencil, Trash2, PlusCircle, Globe, Bell, Settings } from "lucide-react";
import { TripApi } from "../../../services/TripApi";
import { User, UserApi } from "../../../services/UserApi";
import TripEditModal from "../../../components/TripEditModal";

export interface Trip {
  tripId: number;
  userId: number;
  destination: string;
  departureDate: string;
  returnDate?: string;
  flightNumber?: string;
  type: string;
}

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function TripsPage() {
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) throw new Error("No user ID found in localStorage");

        const userData = await UserApi.getCurrentUser(Number(storedUserId));
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error al cargar usuario");
      }
    }
    fetchUser();
  }, []);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const data: Trip[] = await TripApi.getTrips();
      setTrips(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("No autorizado. Inicia sesión nuevamente.");
      } else {
        setError("Error al obtener los viajes.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
    if (location.state?.refresh) {
      fetchTrips();
    }
  }, [fetchTrips, location.state]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este viaje?")) return;
    try {
      await TripApi.deleteTrip(id);
      fetchTrips();
    } catch {
      window.alert("Error al eliminar el viaje.");
    }
  };

  const handleEdit = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!selectedTrip) return;
    try {
      await TripApi.updateTrip(selectedTrip.tripId, updatedData);
      fetchTrips();
      setIsEditModalOpen(false);
      setSelectedTrip(null);
    } catch {
      window.alert("Error al actualizar el viaje.");
    }
  };

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "US";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-900 dark:text-white">Orbis</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Dashboard</Link>
              <Link to="/map" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Mapa</Link>
              <Link to="/chat" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Asistente</Link>
              <Link to="/trips" className="text-blue-600 font-medium">Viajes</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm"><Bell className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
            <Avatar>
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Viajes ✈️</h1>
          <Button asChild>
            <Link to="/trips/new" state={{ background: location, refresh: true }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuevo Viaje
            </Link>
          </Button>
        </div>

        {loading && <p className="text-gray-500">Cargando viajes...</p>}
        {error && !loading && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.tripId} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      {trip.destination}
                    </CardTitle>
                    <Badge variant="default">{capitalizeFirstLetter(trip.type)}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    {trip.departureDate.split("T")[0]} • {trip.flightNumber || "Desconocido"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Progress value={50} className="h-2" />
                    <span className="text-xs text-gray-500">50% preparado</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/trips/${trip.tripId}`} state={{ background: location }}>
                        Detalles
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(trip)}>
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(trip.tripId)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <TripEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        trip={selectedTrip}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
