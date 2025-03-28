"use client"

import { Shield, Lock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function SecureFooter() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t bg-white py-2">
      <div className="container flex flex-col items-center justify-center space-y-1 px-4 text-xs text-muted-foreground md:flex-row md:justify-between md:space-y-0">
        <div className="flex items-center space-x-1">
          <Shield className="h-3 w-3" />
          <span>{t("hipaaCompliant")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Lock className="h-3 w-3" />
          <span>{t("secureConnection")}</span>
        </div>
        <div>© {new Date().getFullYear()} MedSign</div>
      </div>
    </footer>
  )
}

