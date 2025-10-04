import { useState } from "react"

export default function NewTripPage() {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    date: "",
    description: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo viaje:", formData)
    // 🚨 Aquí deberías hacer POST a tu API
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo viaje</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destino</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar viaje
        </button>
      </form>
    </div>
  )
}
