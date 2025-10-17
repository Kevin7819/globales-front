export interface Trip {
  tripId: number;
  userId: number;
  destination: string;
  departureDate: string;
  returnDate?: string; 
  flightNumber?: string;
  type: string;
}

export interface QuickGuideResponse {
  countryCode: string;
  countryName: string;
  summary: string;
  keyPoints: string[];
  readingTimeMinutes: number;
  content?: {
    introduction: string;
    details: string;
  };
}

export interface SafetyGuide {
  countryCode: string;
  mainRisks: Array<{
    type: string;
    description: string;
  }>;
  safeAreas: Array<{
    name: string;
    description: string;
  }>;
  avoidAreas: Array<{
    name: string;
    description: string;
  }>;
  emergencyContacts: Array<{
    name: string;
    phone: string;
  }>;
  practicalTips: string[];
  readingTimeMinutes: number;
}

export interface HealthGuide {
  countryCode: string;
  requiredVaccines: Array<{
    name: string;
    description: string;
  }>;
  healthRisks: Array<{
    type: string;
    prevention: string;
  }>;
  hygieneTips: string[];
  medicalServices: Array<{
    name: string;
    address: string;
  }>;
  insuranceTips: string[];
  readingTimeMinutes: number;
}

export interface CultureGuide {
  countryCode: string;
  basicEtiquette: Array<{
    rule: string;
    description: string;
  }>;
  clothingRules: Array<{
    situation: string;
    recommendation: string;
  }>;
  localCustoms: Array<{
    name: string;
    description: string;
  }>;
  timingExpectations: string[];
  tippingPractices: string[];
  readingTimeMinutes: number;
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  region: string;
}
