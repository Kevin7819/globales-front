import React, { useState } from "react"

interface TabsProps {
  children: React.ReactNode
  defaultValue?: string
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultValue, className }) => {
  const [active, setActive] = useState(defaultValue)
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child as React.ReactElement<any>, { active, setActive })
      })}
    </div>
  )
}

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`flex border-b ${className}`}>{children}</div>
)

export const TabsTrigger: React.FC<TabsTriggerProps & { active?: string; setActive?: (v: string) => void }> = ({
  value,
  children,
  active,
  setActive,
}) => (
  <button
    className={`px-4 py-2 -mb-px font-medium border-b-2 ${
      active === value ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
    }`}
    onClick={() => setActive && setActive(value)}
  >
    {children}
  </button>
)

export const TabsContent: React.FC<TabsContentProps & { active?: string }> = ({ value, children, active }) => {
  if (active !== value) return null
  return <div className="pt-4">{children}</div>
}
