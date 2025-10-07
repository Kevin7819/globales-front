import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import Modal from "./Modal";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/Select";
import { fetchCountries } from "../services/LocationApi";
import { Trip } from "../types/types";

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

const formatDate = (isoDate: string) => isoDate?.split("T")[0] || "";

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function TripEditModal({
  isOpen,
  onClose,
  trip,
  onSave,
}: TripEditModalProps) {
  const [destination, setDestination] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [type, setTripType] = useState("Personal");
  const [countries, setCountries] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const cList = await fetchCountries();
        setCountries(cList);
      } catch (err) {
        console.error("[TripEditModal] Error al cargar países:", err);
      } finally {
        setLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (trip && isOpen) {
      setDestination(trip.destination || "");
      setFlightNumber(trip.flightNumber || "");
      setDepartureDate(formatDate(trip.departureDate));
      setReturnDate(trip.returnDate ? formatDate(trip.returnDate) : "");
      setTripType(capitalizeFirstLetter(trip.type || "Personal"));
    } else {
      setDestination("");
      setFlightNumber("");
      setDepartureDate("");
      setReturnDate("");
      setTripType("Personal");
    }
  }, [trip, isOpen]);

  const handleSave = () => {
    if (!flightNumber.trim()) return alert("Por favor ingresa el número de vuelo");
    if (!destination) return alert("Por favor selecciona el país de destino");
    if (!departureDate) return alert("Por favor selecciona la fecha de salida");
    if (!returnDate) return alert("Por favor selecciona la fecha de regreso");
    if (!type) return alert("Selecciona el tipo de viaje");

    const dep = new Date(departureDate);
    const ret = new Date(returnDate);
    if (dep > ret) return alert("La fecha de regreso no puede ser anterior a la de salida");

    onSave({ destination, flightNumber, departureDate, returnDate, type });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Editar información del viaje ✈️
      </h2>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="flightNumber">Número de vuelo</Label>
          <Input
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Ej. AA1234"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="destination">País de destino</Label>
          <Select
            value={destination}
            onValueChange={setDestination}
            disabled={loadingCountries}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona país" />
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

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="departureDate">Fecha de salida</Label>
            <Input
              id="departureDate"
              type="date"
              value={departureDate}
              min={today}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="returnDate">Fecha de regreso</Label>
            <Input
              id="returnDate"
              type="date"
              value={returnDate}
              min={departureDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>

        {/* Tipo de viaje */}
        <div className="space-y-1">
          <Label htmlFor="type">Tipo de viaje</Label>
          <Select value={type} onValueChange={setTripType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de viaje" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Turismo">Turismo</SelectItem>
              <SelectItem value="Negocios">Negocios</SelectItem>
              <SelectItem value="Salud">Salud</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </div>
    </Modal>
  );
}
