"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"

export default function VerifyPage() {
  const { t } = useLanguage()
  const [lastName, setLastName] = useState("")
  const [dob, setDob] = useState("")
  const [rxCode, setRxCode] = useState("")

  return (
    <div className="container flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4 py-8">
      <LanguageSwitcher />

      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <CardTitle className="text-xl">{t("verify")}</CardTitle>
              <CardDescription>{t("pleaseSign")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="last-name">{t("lastName")}</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">{t("dateOfBirth")}</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rx-code">{t("prescriptionCode")}</Label>
              <Input
                id="rx-code"
                placeholder="RX-12345678"
                value={rxCode}
                onChange={(e) => setRxCode(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="flex items-center rounded-md bg-pharmacy-accent p-3 text-sm">
              <Shield className="mr-2 h-5 w-5 text-pharmacy-primary" />
              <span>{t("dataEncrypted")}</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/consent" className="w-full">
            <Button className="h-12 w-full text-base">{t("continue")}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

