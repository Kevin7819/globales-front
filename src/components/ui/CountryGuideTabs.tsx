import { useState } from 'react';
import { 
  BookOpen, 
  Shield, 
  Heart, 
  Users,
  Loader2 
} from 'lucide-react';
import type { CountryInfo, QuickGuideResponse, SafetyGuide, HealthGuide, CultureGuide } from "../../types";

interface CountryGuideTabsProps {
  country: CountryInfo;
  guideData: QuickGuideResponse | null;
  safetyGuide: SafetyGuide | null;
  healthGuide: HealthGuide | null;
  cultureGuide: CultureGuide | null;
  loading?: boolean;
}

export function CountryGuideTabs({ 
  country, 
  guideData, 
  safetyGuide, 
  healthGuide, 
  cultureGuide, 
  loading = false 
}: CountryGuideTabsProps) {
  const [activeTab, setActiveTab] = useState('quick');

  const renderQuickGuide = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Resumen</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{guideData?.summary}</p>
      </div>

      {guideData?.keyPoints && guideData.keyPoints.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Puntos Clave</h3>
          <ul className="space-y-2">
            {guideData.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSafetyGuide = () => (
    <div className="space-y-4">
      {safetyGuide?.mainRisks && safetyGuide.mainRisks.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Riesgos Principales</h3>
          <ul className="space-y-2">
            {safetyGuide.mainRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{risk.type}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{risk.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay información específica de seguridad disponible.</p>
      )}

      {safetyGuide?.practicalTips && safetyGuide.practicalTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Consejos Prácticos</h3>
          <ul className="space-y-1">
            {safetyGuide.practicalTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderHealthGuide = () => (
    <div className="space-y-4">
      {healthGuide?.healthRisks && healthGuide.healthRisks.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Riesgos de Salud</h3>
          <ul className="space-y-2">
            {healthGuide.healthRisks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{risk.type}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prevención: {risk.prevention}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay información específica de salud disponible.</p>
      )}

      {healthGuide?.hygieneTips && healthGuide.hygieneTips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Consejos de Higiene</h3>
          <ul className="space-y-1">
            {healthGuide.hygieneTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderCultureGuide = () => (
    <div className="space-y-4">
      {cultureGuide?.basicEtiquette && cultureGuide.basicEtiquette.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Etiqueta Básica</h3>
          <ul className="space-y-2">
            {cultureGuide.basicEtiquette.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{rule.rule}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay información específica de cultura disponible.</p>
      )}

      {cultureGuide?.tippingPractices && cultureGuide.tippingPractices.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Prácticas de Propina</h3>
          <ul className="space-y-1">
            {cultureGuide.tippingPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const tabs = [
    { 
      id: 'quick', 
      label: 'Guía Rápida', 
      icon: BookOpen,
      iconClass: 'text-blue-600'
    },
    { 
      id: 'safety', 
      label: 'Seguridad', 
      icon: Shield,
      iconClass: 'text-red-600'
    },
    { 
      id: 'health', 
      label: 'Salud', 
      icon: Heart,
      iconClass: 'text-green-600'
    },
    { 
      id: 'culture', 
      label: 'Cultura', 
      icon: Users,
      iconClass: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600 dark:text-gray-400">Cargando información de {country.name}...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabs de navegación */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-b-2 border-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className={`h-4 w-4 ${activeTab === tab.id ? tab.iconClass : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'quick' && renderQuickGuide()}
        {activeTab === 'safety' && renderSafetyGuide()}
        {activeTab === 'health' && renderHealthGuide()}
        {activeTab === 'culture' && renderCultureGuide()}
      </div>
    </div>
  );
}