import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Plane,
  Globe,
  Settings
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Airline Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img 
                    src="/resources/orbis-logo-sin-fondo.webp" 
                    alt="Orbis Airlines" 
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <div>
                  <span className="text-2xl font-light text-gray-900 dark:text-white tracking-wider">ORBIS</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium">AIRLINES</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-lg">
                Orbis Airlines está trabajando en una futura asociación con otra aerolínea internacional para ampliar rutas y servicios. 
                Por ahora, operamos de manera independiente, manteniendo nuestro compromiso con la excelencia en servicio, seguridad y puntualidad. 
                Conectamos destinos y creamos experiencias para nuestros viajeros.
              </p>

              
              <div className="flex flex-col space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Aeropuerto Internacional, Terminal 3, Orbis Airlines</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>+1 (800) ORBIS-00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>info@orbis-airlines.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-600" />
              Enlaces Rápidos
            </h3>
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                Estado de Vuelos
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                Check-in Online
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                Gestión de Reservas
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                Información de Vuelo
              </a>
            </div>
          </div>

          {/* Services & Social */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Servicios
              </h3>
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                  Equipaje
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                  Asistencia Especial
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform">
                  Programa de Viajero
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Conecta con Nosotros
              </h3>
              <div className="flex space-x-3">
                <a 
                  href="https://www.instagram.com/kevinvebe/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/kevin-venegas-berm%C3%BAdez-22b314239/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Orbis Airlines. Operamos de manera independiente mientras se concreta la futura asociación con otra aerolínea. Todos los derechos reservados.
          </span>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Términos y Condiciones
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Aviso Legal
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}