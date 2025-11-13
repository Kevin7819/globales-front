import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Globe, Bell, Settings, User as UserIcon, LogOut, Plane } from "lucide-react";
import { UserApi } from "../../services/UserApi";
import type { User } from "../../types";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export default function Header() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // Fetch current user from API
  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Iniciales del usuario
  const userInitials = currentUser?.UserName
    ? currentUser.UserName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "US";

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="animate-pulse bg-gray-300 h-8 w-32 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-10 w-10 rounded-full"></div>
        </div>
      </div>
    );

  const linkClass = (path: string) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-all duration-200"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200";




  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/resources/orbis-sin-fondo.webp"
                alt="Orbis Airlines"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/dashboard" className={`${linkClass("/dashboard")} flex items-center gap-2 font-medium`}>
              <Plane className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/trips" className={`${linkClass("/trips")} font-medium hover:scale-105 transition-transform`}>
              Mis Viajes
            </Link>
            <Link to="/travel-guides" className={`${linkClass("/travel-guides")} font-medium hover:scale-105 transition-transform`}>
              Guías de Viaje
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Globe className="h-4 w-4" />
              <span className="text-sm">ES</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-gray-700">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser?.UserName || "Usuario"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentUser?.email || "Mi cuenta"}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.UserName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser?.email}</div>
                </div>

                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link to="/profile" className="flex items-center gap-3 w-full px-3 py-2 text-sm">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />

                <DropdownMenuItem
                  onClick={() => setShowLogoutModal(true)}
                  className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 px-3 py-2 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmModal
              isOpen={showLogoutModal}
              title="¿Cerrar sesión?"
              message="Se cerrará tu sesión actual. Tendrás que iniciar sesión nuevamente para continuar."
              confirmText="cerrar sesión"
              cancelText="Cancelar"
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutModal(false)}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/trips" className={linkClass("/trips")}>
            Viajes
          </Link>
          <Link to="/travel-guides" className={linkClass("/travel-guides")}>
            Guías
          </Link>
        </nav>
      </div>
    </header>
  );
}
