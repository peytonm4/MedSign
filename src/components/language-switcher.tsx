"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="absolute right-4 top-4 flex items-center space-x-1 text-sm"
    >
      <Globe className="h-4 w-4" />
      <span>{language === "en" ? "ES" : "EN"}</span>
    </Button>
  )
}

