import React, { useState, useEffect, ReactNode, ReactElement } from "react"

export interface SelectProps {
  children: ReactNode
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}

type SelectChildProps = { children?: ReactNode; [key: string]: any }
type SelectElement = ReactElement<SelectChildProps> & { type: { displayName?: string } }

export function Select({ children, value, onValueChange, disabled }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Puedes agregar lógica aquí si es necesario
  }, [value])

  const handleSelect = (val: string) => {
    if (onValueChange) onValueChange(val)
    setIsOpen(false)
  }

  const processChildren = (children: ReactNode, depth = 0): ReactNode => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child
      const element = child as SelectElement
      const props = element.props || {}

      if (element.type.displayName === "SelectTrigger") {
        return React.cloneElement(element, { 
          isOpen, 
          setIsOpen,
          children: processChildren(props.children, depth + 1)
        })
      }

      if (element.type.displayName === "SelectValue") {
        return React.cloneElement(element, { selectedValue: value })
      }

      if (element.type.displayName === "SelectContent") {
        return React.cloneElement(element, { 
          isOpen, 
          children: processChildren(props.children, depth + 1)
        })
      }

      if (element.type.displayName === "SelectItem") {
        return React.cloneElement(element, { selectedValue: value, onSelect: handleSelect })
      }

      if (props.children) {
        return React.cloneElement(element, {
          ...props,
          children: processChildren(props.children, depth + 1)
        })
      }

      return child
    })
  }

  return (
    <div className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {processChildren(children)}
    </div>
  )
}

interface SelectTriggerProps {
  children: ReactNode
  isOpen?: boolean
  setIsOpen?: (val: boolean) => void
  className?: string
}

export function SelectTrigger({ children, isOpen, setIsOpen, className }: SelectTriggerProps) {
  return (
    <div
      onClick={() => {
        setIsOpen && setIsOpen(!isOpen)
      }}
      className={`border p-2 rounded cursor-pointer ${className || ""}`}
    >
      {children}
    </div>
  )
}
SelectTrigger.displayName = "SelectTrigger"

export function SelectValue({ selectedValue, placeholder }: { selectedValue?: string; placeholder?: string }) {
  return <span>{selectedValue || placeholder}</span>
}
SelectValue.displayName = "SelectValue"

export function SelectContent({ 
  children, 
  isOpen, 
  className 
}: { 
  children: ReactNode; 
  isOpen?: boolean;
  className?: string;
}) {
  if (!isOpen) return null
  return (
    <div className={`border mt-1 rounded bg-white absolute w-full z-10 max-h-60 overflow-y-auto ${className || ""}`}>
      {children}
    </div>
  )
}
SelectContent.displayName = "SelectContent"

export function SelectItem({
  value,
  children,
  onSelect,
  selectedValue,
  className
}: {
  value: string
  children: ReactNode
  onSelect?: (value: string) => void
  selectedValue?: string
  className?: string
}) {
  return (
    <div
      onClick={() => {
        if (onSelect) onSelect(value)
      }}
      className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedValue === value ? "bg-blue-100 font-medium" : ""} ${className || ""}`}
    >
      {children}
    </div>
  )
}
SelectItem.displayName = "SelectItem"