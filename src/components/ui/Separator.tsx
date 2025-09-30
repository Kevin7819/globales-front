import React from "react"

interface SeparatorProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export const Separator: React.FC<SeparatorProps> = ({ className = "", orientation = "horizontal" }) => {
  if (orientation === "vertical") {
    return <div className={`w-px h-full bg-gray-200 dark:bg-gray-700 ${className}`} />
  }
  return <hr className={`border-t border-gray-200 dark:border-gray-700 my-4 ${className}`} />
}
