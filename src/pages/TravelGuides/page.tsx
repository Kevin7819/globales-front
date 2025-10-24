import { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Search, BookOpen, Loader2, X, Plane } from "lucide-react";
import { TravelGuideApi } from "../../services/travelGuideApi";
import type {
  Trip,
  CountryInfo,
  QuickGuideResponse,
  SafetyGuide,
  HealthGuide,
  CultureGuide,
} from "../../types";
import { TripApi } from "../../services/TripApi";
import { CountryGuideTabs } from "../../components/ui/CountryGuideTabs";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // Quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function CountryModal({
  country,
  isOpen,
  onClose,
}: {
  country: CountryInfo | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [guideData, setGuideData] = useState<QuickGuideResponse | null>(null);
  const [safetyGuide, setSafetyGuide] = useState<SafetyGuide | null>(null);
  const [healthGuide, setHealthGuide] = useState<HealthGuide | null>(null);
  const [cultureGuide, setCultureGuide] = useState<CultureGuide | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && country) loadAllGuides();
  }, [isOpen, country]);

  const loadAllGuides = async () => {
    if (!country) return;

    try {
      setLoading(true);
      const [quickData, safetyData, healthData, cultureData] = await Promise.all([
        TravelGuideApi.getQuickGuide(country.code),
        TravelGuideApi.getSafetyGuide(country.code),
        TravelGuideApi.getHealthGuide(country.code),
        TravelGuideApi.getCultureGuide(country.code),
      ]);

      setGuideData(quickData);
      setSafetyGuide(safetyData);
      setHealthGuide(healthData);
      setCultureGuide(cultureData);
    } catch (error) {
      console.error("Error loading guides:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{country.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <CountryGuideTabs
            country={country}
            guideData={guideData}
            safetyGuide={safetyGuide}
            healthGuide={healthGuide}
            cultureGuide={cultureGuide}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default function TravelGuidesPage() {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nearestTrip, setNearestTrip] = useState<Trip | null>(null);

  useEffect(() => {
    loadCountries();
    loadNearestTrip();
  }, []);

  const loadCountries = async () => {
    try {
      const data = await TravelGuideApi.getAvailableCountries();
      setCountries(data);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNearestTrip = async () => {
    try {
      const trip = await TripApi.getNearestTrip();
      setNearestTrip(trip);
    } catch (error) {
      console.error("Error loading nearest trip:", error);
      setNearestTrip(null);
    }
  };

  const filteredCountries = countries.filter((country) => {
    const name = normalizeText(country.name || "");
    const code = normalizeText(country.code || "");
    const query = normalizeText(searchQuery);
    return name.includes(query) || code.includes(query);
  });

  const handleCountryClick = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const nearestTripCountry =
    nearestTrip &&
    countries.find(
      (country) =>
        normalizeText(country.code) === normalizeText(nearestTrip.countryCode || "") ||
        normalizeText(country.name).includes(normalizeText(nearestTrip.destination || ""))
    );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando países...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* VIAJE MÁS CERCANO */}
        {nearestTrip && nearestTripCountry && (
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Plane className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    Tu Próximo Viaje
                  </h2>
                  <p className="text-blue-700 dark:text-blue-300">
                    {nearestTrip.destination} •{" "}
                    {new Date(nearestTrip.departureDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleCountryClick(nearestTripCountry)}
                className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Ver Guía de {nearestTripCountry.name}
              </Button>
            </div>
          </div>
        )}

        {/* BARRA DE BÚSQUEDA */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Guías de Viaje
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Descubre información detallada sobre seguridad, salud, cultura y más para cada destino.
              </p>
            </div>
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar por país o código..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {filteredCountries.length}{" "}
                  {filteredCountries.length === 1
                    ? "país encontrado"
                    : "países encontrados"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* LISTA DE PAÍSES */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Países Disponibles
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredCountries.length} de {countries.length})
              </span>
            </h2>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron países
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? `No hay resultados para "${searchQuery}". Intenta con otro término.`
                    : "No hay países disponibles en este momento."}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="border-gray-300 dark:border-gray-600"
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <Card
                  key={country.code}
                  className="hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  onClick={() => handleCountryClick(country)}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {country.code}
                      </p>
                    </div>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ver Guía Completa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <CountryModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
