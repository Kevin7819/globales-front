import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Search, ArrowLeft, BookOpen, Loader2, X, Plane } from "lucide-react";
import { TravelGuideApi } from "../../services/travelGuideApi";
import type { Trip,  CountryInfo , QuickGuideResponse , SafetyGuide , HealthGuide , CultureGuide } from "../../types";
import { TripApi  } from "../../services/TripApi";

function CountryModal({ country, isOpen, onClose }: { 
  country: CountryInfo | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [guideData, setGuideData] = useState<QuickGuideResponse | null>(null);
  const [safetyGuide, setSafetyGuide] = useState<SafetyGuide | null>(null);
  const [healthGuide, setHealthGuide] = useState<HealthGuide | null>(null);
  const [cultureGuide, setCultureGuide] = useState<CultureGuide | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');

  useEffect(() => {
    if (isOpen && country) {
      loadAllGuides();
    }
  }, [isOpen, country]);

  const loadAllGuides = async () => {
    if (!country) return;
    
    try {
      setLoading(true);
      const [quickData, safetyData, healthData, cultureData] = await Promise.all([
        TravelGuideApi.getQuickGuide(country.code),
        TravelGuideApi.getSafetyGuide(country.code),
        TravelGuideApi.getHealthGuide(country.code),
        TravelGuideApi.getCultureGuide(country.code)
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

  const renderQuickGuide = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Resumen</h3>
        <p className="text-gray-700 leading-relaxed">{guideData?.summary}</p>
      </div>

      {guideData?.keyPoints && guideData.keyPoints.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Puntos Clave</h3>
          <ul className="space-y-2">
            {guideData.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSafetyGuide = () => (
    <div className="space-y-4">
      {safetyGuide?.mainRisks && safetyGuide.mainRisks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Riesgos Principales</h3>
          <ul className="space-y-2">
            {safetyGuide.mainRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div>
                  <span className="font-medium">{risk.type}</span>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {safetyGuide?.practicalTips && safetyGuide.practicalTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Consejos Prácticos</h3>
          <ul className="space-y-1">
            {safetyGuide.practicalTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderHealthGuide = () => (
    <div className="space-y-4">
      {healthGuide?.healthRisks && healthGuide.healthRisks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Riesgos de Salud</h3>
          <ul className="space-y-2">
            {healthGuide.healthRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div>
                  <span className="font-medium">{risk.type}</span>
                  <p className="text-sm text-gray-600">Prevención: {risk.prevention}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {healthGuide?.hygieneTips && healthGuide.hygieneTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Consejos de Higiene</h3>
          <ul className="space-y-1">
            {healthGuide.hygieneTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderCultureGuide = () => (
    <div className="space-y-4">
      {cultureGuide?.basicEtiquette && cultureGuide.basicEtiquette.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Etiqueta Básica</h3>
          <ul className="space-y-2">
            {cultureGuide.basicEtiquette.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <span className="font-medium">{rule.rule}</span>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cultureGuide?.tippingPractices && cultureGuide.tippingPractices.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Prácticas de Propina</h3>
          <ul className="space-y-1">
            {cultureGuide.tippingPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2" />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{country.name}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-1 px-6">
            {[
              { id: 'quick', label: 'Guía Rápida' },
              { id: 'safety', label: 'Seguridad' },
              { id: 'health', label: 'Salud' },
              { id: 'culture', label: 'Cultura' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Cargando información de {country.name}...</p>
            </div>
          ) : (
            <div>
              {activeTab === 'quick' && renderQuickGuide()}
              {activeTab === 'safety' && renderSafetyGuide()}
              {activeTab === 'health' && renderHealthGuide()}
              {activeTab === 'culture' && renderCultureGuide()}
            </div>
          )}

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
  const [tripLoading, setTripLoading] = useState(false);

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
      setTripLoading(true);
      const trip = await TripApi.getNearestTrip();
      setNearestTrip(trip);
    } catch (error) {
      console.error("Error loading nearest trip:", error);
      setNearestTrip(null);
    } finally {
      setTripLoading(false);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountryClick = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  // Encontrar el país del viaje más cercano
  const nearestTripCountry = nearestTrip 
    ? countries.find(country => 
        country.code.toLowerCase() === nearestTrip.countryCode?.toLowerCase() ||
        country.name.toLowerCase().includes(nearestTrip.destination.toLowerCase())
      )
    : null;

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Sección del Viaje más Cercano */}
        {nearestTrip && nearestTripCountry && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Plane className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Tu Próximo Viaje</h2>
                  <p className="text-blue-700">
                    {nearestTrip.destination} • {new Date(nearestTrip.departureDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => handleCountryClick(nearestTripCountry)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Ver Guía de {nearestTripCountry.name}
              </Button>
            </div>
          </div>
        )}

        {/* Todos los Países */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Países Disponibles ({filteredCountries.length})
          </h2>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p>No se encontraron países para "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCountries.map((country) => (
              <Card 
                key={country.code} 
                className="hover:shadow-md cursor-pointer"
                onClick={() => handleCountryClick(country)}
              >
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-lg mb-1">{country.name}</h3>
                  </div>
                  <Button size="sm" className="w-full">
                    Ver Guía Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CountryModal 
        country={selectedCountry}  
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}