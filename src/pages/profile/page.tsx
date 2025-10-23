import { useEffect, useState } from "react"
import { UserApi } from "../../services/UserApi"
import type { User } from "../../types"
import { fetchCountries, fetchLanguages } from "../../services/LocationApi"

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

    const travelTypes = ["Negocios", "Turismo", "Estudios", "Familia", "Médico", "Otro"]

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
        setSuccess("Profile updated successfully")
        setTimeout(() => setSuccess(""), 3000)
      } catch (err: any) {
        console.error("Error updating profile:", err)
        setError(err.message || "Error updating profile")
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
            <p className="text-gray-600">Loading profile...</p>
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <a href="/dashboard" className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            ← Volver al Dashboard
          </a>
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">
              Gestiona tu información personal y preferencias de viaje
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Editar Perfil
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          )}
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="h-32 w-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  {userInitials}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.UserName || "Usuario"}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>


              {/* Stats */}
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-gray-600">Países</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-600">Viajes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">0%</div>
                    <div className="text-xs text-gray-600">Prep.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h3 className="font-semibold mb-2 text-gray-900">Sesión</h3>
              <p className="text-sm text-gray-600 mb-4">
                Cierra sesión de forma segura
              </p>
              <button
                onClick={handleLogout}
                className="w-full border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Información Personal
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Datos básicos de tu perfil
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.UserName}
                        onChange={(e) => handleInputChange('UserName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{user.UserName || "No especificado"}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      País
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser.countryOfOrigin}
                        onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar país</option>
                        {countries.map(countryOfOrigin => (
                          <option key={countryOfOrigin} value={countryOfOrigin}>
                            {countryOfOrigin}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="py-2 text-gray-900">{user.countryOfOrigin || "No especificado"}</p>
                    )}
                  </div>
                  
                </div>
                
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preferencias
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Configura tu idioma preferido
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idioma preferido
                  </label>
                  {isEditing ? (
                    <select
                      value={editedUser.preferredLanguage}
                      onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar idioma</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="py-2 text-gray-900">{user.preferredLanguage || "No especificado"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}