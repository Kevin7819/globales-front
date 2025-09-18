import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Globe, Mail, Lock, User, MapPin, Plane } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de llamada a API
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir al dashboard
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Se tiene que pensar
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-300">
            Accede a tu asistente personal de viajes
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido de vuelta</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registro */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                  Completa tus datos para comenzar a viajar con confianza
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="firstName" placeholder="Juan" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">País de origen</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Select>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Selecciona tu país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mx">México</SelectItem>
                          <SelectItem value="es">España</SelectItem>
                          <SelectItem value="ar">Argentina</SelectItem>
                          <SelectItem value="co">Colombia</SelectItem>
                          <SelectItem value="pe">Perú</SelectItem>
                          <SelectItem value="cl">Chile</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelType">Tipo de viajero</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Select>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="¿Cómo viajas normalmente?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Negocios</SelectItem>
                          <SelectItem value="leisure">Turismo</SelectItem>
                          <SelectItem value="mixed">Mixto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Al continuar, aceptas nuestros{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </div>
  )
}
