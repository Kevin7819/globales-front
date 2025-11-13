import { useEffect, useState } from "react"
import { UserApi } from "../../services/UserApi"
import type { User } from "../../types"
import { fetchCountries, fetchLanguages } from "../../services/LocationApi"
import { User, Mail, MapPin, Globe, Edit3, Save, X, LogOut, Plane } from "lucide-react"

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [user, setUser] = useState<User | null>(null)
    const [editedUser, setEditedUser] = useState<User | null>(null)

    const [countries, setCountries] = useState<string[]>([])
    const [languages, setLanguages] = useState<string[]>([])

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true)
        setError("")

        try {
          const userId = localStorage.getItem("userId")
          if (!userId) {
            setError("No active session found")
            window.location.href = "/login"
            return
          }

          // Cargar todo en paralelo
          const [countriesList, languagesList, userData] = await Promise.all([
            fetchCountries(),
            fetchLanguages(),
            UserApi.getCurrentUser(Number(userId)),
          ])

          setCountries(countriesList)
          setLanguages(languagesList)

          setUser(userData)
          setEditedUser(userData)
        } catch (err) {
          console.error("Error loading profile:", err)
          setError("Could not load profile. Please try again.")
        } finally {
          setIsLoading(false)
        }
      }

      loadData()
    }, [])

    const handleEdit = () => {
      setIsEditing(true)
      setError("")
      setSuccess("")
    }

    const handleCancel = () => {
      if (user) setEditedUser({ ...user })
      setIsEditing(false)
      setError("")
      setSuccess("")
    }

    const handleSave = async () => {
      if (!editedUser || !user) return
      setIsSaving(true)
      setError("")
      setSuccess("")

      try {
        await UserApi.updateUser(user.id, editedUser)
        setUser({ ...editedUser })
        setIsEditing(false)
        setSuccess("Perfil actualizado correctamente")
        setTimeout(() => setSuccess(""), 3000)
      } catch (err: any) {
        console.error("Error updating profile:", err)
        setError(err.message || "Error al actualizar el perfil")
      } finally {
        setIsSaving(false)
      }
    }

    const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      window.location.href = "/login"
    }

    const handleInputChange = (field: keyof User, value: any) => {
      if (!editedUser) return
      setEditedUser((prev) => ({ ...prev!, [field]: value }))
    }

    // Pantalla de carga
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      )
    }

    if (!user || !editedUser) {
      return null
    }

    const userInitials = user.UserName
      ? user.UserName
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : "US"

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <a 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plane className="h-4 w-4" />
                Volver al Dashboard
              </a>
            </div>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            )}
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              {success}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-32 w-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {userInitials}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{user.UserName || "Viajero Orbis"}</h2>
                <p className="text-gray-600 mb-4 flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>

                {/* Stats */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-xs text-gray-600">Viajes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-xs text-gray-600">Países</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">85%</div>
                      <div className="text-xs text-gray-600">Prep.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Acciones Rápidas
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 border border-gray-200">
                    <Plane className="h-5 w-5" />
                    Mis Reservas
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 border border-gray-200">
                    <MapPin className="h-5 w-5" />
                    Destinos Favoritos
                  </button>
                </div>
              </div>

              {/* Logout Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="font-semibold mb-2 text-gray-900 flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-red-600" />
                  Sesión
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Cierra sesión de forma segura en tu cuenta
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-200 text-red-600 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <User className="h-6 w-6 text-blue-600" />
                    Información Personal
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 ml-9">
                    Gestiona tus datos básicos de viajero
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nombre completo
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.UserName}
                          onChange={(e) => handleInputChange('UserName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Tu nombre completo"
                        />
                      ) : (
                        <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                          {user.UserName || "No especificado"}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Correo electrónico
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="tu@email.com"
                        />
                      ) : (
                        <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                          {user.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        País de origen
                      </label>
                      {isEditing ? (
                        <select
                          value={editedUser.countryOfOrigin}
                          onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Seleccionar país</option>
                          {countries.map(country => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                          {user.countryOfOrigin || "No especificado"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Idioma preferido
                      </label>
                      {isEditing ? (
                        <select
                          value={editedUser.preferredLanguage}
                          onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Seleccionar idioma</option>
                          {languages.map(lang => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                          {user.preferredLanguage || "No especificado"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <Globe className="h-6 w-6 text-green-600" />
                    Preferencias de Viaje
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 ml-9">
                    Configura tu experiencia de viaje ideal
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Clase preferida
                      </label>
                      <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                        Económica Premium
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de viajero
                      </label>
                      <p className="py-3 px-4 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                        Turista frecuente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}