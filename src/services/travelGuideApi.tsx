import Api from "./Api";
import { fetchCountries } from "./LocationApi";
import { QuickGuideResponse, SafetyGuide, HealthGuide, CultureGuide, CountryInfo } from "../types";

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
        name: countryName
      };
    });
  },
};
