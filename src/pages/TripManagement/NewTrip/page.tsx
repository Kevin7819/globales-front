import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "../../../components/ui/Card";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { PlaneTakeoff } from "lucide-react";
import { fetchCountries } from "../../../services/LocationApi";
import { TripApi } from "../../../services/TripApi";
import { useNavigate } from "react-router-dom";

export default function NewTripPage() {
  const [formData, setFormData] = useState({
    flightNumber: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    type: "Personal",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    setFormData({ ...formData, destination: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.flightNumber.trim()) return alert("Por favor ingresa el número de vuelo");
    if (!formData.destination) return alert("Por favor selecciona el país de destino");
    if (!formData.departureDate) return alert("Por favor selecciona la fecha de salida");
    if (!formData.returnDate) return alert("Por favor selecciona la fecha de regreso");

    const dep = new Date(formData.departureDate);
    const ret = new Date(formData.returnDate);
    if (dep > ret) return alert("La fecha de regreso no puede ser anterior a la de salida");

    try {
      setLoading(true);
      await TripApi.createTrip(formData);
      alert("Viaje creado correctamente");
      navigate("/trips", { state: { created: true } });
    } catch (error) {
      console.error("[NewTripPage] Error al crear viaje:", error);
      alert("Error al crear el viaje. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        {/* Header */}
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PlaneTakeoff className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Nuevo Viaje
            </h1>
          </div>
          <CardDescription>
            Completa la información de tu próximo vuelo
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Flight Number */}
            <div className="space-y-1">
              <Label htmlFor="flightNumber">Número de vuelo</Label>
              <Input
                id="flightNumber"
                name="flightNumber"
                placeholder="AA1234"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <Label htmlFor="destination">País de destino</Label>
              <Select
                value={formData.destination}
                onValueChange={handleCountryChange}
                disabled={loadingData}
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

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="departureDate">Fecha de salida</Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  min={today}
                  value={formData.departureDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="returnDate">Fecha de regreso</Label>
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  min={formData.departureDate || today}
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Trip Type */}
            <div className="space-y-1">
              <Label htmlFor="type">Tipo de viaje</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de viaje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Tourism">Turismo</SelectItem>
                  <SelectItem value="Business">Negocios</SelectItem>
                  <SelectItem value="Health">Salud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || loadingData}
            >
              {loading ? "Guardando..." : "Guardar Viaje"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
