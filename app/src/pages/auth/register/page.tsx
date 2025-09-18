import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Separator } from "../../../components/ui/Separator"
import { Globe, Mail, Lock, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })


  // Manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  // Manejar el submit del formulario de registro
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    console.log("Register with:", form)
    // 👉 Aquí iría la lógica para registrar (API)
    navigate("/dashboard") // redirigir al dashboard
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Se tiene que pensar</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Crea tu cuenta gratuita</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
            <CardDescription>Únete a miles de viajeros inteligentes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" placeholder="Juan" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" placeholder="Pérez" value={form.lastName} onChange={handleChange} required />
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
                    value={form.email}
                    onChange={handleChange}
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
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Acepto los{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                    política de privacidad
                  </Link>
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Crear Cuenta
              </Button>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
