// src/components/ui/Progress.tsx
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div
      className={cn("w-full bg-gray-200 rounded", className)}
      {...props}
    >
      <div
        className="h-2 bg-blue-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
