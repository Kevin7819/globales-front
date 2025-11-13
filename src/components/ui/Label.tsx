import React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className = "", ...props }) => (
  <label className={`block font-medium ${className}`} {...props} />
)
