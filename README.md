 Globales Front

Este proyecto es la interfaz frontend para Globales, desarrollado con React + TypeScript, utilizando TailwindCSS para estilos y componentes UI reutilizables creados manualmente.

La aplicación está pensada como un asistente de viajes, con módulos de autenticación, dashboard y navegación.

 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu entorno:

Node.js
 (versión 16.x o superior)

npm
 (incluido con Node.js)

Git
 para clonar el repositorio

Un editor de código (recomendado VS Code
)

⚙️ Instalación del proyecto

Clonar el repositorio

git clone https://github.com/Kevin7819/globales-front.git
cd globales-front/app


Instalar dependencias

npm install


Ejecutar el servidor en modo desarrollo

npm start


La aplicación correrá en:
👉 http://localhost:3000

Compilar para producción

npm run build


Esto generará los archivos optimizados en la carpeta /build.

📂 Estructura del proyecto
app/
├── public/                # Archivos estáticos
├── src/                   # Código fuente
│   ├── auth/              # Páginas de autenticación
│   ├── components/        # Componentes reutilizables
│   │   └── ui/            # Componentes UI (Button, Card, Input, Label, Separator, etc.)
│   ├── dashboard/         # Módulo de dashboard
│   ├── home/              # Página de inicio
│   ├── pages/             # Otras páginas
│   ├── App.tsx            # Componente principal
│   ├── index.tsx          # Punto de entrada
│   ├── layout.tsx         # Layout general
│   └── styles/            # Estilos globales (Tailwind, CSS)
├── package.json           # Configuración de dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Documentación del proyecto

🚀 Scripts disponibles

En el directorio del proyecto puedes ejecutar:

npm start → Ejecuta el proyecto en modo desarrollo

npm test → Lanza los tests configurados

npm run build → Compila para producción

npm run eject → Expone la configuración de CRA (⚠️ irreversible)