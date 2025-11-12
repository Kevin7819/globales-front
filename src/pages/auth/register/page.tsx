import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Separator } from "../../../components/ui/Separator";
import { User, Mail, Lock, Calendar, Eye, EyeOff } from "lucide-react";
import { AuthApi } from "../../../services/AuthApi";
import { fetchCountries, fetchLanguages } from "../../../services/LocationApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select";
import { AnimatedPlanes } from "../../../components/ui/AnimatedPlanes";
import { AnimatedBackground } from "../../../components/ui/AnimatedBackgroundAuth";
import { AuthLogo } from "../../../components/ui/AuthLogo";
import { AuthCard } from "../../../components/ui/AuthCard";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOrigin: "",
    preferredLanguage: "",
    birthDate: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cList, lList] = await Promise.all([fetchCountries(), fetchLanguages()]);
        setCountries(cList);
        setLanguages(lList);
      } catch (error) {
        console.error("[RegisterPage] Error loading countries/languages:", error);
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleCountryChange = (val: string) => {
    setForm({ ...form, countryOfOrigin: val });
  };

  const handleLanguageChange = (val: string) => {
    setForm({ ...form, preferredLanguage: val });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.firstName.trim().length < 2) return alert("El nombre debe tener al menos 2 caracteres");
    if (form.lastName.trim().length < 2) return alert("El apellido debe tener al menos 2 caracteres");
    if (form.password.length < 6) return alert("La contraseña debe tener al menos 6 caracteres");
    if (form.password !== form.confirmPassword) return alert("Las contraseñas no coinciden");
    if (!form.countryOfOrigin || !form.preferredLanguage) return alert("Selecciona país e idioma");
    if (!form.birthDate) return alert("Selecciona tu fecha de nacimiento");

    const selectedDate = new Date(form.birthDate);
    const now = new Date();
    if (selectedDate > now) return alert("La fecha no puede ser futura");

    try {
      setLoading(true);
      const userName = `${form.firstName} ${form.lastName}`.trim();
      const response = await AuthApi.register(
        userName,
        form.email,
        form.password,
        form.countryOfOrigin,
        form.preferredLanguage,
        selectedDate
      );

      if (response.isSuccess) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert(response.message || "Error en el registro");
      }
    } catch (error: any) {
      alert("Hubo un problema al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-8">
      {/* Fondo con nubes */}
      <AnimatedBackground variant="clouds" className="z-1" />

      {/* Aviones animados */}
      <AnimatedPlanes count={2} opacity={0.3} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <AuthLogo subtitle="Crea tu cuenta" />

        <AuthCard
          icon={<User className="w-8 h-8 text-white" />}
          title="Crear Cuenta"
          subtitle="Únete a miles de viajeros inteligentes"
        >
          <form onSubmit={handleRegister} className="space-y-6" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-semibold drop-shadow-sm">Nombre</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <User className="text-white/70 h-5 w-5" />
                  </div>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    className="pl-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all drop-shadow-sm"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white font-semibold drop-shadow-sm">Apellido</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <User className="text-white/70 h-5 w-5" />
                  </div>
                  <Input
                    id="lastName"
                    placeholder="Pérez"
                    className="pl-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all drop-shadow-sm"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold drop-shadow-sm">Correo electrónico</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="text-white/70 h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all drop-shadow-sm"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold drop-shadow-sm">Contraseña</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="text-white/70 h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all drop-shadow-sm"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold drop-shadow-sm">Confirmar Contraseña</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="text-white/70 h-5 w-5" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all drop-shadow-sm"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold drop-shadow-sm">Fecha de Nacimiento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-6 w-6 z-10" />
                <Input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={handleChange}
                  max={today}
                  className="pl-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50 transition-all relative z-0 [color-scheme:dark] drop-shadow-sm"
                  required
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-semibold drop-shadow-sm">País de Origen</Label>
                <Select value={form.countryOfOrigin} onValueChange={handleCountryChange} disabled={loadingData}>
                  <SelectTrigger className="h-12 rounded-xl bg-white/20 border-white/30 text-white font-medium data-[placeholder]:text-white/50 hover:bg-white/30 transition-colors px-3 drop-shadow-sm">
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-800 shadow-lg rounded-lg">
                    {countries.map((country) => (
                      <SelectItem 
                        key={country} 
                        value={country} 
                        className="hover:bg-[#19BDBA] hover:text-white transition-colors"
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-semibold drop-shadow-sm">Idioma Preferido</Label>
                <Select value={form.preferredLanguage} onValueChange={handleLanguageChange} disabled={loadingData}>
                  <SelectTrigger className="h-12 rounded-xl bg-white/20 border-white/30 text-white font-medium data-[placeholder]:text-white/50 hover:bg-white/30 transition-colors px-3 drop-shadow-sm">
                    <SelectValue placeholder="Selecciona tu idioma" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-800 shadow-lg rounded-lg">
                    {languages.map((lang) => (
                      <SelectItem 
                        key={lang} 
                        value={lang} 
                        className="hover:bg-[#19BDBA] hover:text-white transition-colors"
                      >
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg mt-6 font-semibold drop-shadow-md"
              style={{ 
                background: '#19bdba',
                color: 'white'
              }}
              disabled={loading || loadingData}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando cuenta...
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>

            <Separator className="my-6 bg-white/40" />

            <div className="text-center">
              <p className="text-white font-medium drop-shadow-sm">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-white font-bold hover:opacity-80 transition-opacity underline drop-shadow-md"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}