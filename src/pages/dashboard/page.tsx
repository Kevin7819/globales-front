import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { Card, CardContent, CardDescription ,CardHeader, CardTitle } from "../../components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { MapPin, Calendar, Shield, Heart, MessageCircle, Bell, Settings, Plane, Globe, LogOut, Users, TrendingUp, Award, Clock, Luggage, Briefcase, Palette, Compass, Zap, Scale } from "lucide-react"
import { UserApi } from "../../services/UserApi"
import type { User } from "../../types"
import { TripApi } from "../../services/TripApi"
import type { Trip } from "../../types"
import UserNotFound from "../../components/UserNotFound";
import QuickActionCard from "../../components/ui/QuickActionCard";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const storedUserId = localStorage.getItem("userId")
        if (!storedUserId) {
          throw new Error("No user ID found in localStorage")
        }

        // Fetch user data
        const userData = await UserApi.getCurrentUser(Number(storedUserId))
        setUser(userData)

        // Fetch trips data
        const tripsData = await TripApi.getTrips()
        setTrips(tripsData)

      } catch (err) {
        console.error("Failed to fetch data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = {
    // Viajes futuros
    upcomingTrips: trips.filter(trip => new Date(trip.departureDate) > new Date()).length,
    
    // todos los viajes
    totalTripsBasedOnAccount: trips.length,
    
    // Tipo de Viajero basado en patrones de viaje
    travelerType: (() => {
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
      //sacar porcentaje
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
      
      // Aversh que combinacion tiene
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
        
        if (isBusinessLeisure) 
        return {
          type: "Profesional Dinámico",
          description: "Negocios y placer",
          color: "from-cyan-600 to-blue-600",
          icon: Zap
        };
        
        if (isBusinessFamily) 
        return {
          type: "Equilibrista Familiar",
          description: "Trabajo y familia",
          color: "from-orange-600 to-red-600",
          icon: Scale
        };

        if (isLeisureFamily) 
        return {
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
    })(),
    
    // Próximo viaje 
    nextTrip: (() => {
      const upcoming = trips
        .filter(trip => new Date(trip.departureDate) > new Date())
        .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())[0];
      
      if (!upcoming) return null;
      
      const today = new Date();
      const departure = new Date(upcoming.departureDate);
      const diffTime = departure.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        ...upcoming,
        daysUntil: diffDays,
        status: diffDays === 0 ? "Hoy" : diffDays === 1 ? "Mañana" : `En ${diffDays} días`
      };
    })(),
    
    // Destinos únicos visitados
    uniqueDestinations: new Set(trips.map(trip => trip.destination)).size,
    
    // Viajes por tipo
    tripsByType: {
      business: trips.filter(trip => trip.type?.toLowerCase() === 'business').length,
      leisure: trips.filter(trip => trip.type?.toLowerCase() === 'leisure').length,
      family: trips.filter(trip => trip.type?.toLowerCase() === 'family').length
    }
  };

  // iniciales
  const getUserInitials = (user: User) => {
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

  if (loading) return <LoadingSkeleton />;

  if (!user) return <UserNotFound />

  const userInitials = getUserInitials(user);
  const TravelerTypeIcon = stats.travelerType.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
                ¡Bienvenido a Bordo, <span className="font-semibold text-blue-600">{user.UserName || user.email.split('@')[0]}!</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Aquí tienes un resumen completo de tus próximos viajes, recomendaciones personalizadas 
                y todo lo que necesitas para tu próxima aventura con Orbis.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Conectado</span>
            </div>
          </div>

          {/* Stats Overview con datos reales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Viajes Totales */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg min-h-[120px]">
              <CardContent className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100 mb-1">Total de Viajes</CardDescription>
                  <p className="text-3xl font-bold">{stats.totalTripsBasedOnAccount}</p>
                  <p className="text-blue-200 text-xs mt-1">{stats.upcomingTrips} próximos</p>
                </div>
                <Plane className="h-8 w-8 text-blue-200" />
              </CardContent>
            </Card>
            
            {/* Tipo de Viajero */}
            <Card className={`bg-gradient-to-r ${stats.travelerType.color} text-white p-4 shadow-lg min-h-[120px]`}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100 mb-1">Tipo de Viajero</CardDescription>
                  <p className="text-2xl font-bold">{stats.travelerType.type}</p>
                  <p className="text-opacity-80 text-xs mt-1">{stats.travelerType.description}</p>
                </div>
                <TravelerTypeIcon className="h-8 w-8 text-opacity-80" />
              </CardContent>
            </Card>
            
            {/* Próximo Viaje */}
            <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg min-h-[120px]">
              <CardContent className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-green-100 mb-1">
                    {stats.nextTrip ? "Próximo Viaje" : "Sin Viajes Próximos"}
                  </CardDescription>
                  <p className="text-2xl font-bold">
                    {stats.nextTrip ? stats.nextTrip.destination : "Planificar"}
                  </p>
                  <p className="text-green-200 text-xs mt-1">
                    {stats.nextTrip ? stats.nextTrip.status : "Agrega tu primer viaje"}
                  </p>
                </div>
                {stats.nextTrip ? <Clock className="h-8 w-8 text-green-200" /> : <Award className="h-8 w-8 text-green-200" />}
              </CardContent>
            </Card>

          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Trips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <Plane className="h-6 w-6 text-blue-600" />
                    Próximos Viajes
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">Tus próximas aventuras con Orbis Airlines</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:-translate-y-1" asChild>
                  <Link to="/trips">
                    <Plane className="h-4 w-4 mr-2" />
                    Ver Todos los Viajes
                  </Link>
                </Button>
              </div>

              {stats.upcomingTrips === 0 ? (
                <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
                  <CardContent className="p-12 text-center">
                    <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      No tienes viajes programados
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Comienza a planificar tu próxima aventura
                    </p>
                    <Button asChild>
                      <Link to="/trips">Explorar Destinos</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {trips
                    .filter(trip => new Date(trip.departureDate) > new Date())
                    .slice(0, 3)
                    .map((trip) => {
                      const today = new Date();
                      const departure = new Date(trip.departureDate);
                      const diffDays = Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <Card key={trip.tripId} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center">
                                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{trip.destination}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {new Date(trip.departureDate).toLocaleDateString('es-ES')}
                                    {trip.flightNumber && ` • ${trip.flightNumber}`}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`text-sm font-semibold ${
                                  diffDays === 0 ? 'text-red-600' : 
                                  diffDays <= 3 ? 'text-orange-500' : 'text-green-600'
                                }`}>
                                  {diffDays === 0 ? 'Hoy' : diffDays === 1 ? 'Mañana' : `En ${diffDays} días`}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )}
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-600" />
                Servicios de Viaje
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickActionCard
                  title="Explorar Destinos"
                  description="Este servicio de mapa está deshabilitado temporalmente..."
                  icon={<MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                  disabled
                />
                <QuickActionCard
                  title="Asistente Virtual"
                  description="Resuelve todas tus dudas sobre viajes con nuestro asistente(solo en movil por ahora)..."
                  icon={<MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />}
                  disabled
                />
                <QuickActionCard
                  title="Seguridad Sanitaria"
                  description="Consulta requisitos sanitarios, vacunas obligatorias..."
                  icon={<Shield className="h-8 w-8 text-red-600 dark:text-red-400" />}
                  link="/travel-guides"
                />
              </div>
            </section>


          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Users className="h-5 w-5 text-blue-600" />
                  Tu Perfil de Viajero
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16 border-2 border-blue-500">
                    <AvatarFallback>
                      <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-semibold text-lg flex items-center justify-center h-full w-full">
                        {userInitials}
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user.UserName || user.email}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">Viajero Activo</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">País de Origen:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{user.countryOfOrigin || "No especificado"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Idioma Preferido:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{user.preferredLanguage || "No especificado"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Tipo de Viajero:</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {stats.travelerType.type.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Destinos Visitados:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.uniqueDestinations}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-6 border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" asChild>
                  <Link to="/profile">Gestionar Perfil</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Resumen de Viajes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Viajes Totales:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{trips.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Próximos:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{stats.upcomingTrips}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Completados:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{trips.length - stats.upcomingTrips}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Distribución:</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {stats.tripsByType.business}N / {stats.tripsByType.leisure}T / {stats.tripsByType.family}F
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

    </div>
  )
}