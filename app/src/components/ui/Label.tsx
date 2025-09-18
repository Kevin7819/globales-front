// src/components/ui/Label.tsx
import React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => (
  <label className={`block text-gray-700 dark:text-gray-300 font-medium ${className}`} {...props} />
)
