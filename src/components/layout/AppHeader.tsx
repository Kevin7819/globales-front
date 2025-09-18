// src/components/layout/AppHeader.tsx
import React from "react"
import { Button } from "../ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { Globe, Bell, Settings } from "lucide-react"
import { MainNav } from "../navigation/MainNav"

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/home" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Se tiene que pensar</h1>
          </a>
          <MainNav />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="/generic-user-avatar.png" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
