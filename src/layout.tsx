import React from "react"
import { MainNav } from "./components/navigation/MainNav"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header Global */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Orbis</h1>
          <span className="text-sm text-gray-500">Globales 2025</span>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-blue-600 text-white shadow">
         {/*<MainNav /> */}
      </nav>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-600 text-sm">
          © 2025 Globales — Todos los derechos reservados
        </div>
      </footer>
    </div>
  )
}
