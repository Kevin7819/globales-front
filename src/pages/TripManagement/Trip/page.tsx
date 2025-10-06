import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { Progress } from "../../../components/ui/Progress";
import { MapPin, Calendar, Pencil, Trash2, PlusCircle, Globe, Bell, Settings } from "lucide-react";
import { TripApi } from "../../../services/TripApi";
import TripEditModal from "../../../components/TripEditModal";

interface Trip {
  id: number;
  destination: string;
  date: string;
  airline: string;
  status: string;
  progress: number;
}

export default function TripsPage() {
  const location = useLocation();

  const [user] = useState({
    name: "Juan Pérez",
    email: "juan@email.com",
    avatar: "/generic-user-avatar.png",
  });

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // Edit page modal
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await TripApi.getTrips();

        const formattedTrips = data.map((t: any) => ({
          id: t.tripId,
          destination: t.destination || "Sin destino",
          date: t.departureDate || "Sin fecha",
          airline: t.flightNumber || "Desconocida",
          status: t.status || "pending",
          progress: 50, 
        }));

        setTrips(formattedTrips);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setError("No autorizado. Inicia sesión nuevamente.");
        } else {
          setError("Error al obtener los viajes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Manejar eliminación de viaje
const handleDelete = async (id: number) => {
  if (!window.confirm("¿Seguro que deseas eliminar este viaje?")) return;
  try {
    await TripApi.deleteTrip(id);
    setTrips((prev) => prev.filter((t) => t.id !== id));
  } catch {
    window.alert("Error al eliminar el viaje.");
  }
};

//Manejar actualización de viaje
const handleEdit = (trip: Trip) => {
  setSelectedTrip(trip);
  setIsEditModalOpen(true);
};

const handleSaveEdit = async (updatedData: {
  destination: string;
  flightNumber: string;
  departureDate: string;
  returnDate: string;
  type: string;
}) => {
  if (!selectedTrip) return;

  try {
    const updatedTrip = await TripApi.updateTrip(selectedTrip.id, {
      destination: updatedData.destination,
      flightNumber: updatedData.flightNumber,
      departureDate: updatedData.departureDate,
      returnDate: updatedData.returnDate,
      type: updatedData.type,
    });

    // Actualizar lista local
    setTrips((prev) =>
      prev.map((t) =>
        t.id === selectedTrip.id
          ? {
              ...t,
              destination: updatedData.destination,
              airline: updatedData.flightNumber,
              date: updatedData.departureDate,
              returnDate: updatedData.returnDate,
              type: updatedData.type,
            }
          : t
      )
    );

    setIsEditModalOpen(false);
    setSelectedTrip(null);
  } catch (error) {
    window.alert("Error al actualizar el viaje.");
  }
};

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
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                Dashboard
              </Link>
              <Link to="/map" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                Mapa
              </Link>
              <Link to="/chat" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                Asistente
              </Link>
              <Link to="/trips" className="text-blue-600 font-medium">
                Viajes
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Viajes ✈️</h1>
          <Button asChild>
            <Link to="/trips/new" state={{ background: location }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuevo Viaje
            </Link>
          </Button>
        </div>

        {/* Estado de carga o error */}
        {loading && <p className="text-gray-500">Cargando viajes...</p>}
        {error && !loading && <p className="text-red-500">{error}</p>}

        {/* Trips List */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      {trip.destination}
                    </CardTitle>
                    <Badge variant={trip.status === "confirmed" ? "default" : "secondary"}>
                      {trip.status === "confirmed" ? "Confirmado" : "Pendiente"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    {trip.date} • {trip.airline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Progress value={trip.progress} className="h-2" />
                    <span className="text-xs text-gray-500">{trip.progress}% preparado</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/trips/${trip.id}`} state={{ background: location }}>
                        Detalles
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(trip)}>
                      <Pencil className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(trip.id)}
                    >
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
