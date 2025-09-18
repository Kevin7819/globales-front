import React, { useState } from "react"

export interface SelectProps {
  children: React.ReactNode
  onValueChange?: (value: string) => void
}

export function Select({ children, onValueChange }: SelectProps) {
  return <div>{React.Children.map(children, (child) => child)}</div>
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function SelectTrigger({ children, className, onClick }: SelectTriggerProps) {
  return (
    <div
      onClick={onClick}
      className={`border p-2 rounded cursor-pointer ${className || ""}`}
    >
      {children}
    </div>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="border mt-1 rounded bg-white">{children}</div>
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div
      className="p-2 cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (typeof value === "string") {
          // llamar a onValueChange si existe
        }
      }}
    >
      {children}
    </div>
  )
}
