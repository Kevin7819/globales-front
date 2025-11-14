import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Separator } from "../../../components/ui/Separator";
import { Plane, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthApi } from "../../../services/AuthApi";
import { AnimatedPlanes } from "../../../components/ui/AnimatedPlanes";
import { AnimatedBackground } from "../../../components/ui/AnimatedBackgroundAuth";
import { AuthLogo } from "../../../components/ui/AuthLogo";
import { AuthCard } from "../../../components/ui/AuthCard";
import { useNotification } from "../../../components/Notification/useNotification";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // ✅ Validaciones antes de enviar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("El formato del correo no es válido.", "error");
    return;
  }

  if (!email || !password) {
    showNotification("Por favor completa todos los campos.", "error");
    return;
  }

  try {

    const result = await AuthApi.login(email, password);
    console.log("Respuesta del API:", result);

    // Login exitoso
    if (result.isSuccess) {
      showNotification(`Bienvenido de nuevo, ${result.user.name}`, "success");

      localStorage.setItem("token", result.user.token);
      localStorage.setItem("userId", result.user.id.toString());

      setTimeout(() => navigate("/dashboard"), 3000);
      return;
    }

    showNotification(result.message || "Credenciales incorrectas.", "error");

  } catch (err) {
    console.error("Error al llamar al API:", err);
    showNotification("Error al conectar con el servidor.", "error");
  }
  
};


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground variant="clouds" className="z-1" />

      <AnimatedPlanes count={2} opacity={0.3} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <AuthLogo subtitle="Tu viaje comienza aquí" />

        <AuthCard
          icon={<Plane className="w-8 h-8 text-white" />}
          title="Iniciar Sesión"
          subtitle="Accede a tu asistente de viajes personalizado"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-semibold drop-shadow-sm">
                Correo electrónico
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="text-white/70 h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="pl-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium
                            placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50
                            transition-all drop-shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold drop-shadow-sm">
                Contraseña
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="text-white/70 h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 rounded-xl bg-white/20 border-white/30 text-gray-800 font-medium
                            placeholder:text-gray-600 focus:border-white focus:ring-2 focus:ring-white/50
                            transition-all drop-shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button
              type="submit"
              className="w-full h-12 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold drop-shadow-md"
              style={{ 
                background: '#19bdba',
                color: 'white'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <Separator className="my-6 bg-white/40" />

            <div className="text-center">
              <p className="text-white font-medium drop-shadow-sm">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-white font-bold hover:opacity-80 transition-opacity underline drop-shadow-md"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}