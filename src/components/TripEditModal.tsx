// src/components/TripEditModal.tsx
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";

interface Trip {
  id: number;
  destination: string;
  date: string;
  returnDate?: string;
  airline: string;
  status: string;
  progress: number;
  type?: string;
}

interface TripEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onSave: (updatedData: {
    destination: string;
    flightNumber: string;
    departureDate: string;
    returnDate: string;
    type: string;
  }) => void;
}

export default function TripEditModal({ isOpen, onClose, trip, onSave }: TripEditModalProps) {
  const [destination, setDestination] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [type, setTripType] = useState("personal");

  useEffect(() => {
    if (trip) {
      setDestination(trip.destination);
      setFlightNumber(trip.airline);
      setDepartureDate(trip.date);
      setReturnDate(trip.returnDate || "");
      setTripType(trip.type || "personal");
    }
  }, [trip]);

  if (!isOpen) return null;

  const handleSave = () => {
  if (!destination.trim()) {
    alert("El país de destino es obligatorio.");
    return;
  }

  if (!flightNumber.trim()) {
    alert("El número de vuelo es obligatorio.");
    return;
  }

  if (!departureDate) {
    alert("Debes seleccionar una fecha de salida.");
    return;
  }

  if (!returnDate) {
    alert("Debes seleccionar una fecha de regreso.");
    return;
  }

  if (!type) {
    alert("Selecciona el tipo de viaje.");
    return;
  }

  onSave({ destination, flightNumber, departureDate, returnDate, type });
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Editar información del viaje ✈️
        </h2>

        <div className="space-y-4">
          {/* Destino */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              País de destino
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Ej. Estados Unidos"
            />
          </div>

          {/* Número de vuelo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Número de vuelo
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Ej. AA1234"
            />
          </div>

          {/* Fechas */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha de salida
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha de regreso
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Tipo de viaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tipo de viaje
            </label>
            <select
              value={type}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              <option value="personal">Personal</option>
              <option value="negocios">Negocios</option>
              <option value="vacaciones">Vacaciones</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    </div>
  );
}
