import * as React from "react"
import clsx from "clsx"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp: any = asChild ? React.Fragment : "div"

    return (
      <Comp
        ref={ref}
        className={clsx(
          !asChild && "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Card.displayName = "Card"

// Card Header
export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-6 pt-6", className)}>{children}</div>
}

// Card Title
export function CardTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  )
}

// Card Description
export function CardDescription({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm text-white dark:text-gray-400", className)}>{children}</p>
  )
}

// Card Content
export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-6 pb-6", className)}>{children}</div>
}
