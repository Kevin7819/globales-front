🌍 Viajes App — Frontend

Este proyecto es un frontend en React con TypeScript y TailwindCSS que se conecta a un backend (API REST) para manejar login, registro, y gestión de viajes.
Fue inicializado con Create React App
.

📦 Requisitos

Antes de comenzar, asegúrate de tener instalado:

Node.js
 (versión 18 o superior recomendada)

npm
 o yarn

🚀 Instalación

Clona el repositorio:

git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo


Instala las dependencias principales:

npm install


Instala Axios (para llamadas HTTP) y sus tipos:

npm install axios
npm install -D @types/axios


Instala TailwindCSS (si no está configurado):

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Edita tailwind.config.js y agrega:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}


En tu src/index.css (o src/app.css), incluye:

@tailwind base;
@tailwind components;
@tailwind utilities;

▶️ Scripts disponibles

En el directorio del proyecto, puedes ejecutar:

npm start

Ejecuta la app en modo desarrollo.
Abrir en: http://localhost:3000

npm run build

Genera la versión de producción optimizada en la carpeta build/.

npm test

Lanza el test runner en modo interactivo.

🔑 Conexión al Backend

Este proyecto usa Axios con un archivo central src/services/api.ts para manejar todas las llamadas a la API y los JWT Tokens.

Ejemplo de configuración (src/services/api.ts):

import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from "axios"

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia a la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de request: agrega token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Interceptor de response: maneja errores globales
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("Error API:", error.response.status)
    }
    return Promise.reject(error)
  }
)

export default api

🧑‍💻 Uso de la API en componentes

Ejemplo: Login (src/services/auth.ts):

import api from "./api"

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password })
  localStorage.setItem("token", res.data.token)
  return res.data
}


Ejemplo: Obtener viajes (src/services/trips.ts):

import api from "./api"

export async function getTrips() {
  const res = await api.get("/trips")
  return res.data
}

⚠️ Errores comunes

Cannot find module 'axios'
➝ Solución: npm install axios @types/axios

Property 'className' does not exist on type ...
➝ Tu componente custom necesita aceptar className en su interfaz de props.

Parameter 'error' implicitly has an 'any' type
➝ Tipar el parámetro como AxiosError.

📚 Recursos útiles

Axios Docs

TailwindCSS Docs

TypeScript React