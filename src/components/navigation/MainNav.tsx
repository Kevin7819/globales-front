import React from "react"
import { NavLink } from "react-router-dom"

export const MainNav: React.FC = () => (
  <nav className="bg-white shadow p-4">
    <ul className="flex gap-6">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profilePage"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
          }
        >
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
)
