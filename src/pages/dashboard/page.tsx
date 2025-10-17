import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { MapPin, Calendar, Shield, Heart, MessageCircle, Bell, Settings, Plane, Globe, LogOut } from "lucide-react"
import { User, UserApi } from "../../services/UserApi"
import {DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger} from "../../components/ui/DropdownMenu"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUserId = localStorage.getItem("userId")
        if (!storedUserId) {
          throw new Error("No user ID found in localStorage")
        }

        const userData = await UserApi.getCurrentUser(Number(storedUserId))
        setUser(userData)
      } catch (err) {
        console.error("Failed to fetch user:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      window.location.href = "/login"
    }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading user...</div>
  }

  if (!user) {
    return <div className="p-8 text-center text-red-500">User not found</div>
  }

  const userInitials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "US"


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
                <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link to="/trips" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Viajes</Link>
                <Link to="/travel-guides" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">Guias de viaje</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm"><Bell className="h-4 w-4" /></Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" title="Configuración">
                    <Settings className="h-4 w-4 text-black dark:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full text-sm">Editar Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 text-sm">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">¡Bienvenido!, {user.name}</h1>
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

              {upcomingTrips.length === 0 ? (
                <p className="text-gray-500">No tienes viajes próximos.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <Card key={trip.id} className="hover:shadow-md transition-shadow">
                      {/* Renderizar detalles del viaje */}
                    </Card>
                  ))}
                </div>
              )}
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
                    <AvatarImage src={user.avatar || "/generic-user-avatar.png"} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">País:</span>
                    <span>{user.countryOfOrigin || "No especificado"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Idioma:</span>
                    <span>{user.preferredLanguage || "No especificado"}</span>
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
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Alertas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <p className="text-gray-500">No tienes alertas recientes.</p>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id}> {/* Renderizar alerta */} </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader><CardTitle>Estadísticas</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-500">Estadísticas no disponibles aún.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
