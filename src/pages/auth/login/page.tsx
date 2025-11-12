import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Separator } from "../../../components/ui/Separator";
import { Globe, User, Lock } from "lucide-react";
import { AuthApi } from "../../../services/AuthApi";
import { useNotification } from "../../../components/Notification/useNotification";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orbis</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Inicia sesión en tu cuenta</p>
        </div>

        {/* Card de login */}
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu asistente de viajes personalizado</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Iniciar Sesión
              </Button>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
