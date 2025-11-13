import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { StatCard } from "../../components/ui/StatCard";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";
import { 
  MapPin, Shield, Heart, MessageCircle, Bell, Settings, Plane, 
  Globe, Users, Award, Clock, Briefcase, Compass, Zap, Palette, Scale 
} from "lucide-react";
import UserNotFound from "../../components/UserNotFound";
import QuickActionCard from "../../components/ui/QuickActionCard";
import { useDashboard } from "../../hooks/useDashboard";
import { TripCard } from "../../components/ui/TripCard";
import { EmptyTripsState } from "../../components/ui/EmptyTripsState";

export default function DashboardPage() {
  const { user, trips, loading, stats, userInitials } = useDashboard();

  // Loading and error states
  if (loading) return <LoadingSkeleton />;
  if (!user) return <UserNotFound />;

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

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total de Viajes"
              value={stats.totalTripsBasedOnAccount}
              description={`${stats.upcomingTrips} próximos`}
              icon={<Plane className="h-14 w-14 text-blue-200" />}
              gradient="from-blue-600 to-blue-700"
            />
            
            <StatCard
              title="Tipo de Viajero"
              value={stats.travelerType.type}
              description={stats.travelerType.description}
              icon={<TravelerTypeIcon className="h-12 w-12 text-opacity-80" />}
              gradient={stats.travelerType.color}
            />
            
            <StatCard
              title={stats.nextTrip ? "Próximo Viaje" : "Sin Viajes Próximos"}
              value={stats.nextTrip ? stats.nextTrip.destination : "Planificar"}
              description={stats.nextTrip ? stats.nextTrip.status : "Agrega tu primer viaje"}
              icon={stats.nextTrip ? <Clock className="h-14 w-14 text-green-200" /> : <Award className="h-14 w-14 text-green-200" />}
              gradient="from-green-600 to-green-700"
            />
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
                <EmptyTripsState />
              ) : (
                <div className="space-y-4">
                  {trips
                    .filter(trip => new Date(trip.departureDate) > new Date())
                    .slice(0, 3)
                    .map((trip) => (
                      <TripCard key={trip.tripId} trip={trip} />
                    ))}
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

            {/* Travel Summary */}
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
  );
}