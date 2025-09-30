import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+52 555 123 4567",
    country: "México",
    city: "Ciudad de México",
    travelType: "Negocios",
    bio: "Ejecutivo de ventas que viaja frecuentemente por trabajo. Me gusta explorar la cultura local y probar nuevas comidas.",
    avatar: "/generic-user-avatar.png",
    preferences: {
      notifications: true,
      culturalAlerts: true,
      healthAlerts: true,
      language: "es"
    }
  })

  const [editedUser, setEditedUser] = useState({ ...user })

  const countries = [
    "México", "Estados Unidos", "Canadá", "España", "Francia", "Alemania", 
    "Reino Unido", "Italia", "Brasil", "Argentina", "Colombia", "Chile"
  ]

  const travelTypes = ["Negocios", "Turismo", "Estudios", "Familia", "Médico", "Otro"]
  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" }
  ]

  const handleEdit = () => {
    setIsEditing(true)
    setError("")
    setSuccess("")
  }

  const handleCancel = () => {
    setEditedUser({ ...user })
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setUser({ ...editedUser })
      setIsEditing(false)
      setSuccess("Perfil actualizado exitosamente")
      
      setTimeout(() => setSuccess(""), 3000)
      
    } catch (err) {
      setError("Error al actualizar el perfil. Intenta nuevamente.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert("Sesión cerrada exitosamente")
    } catch (err) {
      setError("Error al cerrar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent === 'preferences') {
        setEditedUser(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            [child]: value
          }
        }))
      }
    } else {
      setEditedUser(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-blue-600 rounded"></div>
                <span className="font-bold text-gray-900">Orbis</span>
              </div>
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a>
                <a href="/map" className="text-gray-600 hover:text-blue-600">Mapa</a>
                <a href="/chat" className="text-gray-600 hover:text-blue-600">Asistente</a>
                <a href="/trips" className="text-gray-600 hover:text-blue-600">Viajes</a>
                <a href="/profile" className="text-blue-600 font-medium">Perfil</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">Notificaciones</button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">Ajustes</button>
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                JP
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
            ← Volver al Dashboard
          </button>
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
                <div className="h-32 w-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center text-2xl font-medium text-gray-600">
                  JP
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-50">
                    
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                Viajero {user.travelType}
              </span>

              {/* Stats */}
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">Países</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-gray-600">Viajes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">87%</div>
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
                disabled={isLoading}
                className="w-full border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  👤 Información Personal
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
                        value={editedUser.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{user.name}</p>
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
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedUser.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{user.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      País
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {countries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="py-2 text-gray-900">{user.country}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{user.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de viaje principal
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser.travelType}
                        onChange={(e) => handleInputChange('travelType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {travelTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="py-2 text-gray-900">{user.travelType}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Biografía
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editedUser.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Cuéntanos un poco sobre ti y tus intereses de viaje..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="py-2 text-gray-900">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Preferencias
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Configura tus preferencias de notificaciones y idioma
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idioma
                  </label>
                  {isEditing ? (
                    <select
                      value={editedUser.preferences.language}
                      onChange={(e) => handleInputChange('preferences.language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="py-2 text-gray-900">
                      {languages.find(l => l.code === user.preferences.language)?.name}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Notificaciones</h4>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <label className="font-medium text-gray-700">Notificaciones generales</label>
                      <p className="text-sm text-gray-600">
                        Recibe actualizaciones sobre tus viajes
                      </p>
                    </div>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={editedUser.preferences.notifications}
                        onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    ) : (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.preferences.notifications 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.preferences.notifications ? "Activo" : "Inactivo"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <label className="font-medium text-gray-700">Alertas de salud</label>
                      <p className="text-sm text-gray-600">
                        Recomendaciones médicas para tus destinos
                      </p>
                    </div>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={editedUser.preferences.healthAlerts}
                        onChange={(e) => handleInputChange('preferences.healthAlerts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    ) : (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.preferences.healthAlerts 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.preferences.healthAlerts ? "Activo" : "Inactivo"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <label className="font-medium text-gray-700">Alertas culturales</label>
                      <p className="text-sm text-gray-600">
                        Tips culturales y de etiqueta
                      </p>
                    </div>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={editedUser.preferences.culturalAlerts}
                        onChange={(e) => handleInputChange('preferences.culturalAlerts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    ) : (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.preferences.culturalAlerts 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.preferences.culturalAlerts ? "Activo" : "Inactivo"}
                      </span>
                    )}
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