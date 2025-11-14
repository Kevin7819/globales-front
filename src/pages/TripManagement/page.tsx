import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { MapPin, Calendar, Plane, Plus, Filter, Search, Users, Clock, ArrowRight, Luggage, Key, Globe, Tag, BookOpen, ArrowLeft, Shield, Heart, Loader2 } from "lucide-react";
import { TripApi } from "../../services/TripApi";
import { UserApi } from "../../services/UserApi";
import { TravelGuideApi } from "../../services/travelGuideApi";
import type { User } from "../../types";
import type { Trip, CountryInfo, QuickGuideResponse, SafetyGuide, HealthGuide, CultureGuide } from "../../types";
import { CountryGuideTabs } from "../../components/ui/CountryGuideTabs";
import { useNotification } from "../../components/Notification/useNotification";


const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

// Componente para las guías de viaje

function TripGuideSection({ trip }: { trip: Trip }) {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [guideData, setGuideData] = useState<QuickGuideResponse | null>(null);
  const [safetyGuide, setSafetyGuide] = useState<SafetyGuide | null>(null);
  const [healthGuide, setHealthGuide] = useState<HealthGuide | null>(null);
  const [cultureGuide, setCultureGuide] = useState<CultureGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trip) {
      loadCountryAndGuides();
    }
  }, [trip]);



  const loadCountryAndGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const normalizedCountryName = normalizeText(trip.destination);
      
      
      console.log("Destino:", trip.destination);
      console.log("País normalizado:", normalizedCountryName);

      // Buscar el país en la lista de países disponibles
      const countries = await TravelGuideApi.getAvailableCountries();
      
      const country = countries.find(c => {
        const normalizedCountryNameFromAPI = normalizeText(c.name || "");
        const normalizedCountryCode = normalizeText(c.code || "");
        
        return (
        normalizedCountryNameFromAPI === normalizedCountryName ||
        normalizedCountryNameFromAPI.includes(normalizedCountryName) ||
        normalizedCountryName.includes(normalizedCountryNameFromAPI) ||
        normalizedCountryCode === normalizedCountryName
      );
      });

      console.log("País encontrado:", country);

      if (!country) {
        setError(`No se encontró información específica para ${trip.destination}. Destino completo: ${trip.origin} , ${trip.destination}`);
        setLoading(false);
        return;
      }

      setCountryInfo(country);

      // Cargar todas las guías en paralelo
      const [quickData, safetyData, healthData, cultureData] = await Promise.all([
        TravelGuideApi.getQuickGuide(country.code),
        TravelGuideApi.getSafetyGuide(country.code),
        TravelGuideApi.getHealthGuide(country.code),
        TravelGuideApi.getCultureGuide(country.code)
      ]);
      
      setGuideData(quickData);
      setSafetyGuide(safetyData);
      setHealthGuide(healthData);
      setCultureGuide(cultureData);
      
      console.log("Guías cargadas exitosamente");
    } catch (error) {
      console.error("Error loading guides:", error);
      setError("Error al cargar la información de la guía de viaje");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600 dark:text-gray-400">Cargando guía de viaje para {trip.destination}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
          <Button 
            variant="outline" 
            className="mt-3 border-yellow-300 text-yellow-700 dark:text-yellow-300"
            onClick={loadCountryAndGuides}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!countryInfo) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No se pudo encontrar información para {trip.destination}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CountryGuideTabs
        country={countryInfo}
        guideData={guideData}
        safetyGuide={safetyGuide}
        healthGuide={healthGuide}
        cultureGuide={cultureGuide}
        loading={loading}
      />
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Información específica para {countryInfo.name}
        </p>
      </div>
    </div>
  );
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function TripsPage() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

   // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para el modal de reclamar viaje
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [reservationCode, setReservationCode] = useState("");
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState("");

  // Nuevo estado para controlar qué sección mostrar en el modal
  const [modalSection, setModalSection] = useState<'details' | 'guide'>('details');

  const { showNotification } = useNotification();

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

  // --- Cálculo de la paginación ---
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);


  //datos a mostrar
  const stats = {
    // Viajes futuros
    upcomingTrips: trips.filter(trip => new Date(trip.departureDate) > new Date()).length,
    
    // Viajes completados
    completedTrips: trips.filter(trip => new Date(trip.departureDate) < new Date()).length,
    
    // Destinos únicos (new set solo guarda datos únicos)
    uniqueDestinations: new Set(trips.map(trip => trip.destination)).size,
    
    // Próximo viaje
    nextTrip: trips
      .filter(trip => new Date(trip.departureDate) > new Date())
      .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())[0],
    
    // Distribución por tipo de viaje
    tripsByType: {
      business: trips.filter(trip => trip.type?.toLowerCase() === 'business').length,
      leisure: trips.filter(trip => trip.type?.toLowerCase() === 'leisure').length,
      family: trips.filter(trip => trip.type?.toLowerCase() === 'family').length,
      other: trips.filter(trip => !['business', 'leisure', 'family'].includes(trip.type?.toLowerCase())).length
    },
    
    // Viajes este mes
    thisMonthTrips: trips.filter(trip => {
      const tripDate = new Date(trip.departureDate);
      const now = new Date();
      return tripDate.getMonth() === now.getMonth() && tripDate.getFullYear() === now.getFullYear();
    }).length,
    
    // Porcentaje de re-visitas
    revisitRate: (() => {
      const completed = trips.filter(trip => new Date(trip.departureDate) < new Date()).length;
      const unique = new Set(trips.map(trip => trip.destination)).size;
      return completed > 0 ? Math.round(((completed - unique) / completed) * 100) : 0;
    })()
  };

  const getTripStatusColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'business': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'leisure': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'family': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getDaysUntilTrip = (departureDate: string) => {
    const today = new Date();
    const departure = new Date(departureDate);
    const diffTime = departure.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "Completado", color: "text-green-600" };
    if (diffDays === 0) return { text: "Hoy", color: "text-red-600" };
    if (diffDays === 1) return { text: "Mañana", color: "text-orange-600" };
    if (diffDays <= 7) return { text: `En ${diffDays} días`, color: "text-orange-500" };
    return { text: `En ${diffDays} días`, color: "text-blue-600" };
  };

  // Función para obtener el tipo de viaje más común
  const getMostCommonTripType = () => {
    const types = stats.tripsByType;
    if (types.business >= types.leisure && types.business >= types.family && types.business >= types.other) 
      return { type: "Negocios", count: types.business };
    if (types.leisure >= types.family && types.leisure >= types.other) 
      return { type: "Placer", count: types.leisure };
    if (types.family >= types.other) 
      return { type: "Familia", count: types.family };
    return { type: "Otros", count: types.other };
  };

  const handleTripClick = async (trip: Trip) => {
    setSelectedTrip(trip);
    setModalSection('details');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
    setModalSection('details');
  };

  const handleOpenGuide = (trip: Trip, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTrip(trip);
    setModalSection('guide');
    setIsModalOpen(true);
  };

  // Funciones para el modal de reclamar viaje
  const handleOpenClaimModal = () => {
    setIsClaimModalOpen(true);
  };

  const handleCloseClaimModal = () => {
    setIsClaimModalOpen(false);
    setReservationCode("");
    setClaimError("");
  };

  const handleClaimTrip = async () => {
  if (!reservationCode.trim()) {
    showNotification("Por favor ingresa un código de reserva.", "error");
    return;
  }

  setClaimLoading(true);

  const response = await TripApi.claimTripByReservationCode(reservationCode);

  if (response.isSuccess) {
    showNotification(response.message, "success");
    setReservationCode("");
    handleCloseClaimModal();
  } else {
    showNotification(response.message, "error");
  }

  setClaimLoading(false);
};



  const mostCommonType = getMostCommonTripType();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
                Mis <span className="font-semibold text-blue-600">Viajes</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Gestiona y revisa todos tus viajes programados con Orbis Airlines. 
                Mantén el control de tus próximas aventuras en un solo lugar.
              </p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              onClick={handleOpenClaimModal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar viaje
            </Button>
          </div>

          {/* Stats Overview con datos reales y significativos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total de Viajes */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total de Viajes</p>
                  <p className="text-3xl font-bold">{trips.length}</p>
                  <p className="text-blue-200 text-xs mt-1">
                    {stats.thisMonthTrips} este mes
                  </p>
                </div>
                <Plane className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            {/* Próximos Viajes */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Próximos Viajes</p>
                  <p className="text-3xl font-bold">{stats.upcomingTrips}</p>
                  <p className="text-green-200 text-xs mt-1">
                    {stats.nextTrip ? `Próximo: ${new Date(stats.nextTrip.departureDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}` : 'Sin viajes'}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </div>

            {/* Viajes Completados */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Viajes Completados</p>
                  <p className="text-3xl font-bold">{stats.completedTrips}</p>
                  <p className="text-purple-200 text-xs mt-1">
                    {stats.revisitRate > 0 ? `${stats.revisitRate}% re-visitas` : 'Viajes únicos'}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </div>

            <div className={`bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm mb-1">Destinos Únicos</p>
                  <p className="text-3xl font-bold">{stats.uniqueDestinations}</p>
                  <p className="text-white text-xs mt-1">
                    {mostCommonType.count > 0
                      ? `Favorito: ${mostCommonType.type}`
                      : 'Sin preferencias'}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar viajes por destino o número de vuelo..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-6"></div>
                  <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Error al cargar viajes
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <Button onClick={fetchTrips} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                Reintentar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && trips.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
            <CardContent className="p-12 text-center">
              <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No tienes viajes programados
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Usa tu código de reserva para reclamar tu viaje y comenzar a planificar tu próxima aventura con Orbis Airlines.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleOpenClaimModal}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar viaje
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Trips Grid */}
        {!loading && !error && trips.length > 0 && (
         <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrips.map((trip) => {
              const tripStatus = getDaysUntilTrip(trip.departureDate);
              
              return (
                <Card 
                  key={trip.tripId} 
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 group cursor-pointer"
                  onClick={() => handleTripClick(trip)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${getTripStatusColor(trip.type)} font-semibold`}>
                        {capitalizeFirstLetter(trip.type)}
                      </Badge>
                      <div className={`text-xs font-semibold ${tripStatus.color} bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full`}>
                        {tripStatus.text}
                      </div>
                    </div>
                    
                    <CardTitle className="flex items-center gap-3 text-lg group-hover:text-blue-600 transition-colors">
                      <div className="bg-blue-100 dark:bg-blue-900/20 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-semibold">{trip.origin}, {trip.destination}</span>
                    </CardTitle>
                    
                    <CardDescription className="flex items-center gap-2 mt-3 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {new Date(trip.departureDate).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </CardDescription>

                    {trip.flightNumber && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Vuelo </span>
                        <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                          {trip.flightNumber}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Luggage className="h-3 w-3" />
                          Código de Reserva
                        </span>
                        <span className="font-mono font-semibold">{trip.reservationCode}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 group/btn"
                      >
                        Ver Detalles
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                        onClick={(e) => handleOpenGuide(trip, e)}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

           {/* Paginacion*/}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 1
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Anterior 
                </button>

                <span className="text-sm font-semibold">
                  Página {currentPage} de {Math.ceil(trips.length / tripsPerPage)}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= Math.ceil(trips.length / tripsPerPage)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage >= Math.ceil(trips.length / tripsPerPage)
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Siguiente 
                </button>
              </div>
              {/* Paginacion */}
              
         </>

        )}

        

      </main>

      {/* Trip Details & Guide Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`${modalSection === 'guide' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'} w-12 h-12 rounded-full flex items-center justify-center`}>
              {modalSection === 'guide' ? (
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {selectedTrip?.destination}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {modalSection === 'guide' ? 'Guía de Viaje' : selectedTrip && capitalizeFirstLetter(selectedTrip.type)}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de navegación fuera del header */}
          {modalSection === "guide" && (
            <div className="mb-4">
              <Button
                size="default"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
                onClick={() => setModalSection("details")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Detalles
              </Button>
            </div>
          )}

          {modalSection === "details" && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="default"
                onClick={() => setModalSection("guide")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Ver Guía
              </Button>
            </div>
          )}

        {modalSection === 'details' ? (
          /* Sección de Detalles del Viaje */
          <div className="space-y-4">
            {/* Origen */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Origen</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                {selectedTrip?.origin}
              </span>
            </div>

            {/* Destino */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Destino</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                {selectedTrip?.destination}
              </span>
            </div>

            {/* Fecha de salida */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Fecha de Salida</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedTrip &&
                  new Date(selectedTrip.departureDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </span>
            </div>

            {/* Número de vuelo */}
            {selectedTrip?.flightNumber && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Número de Vuelo</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                  {selectedTrip.flightNumber}
                </span>
              </div>
            )}

            {/* Código de reserva */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Código de Reserva</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                {selectedTrip?.reservationCode}
              </span>
            </div>

            {/* Estado del viaje */}
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 dark:text-gray-400">Estado</span>
              <span
                className={`font-semibold ${
                  selectedTrip && getDaysUntilTrip(selectedTrip.departureDate).color
                }`}
              >
                {selectedTrip && getDaysUntilTrip(selectedTrip.departureDate).text}
              </span>
            </div>
          </div>
        ) : (
          /* Sección de Guía de Viaje */
          selectedTrip && <TripGuideSection trip={selectedTrip} />
        )}

      </Modal>

      {/* Claim Trip Modal */}
      <Modal
        isOpen={isClaimModalOpen}
        onClose={handleCloseClaimModal}
        closeOnBackdropClick={!claimLoading}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center">
            <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Agregar viaje
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Ingresa tu código de reserva
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="reservationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código de Reserva
            </label>
            <Input
              id="reservationCode"
              type="text"
              placeholder="Ej: ABC123XYZ"
              value={reservationCode}
              onChange={(e) => {
                setReservationCode(e.target.value.toUpperCase());
                setClaimError("");
              }}
              className="w-full text-lg font-mono uppercase"
              autoFocus
              disabled={claimLoading}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Encuentra este código en tu confirmación de reserva o email de la aerolínea
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleClaimTrip}
              disabled={claimLoading || !reservationCode.trim()}
            >
              {claimLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Reclamando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar viaje
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600"
              onClick={handleCloseClaimModal}
              disabled={claimLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}