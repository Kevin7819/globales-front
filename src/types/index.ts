// ----------------------
// User and Authentication
// ----------------------
export interface User {
  UserId: number;
  email: string;
  role: string;
  token: string;
  UserName?: string;
  countryOfOrigin?: string;
  preferredLanguage?: string;
  birthDate?: string;
}

export interface AuthResponse {
  isSuccess: boolean;
  user?: User;
  message?: string;
}

// ----------------------
// Trips
// ----------------------
export interface Trip {
  tripId: number;
  userId: number;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  flightNumber?: string;
  type: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  reservationCode?: string;
  isUsed?: boolean;
}

export interface ClaimTripResponse {
  isSuccess: boolean;
  message: string;
  data?: any;
}

// ----------------------
// Guides
// ----------------------
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

// ----------------------
// Country Info
// ----------------------
export interface CountryInfo {
  code: string;
  name: string;
}
