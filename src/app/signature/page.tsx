"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import { SignaturePad } from "@/components/signature-pad"

export default function SignaturePage() {
  const { t } = useLanguage()
  const [signatureData, setSignatureData] = useState<string | null>(null)

  return (
    <div className="container flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4 py-8">
      <LanguageSwitcher />

      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Link href="/consent">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <CardTitle className="text-xl">{t("signature")}</CardTitle>
              <CardDescription>{t("pleaseSign")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm font-medium">Prescription #RX-12345678</div>

          <SignaturePad onSignatureChange={setSignatureData} />

          <div className="mt-4 flex items-center rounded-md bg-pharmacy-accent p-3 text-sm">
            <Shield className="mr-2 h-5 w-5 text-pharmacy-primary" />
            <span>{t("dataEncrypted")}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/confirmation" className="w-full">
            <Button className="h-12 w-full text-base" disabled={!signatureData}>
              {t("sign")}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

