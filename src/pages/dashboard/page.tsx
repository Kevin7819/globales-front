import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Progress } from "../../components/ui/Progress"
import {
  MapPin,
  Calendar,
  Shield,
  Heart,
  MessageCircle,
  Bell,
  Settings,
  Plane,
  Globe,
  AlertTriangle,
  Clock,
} from "lucide-react"

export default function DashboardPage() {
  const [user] = useState({
    name: "Juan Pérez",
    email: "juan@email.com",
    country: "México",
    travelType: "Negocios",
    avatar: "/generic-user-avatar.png",
  })

  const [upcomingTrips] = useState([
    {
      id: 1,
      destination: "Tokio, Japón",
      date: "15 Mar 2024",
      airline: "AeroMéxico",
      status: "confirmed",
      healthScore: 85,
      culturalScore: 70,
    },
    {
      id: 2,
      destination: "París, Francia",
      date: "22 Abr 2024",
      airline: "Air France",
      status: "pending",
      healthScore: 95,
      culturalScore: 90,
    },
  ])

  const [alerts] = useState([
    {
      id: 1,
      type: "health",
      title: "Vacuna recomendada para Japón",
      description: "Se recomienda vacuna contra la encefalitis japonesa",
      priority: "medium",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      type: "cultural",
      title: "Costumbres importantes en Tokio",
      description: "Evita señalar con el dedo y quítate los zapatos en interiores",
      priority: "low",
      date: "Hace 1 día",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white">Orbis</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <Link to="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link to="/map" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  Mapa
                </Link>
                <Link to="/chat" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  Asistente
                </Link>
                <Link to="/trips" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
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
                <AvatarImage src={user.avatar || "/placeholder.svg"}  />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">¡Hola, {user.name}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Aquí tienes un resumen de tus próximos viajes y recomendaciones personalizadas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Trips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Próximos Viajes</h2>
                <Button variant="outline" asChild>
                  <Link to="/trips/new">
                    <Plane className="h-4 w-4 mr-2" />
                    Nuevo Viaje
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <Card key={trip.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            {trip.destination}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {trip.date}
                            </span>
                            <span>• {trip.airline}</span>
                          </CardDescription>
                        </div>
                        <Badge variant={trip.status === "confirmed" ? "default" : "secondary"}>
                          {trip.status === "confirmed" ? "Confirmado" : "Pendiente"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Salud</span>
                          </div>
                          <Progress value={trip.healthScore} className="h-2" />
                          <span className="text-xs text-gray-500">{trip.healthScore}% preparado</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">Cultural</span>
                          </div>
                          <Progress value={trip.culturalScore} className="h-2" />
                          <span className="text-xs text-gray-500">{trip.culturalScore}% preparado</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" asChild>
                          <Link to={`/map?destination=${encodeURIComponent(trip.destination)}`}>Ver en Mapa</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/trips/${trip.id}`}>Detalles</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acciones Rápidas</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                  <Link to="/map">
                    <CardContent className="p-6 text-center">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Explorar Destinos</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Descubre información sobre cualquier país
                      </p>
                    </CardContent>
                  </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                  <Link to="/chat">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Pregunta al Asistente</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Resuelve dudas sobre tu viaje</p>
                    </CardContent>
                  </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                  <Link to="/health">
                    <CardContent className="p-6 text-center">
                      <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Chequeo de Salud</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Verifica requisitos sanitarios</p>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Tu Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"}  />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">País:</span>
                    <span>{user.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Tipo de viaje:</span>
                    <span>{user.travelType}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                  <Link to="/profile">Editar Perfil</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alertas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {alert.type === "health" ? (
                          <Shield className="h-4 w-4 text-green-600" />
                        ) : alert.type === "cultural" ? (
                          <Heart className="h-4 w-4 text-red-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{alert.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                  <Link to="/alerts">Ver Todas</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Países visitados</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Viajes este año</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Preparación promedio</span>
                    <span className="font-semibold">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
