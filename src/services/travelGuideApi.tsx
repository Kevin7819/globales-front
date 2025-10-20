import Api from "./Api";
import { fetchCountries } from "./LocationApi";

export interface QuickGuideResponse {
  countryCode: string;
  countryName: string;
  summary: string;
  keyPoints: string[];
  readingTimeMinutes: number;
}

export interface SafetyGuide {
  countryCode: string;
  mainRisks: Array<{ type: string; description: string }>;
  safeAreas: Array<{ name: string; description: string }>;
  avoidAreas: Array<{ name: string; description: string }>;
  emergencyContacts: Array<{ name: string; phone: string }>;
  practicalTips: string[];
  readingTimeMinutes: number;
}

export interface HealthGuide {
  countryCode: string;
  requiredVaccines: Array<{ name: string; description: string }>;
  healthRisks: Array<{ type: string; prevention: string }>;
  hygieneTips: string[];
  medicalServices: Array<{ name: string; address: string }>;
  insuranceTips: string[];
  readingTimeMinutes: number;
}

export interface CultureGuide {
  countryCode: string;
  basicEtiquette: Array<{ rule: string; description: string }>;
  clothingRules: Array<{ situation: string; recommendation: string }>;
  localCustoms: Array<{ name: string; description: string }>;
  timingExpectations: string[];
  tippingPractices: string[];
  readingTimeMinutes: number;
}

export interface CountryInfo {
  code: string;
  name: string;
  region: string;
}

export const TravelGuideApi = {
  getQuickGuide: async (countryCode: string, lang: string = "es"): Promise<QuickGuideResponse> => {
    const response = await Api.get(`/TravelGuides/quick/${countryCode}?lang=${lang}`);
    return response.data;
  },

  getSafetyGuide: async (countryCode: string, lang: string = "es"): Promise<SafetyGuide> => {
    const response = await Api.get(`/TravelGuides/safety/${countryCode}?lang=${lang}`);
    return response.data;
  },

  getHealthGuide: async (countryCode: string, lang: string = "es"): Promise<HealthGuide> => {
    const response = await Api.get(`/TravelGuides/health/${countryCode}?lang=${lang}`);
    return response.data;
  },

  getCultureGuide: async (countryCode: string, lang: string = "es"): Promise<CultureGuide> => {
    const response = await Api.get(`/TravelGuides/culture/${countryCode}?lang=${lang}`);
    return response.data;
  },

  getAvailableCountries: async (): Promise<CountryInfo[]> => {
    const countryNames = await fetchCountries();
    
    return countryNames.map((countryName: string) => {
      const code = countryName.substring(0, 3).toLowerCase();
      return {
        code,
        name: countryName,
        region: getCountryRegion(countryName),
      };
    });
  },
};

function getCountryRegion(countryName: string): string {
  const regions: { [key: string]: string } = {
    "United States": "América", "Canada": "América", "Mexico": "América",
    "Brazil": "América", "Argentina": "América", "Colombia": "América",
    "Chile": "América", "Peru": "América", "Costa Rica": "América",
    "Spain": "Europa", "France": "Europa", "Germany": "Europa", "Italy": "Europa",
    "United Kingdom": "Europa", "Portugal": "Europa", "Japan": "Asia",
    "China": "Asia", "India": "Asia", "South Korea": "Asia", "Australia": "Oceanía",
  };
  return regions[countryName] || "Otros";
}