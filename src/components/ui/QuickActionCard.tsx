import * as React from "react"
import { Card, CardContent } from "../../components/ui/Card"
import clsx from "clsx"
import { Link } from "react-router-dom"

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link?: string
  disabled?: boolean
  colorBg?: string
}

export default function QuickActionCard({
  title,
  description,
  icon,
  link,
  disabled = false,
  colorBg = "bg-gray-100 dark:bg-gray-900/20",
}: QuickActionCardProps) {
  const cardClasses = clsx(
    "hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 group rounded-xl",
    disabled && "cursor-not-allowed opacity-60",
    !disabled && "cursor-pointer"
  )

  const content = (
    <CardContent className="p-8 text-center">
      <div className={`${colorBg} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </CardContent>
  )

  if (link && !disabled) {
    return (
      <Card className={cardClasses}>
        <Link to={link}>{content}</Link>
      </Card>
    )
  }

  return <Card className={cardClasses}>{content}</Card>
}
