// src/components/navigation/MainNav.tsx
import React from "react"

export const MainNav: React.FC = () => (
  <nav>
    <ul className="flex gap-4">
      <li><a href="/home" className="text-gray-700 hover:text-blue-600">Home</a></li>
      <li><a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a></li>
      <li><a href="/profile" className="text-gray-700 hover:text-blue-600">Profile</a></li>
    </ul>
  </nav>
)
