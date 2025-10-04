import { useParams } from "react-router-dom"

export default function TripDetailsPage() {
  const { id } = useParams()

  // Api
  const trip = {
    id,
    title: "Viaje a la playa",
    destination: "Puntarenas, Costa Rica",
    date: "2025-10-15",
    description: "Un viaje relajante para disfrutar del mar y la arena."
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Destino:</span> {trip.destination}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Fecha:</span> {trip.date}
      </p>
      <p className="text-gray-600 mt-4">{trip.description}</p>
    </div>
  )
}
