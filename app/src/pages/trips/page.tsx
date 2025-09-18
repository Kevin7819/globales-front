"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/Dialog"
import { Plus, Plane, CalendarDays, Clock } from "lucide-react"

type Trip = {
  id: number
  destination: string
  flight: string
  departure: string
  return: string
  type: string
  status: "upcoming" | "past"
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      destination: "Tokio, Japón",
      flight: "NH123",
      departure: "2025-11-10",
      return: "2025-11-25",
      type: "Turismo",
      status: "upcoming",
    },
    {
      id: 2,
      destination: "Madrid, España",
      flight: "IB456",
      departure: "2024-12-05",
      return: "2024-12-20",
      type: "Negocios",
      status: "past",
    },
  ])

  const [formData, setFormData] = useState<Omit<Trip, "id" | "status">>({
    destination: "",
    flight: "",
    departure: "",
    return: "",
    type: "",
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: trips.length + 1,
      ...formData,
      status: new Date(formData.departure) > new Date() ? "upcoming" : "past",
    }
    setTrips([...trips, newTrip])
    setFormData({ destination: "", flight: "", departure: "", return: "", type: "" })
    setDialogOpen(false)
  }

  const upcoming = trips.filter((t) => t.status === "upcoming")
  const past = trips.filter((t) => t.status === "past")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header con botón */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mis Viajes</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Agregar viaje
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar nuevo viaje</DialogTitle>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddTrip()
                }}
              >
                <Input
                  placeholder="Destino"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
                <Input
                  placeholder="Número de vuelo"
                  value={formData.flight}
                  onChange={(e) => setFormData({ ...formData, flight: e.target.value })}
                />
                <Input
                  type="date"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                />
                <Input
                  type="date"
                  value={formData.return}
                  onChange={(e) => setFormData({ ...formData, return: e.target.value })}
                />

                <Select onValueChange={(value: string) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de viaje" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Turismo">Turismo</SelectItem>
                    <SelectItem value="Negocios">Negocios</SelectItem>
                    <SelectItem value="Salud">Salud</SelectItem>
                  </SelectContent>
                </Select>

                <Button type="submit" className="w-full">
                  Guardar
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Próximos viajes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Próximos viajes</h2>
          {upcoming.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcoming.map((trip) => (
                <Card key={trip.id} className="shadow-md hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      {trip.destination}
                    </CardTitle>
                    <CardDescription>Vuelo: {trip.flight}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span>Salida: {trip.departure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Regreso: {trip.return}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Tipo: {trip.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No tienes viajes próximos.</p>
          )}
        </section>

        {/* Historial */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Historial de viajes</h2>
          {past.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {past.map((trip) => (
                <Card key={trip.id} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-gray-500" />
                      {trip.destination}
                    </CardTitle>
                    <CardDescription>Vuelo: {trip.flight}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span>Salida: {trip.departure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Regreso: {trip.return}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Tipo: {trip.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No tienes historial de viajes.</p>
          )}
        </section>
      </div>
    </div>
  )
}
