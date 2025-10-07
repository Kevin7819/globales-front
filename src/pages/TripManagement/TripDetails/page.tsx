import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TripApi } from "../../../services/TripApi"

export default function TripDetailsPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrip = async () => {
      try {
        setLoading(true)
        if (!id) return

        const data = await TripApi.getTripById(id)
        setTrip(data)
      } catch (err) {
        console.error("[TripDetailsPage] Error cargando el viaje:", err)
        setError("No se pudo cargar el viaje. Inténtalo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [id])

  if (loading) return <p className="p-6 text-gray-600">Cargando viaje...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!trip) return <p className="p-6 text-gray-600">No se encontró el viaje.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Destino:</span> {trip.destination}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Fecha salida:</span> {trip.departureDate}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Fecha regreso:</span> {trip.returnDate}
      </p>
      <p className="text-gray-600 mt-4">{trip.description || "Sin descripción"}</p>
    </div>
  )
}
