import { useEffect, useState } from "react";
import { Card,CardContent,CardHeader,CardTitle,CardDescription} from "../../../components/ui/Card";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "../../../components/ui/Select";
import { Calendar, PlaneTakeoff } from "lucide-react";
import { fetchCountries } from "../../../services/LocationApi";
import { TripApi } from "../../../services/TripApi";

export default function NewTripPage() {
  const [formData, setFormData] = useState({
    flightNumber: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    type: "Personal", // valor por defecto (puedes cambiarlo)
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // --- Cargar países desde el API ---
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const cList = await fetchCountries();
        setCountries(cList);
      } catch (error) {
        console.error("[NewTripPage] Error al cargar países:", error);
      } finally {
        setLoadingData(false);
      }
    };
    loadCountries();
  }, []);

  // --- Manejadores ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    setFormData({ ...formData, destination: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.flightNumber.trim()) {
      alert("Por favor ingresa el número de vuelo");
      return;
    }
    if (!formData.destination) {
      alert("Por favor selecciona el país de destino");
      return;
    }
    if (!formData.departureDate) {
      alert("Por favor selecciona la fecha de salida");
      return;
    }
    if (!formData.returnDate) {
      alert("Por favor selecciona la fecha de regreso");
      return;
    }

    const dep = new Date(formData.departureDate);
    const ret = new Date(formData.returnDate);
    if (dep > ret) {
      alert("La fecha de regreso no puede ser anterior a la de salida");
      return;
    }

    try {
      setLoading(true);

      // --- Construir objeto para el backend ---
      const payload = {
        destination: formData.destination,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        flightNumber: formData.flightNumber,
        type: formData.type,
      };

      await TripApi.createTrip(payload);
      alert("Viaje creado correctamente");

      // Reiniciar formulario
      setFormData({
        flightNumber: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        type: "Personal",
      });
    } catch (error) {
      console.error("[NewTripPage] Error al crear viaje:", error);
      alert("Error al crear el viaje. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PlaneTakeoff className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nuevo Viaje
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Registra los detalles de tu próximo vuelo
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registrar Viaje</CardTitle>
            <CardDescription>Completa la información del vuelo</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Número de vuelo */}
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Número de vuelo</Label>
                <Input
                  id="flightNumber"
                  name="flightNumber"
                  placeholder="Ej: AA1234"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* País de destino */}
              <div className="space-y-2">
                <Label htmlFor="destination">País de destino</Label>
                <Select
                  value={formData.destination}
                  onValueChange={handleCountryChange}
                  disabled={loadingData}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el país de destino" />
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

              {/* Fecha de salida */}
              <div className="space-y-2">
                <Label htmlFor="departureDate">Fecha de salida</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    min={today}
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Fecha de regreso */}
              <div className="space-y-2">
                <Label htmlFor="returnDate">Fecha de regreso</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="returnDate"
                    name="returnDate"
                    type="date"
                    min={formData.departureDate || today}
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Tipo de viaje */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de viaje</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Negocios">Negocios</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botón */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || loadingData}
              >
                {loading ? "Guardando..." : "Guardar Viaje"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
