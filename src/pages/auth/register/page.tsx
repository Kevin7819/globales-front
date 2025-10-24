import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Separator } from "../../../components/ui/Separator"
import { Globe, Mail, Lock, Calendar } from "lucide-react"
import { AuthApi } from "../../../services/AuthApi"
import { fetchCountries, fetchLanguages } from "../../../services/LocationApi"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"
import { useNotification } from "../../../components/Notification/useNotification"

export default function RegisterPage() {
  const navigate = useNavigate()

  // Notification 
  const { showNotification } = useNotification()


  // --- States ---
  const [countries, setCountries] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOrigin: "",
    preferredLanguage: "",
    birthDate: ""
  })

  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  // --- Load countries and languages ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cList, lList] = await Promise.all([fetchCountries(), fetchLanguages()])
        setCountries(cList)
        setLanguages(lList)
      } catch (error) {
        console.error("[RegisterPage] Error loading countries/languages:", error)
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  // --- Handle country change ---
  const handleCountryChange = (val: string) => {
    setForm({ ...form, countryOfOrigin: val })
  }

  // --- Handle language change ---
  const handleLanguageChange = (val: string) => {
    setForm({ ...form, preferredLanguage: val })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.firstName.trim().length < 2) {
      showNotification("El nombre debe tener al menos 2 caracteres", "warning")
      return
    }
    if (form.lastName.trim().length < 2) {
      showNotification("El apellido debe tener al menos 2 caracteres", "warning")
      return
    }
    if (form.password.length < 6) {
      showNotification("La contraseña debe tener al menos 6 caracteres", "warning")
      return
    }
    if (form.password !== form.confirmPassword) {
      showNotification("Las contraseñas no coinciden", "error")
      return
    }
    if (!form.countryOfOrigin || !form.preferredLanguage) {
      showNotification("Por favor selecciona tu país e idioma preferido", "warning")
      return
    }
    if (!form.birthDate) {
      showNotification("Por favor selecciona tu fecha de nacimiento", "warning")
      return
    }

    // Validar que no sea una fecha futura
    const selectedDate = new Date(form.birthDate)
    const now = new Date()
    if (selectedDate > now) {
      showNotification("La fecha de nacimiento no puede ser posterior a hoy", "warning")
      return
    }

    try {
      setLoading(true)
      const userName = `${form.firstName} ${form.lastName}`.trim()

      const response = await AuthApi.register(
        userName,
        form.email,
        form.password,
        form.countryOfOrigin,
        form.preferredLanguage,
        selectedDate
      )

      if (response.isSuccess) {
        showNotification("Cuenta creada con éxito. ¡Ahora puedes iniciar sesión!", "success")
        navigate("/login")
      } else {
         showNotification(response.message || "Error en el registro", "error")
      }
    } catch (error: any) {
      console.error("[RegisterPage] Registration error:", error)
      showNotification("Hubo un problema al registrar. Intenta de nuevo.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orbis</h1>
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
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Pérez"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Fecha de nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    max={today} // <-- no permitir fechas futuras
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* País */}
              <div className="space-y-2">
                <Label htmlFor="countryOfOrigin">País de Origen</Label>
                <Select
                  value={form.countryOfOrigin}
                  onValueChange={handleCountryChange}
                  disabled={loadingData}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Idioma */}
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Idioma Preferido</Label>
                <Select
                  value={form.preferredLanguage}
                  onValueChange={handleLanguageChange}
                  disabled={loadingData}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" disabled={loading || loadingData}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
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