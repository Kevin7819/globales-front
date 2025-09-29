import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Separator } from "../../../components/ui/Separator"
import { Globe, Mail, Lock } from "lucide-react"
import { AuthApi } from "../../../services/AuthApi"
import { useEffect, useState } from "react"
import { fetchCountries, fetchLanguages } from "../../../services/LocationApi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"

export default function RegisterPage() {
  const navigate = useNavigate()

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
  })

  const [loading, setLoading] = useState(false)

  // --- Load countries and languages ---
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("[RegisterPage] Loading countries and languages...")
        const [cList, lList] = await Promise.all([fetchCountries(), fetchLanguages()])
        console.log("[RegisterPage] Fetched countries:", cList)
        console.log("[RegisterPage] Fetched languages:", lList)
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

  // --- Handle input change ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`[RegisterPage] Input changed: ${e.target.id} -> ${e.target.value}`)
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  // --- Handle country change ---
  const handleCountryChange = (val: string) => {
    console.log("[RegisterPage] Country selected:", val)
    setForm({ ...form, countryOfOrigin: val })
  }

  // --- Handle language change ---
  const handleLanguageChange = (val: string) => {
    console.log("[RegisterPage] Language selected:", val)
    setForm({ ...form, preferredLanguage: val })
  }

  // --- Handle form submit ---
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("[RegisterPage] Form submitted:", form)

    if (form.password !== form.confirmPassword) {
      console.warn("[RegisterPage] Passwords do not match")
      alert("Las contraseñas no coinciden")
      return
    }

    if (!form.countryOfOrigin || !form.preferredLanguage) {
      console.warn("[RegisterPage] Country or language not selected")
      alert("Por favor selecciona tu país e idioma preferido")
      return
    }

    try {
      setLoading(true)
      const userName = `${form.firstName} ${form.lastName}`.trim()
      console.log("[RegisterPage] Generated username:", userName)

      const response = await AuthApi.register(
        userName,
        form.email,
        form.password,
        form.countryOfOrigin,
        form.preferredLanguage
      )

      console.log("[RegisterPage] Response from backend:", response)

      if (response.isSuccess) {
        console.log("[RegisterPage] Registration successful")
        alert("Registro exitoso")
        navigate("/login")
      } else {
        console.warn("[RegisterPage] Registration failed:", response.message)
        alert(response.message || "Error en el registro")
      }
    } catch (error: any) {
      console.error("[RegisterPage] Registration error:", error)
      alert("Hubo un problema al registrar. Intenta de nuevo.")
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