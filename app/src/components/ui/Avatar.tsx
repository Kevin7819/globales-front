// src/components/ui/Avatar.tsx
import React from "react"

interface AvatarProps {
  children: React.ReactNode
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ children, className }) => (
  <div className={`w-8 h-8 rounded-full overflow-hidden ${className}`}>{children}</div>
)

export const AvatarImage: React.FC<{ src: string }> = ({ src }) => (
  <img src={src} alt="Avatar" className="w-full h-full object-cover" />
)

export const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700">
    {children}
  </div>
)
