"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function ConfirmationPage() {
  const { t } = useLanguage()

  return (
    <div className="container flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4 py-8">
      <LanguageSwitcher />

      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="mb-2 h-16 w-16 text-green-500" />
            <CardTitle className="text-xl">{t("confirmation")}</CardTitle>
            <CardDescription>{t("signatureRecorded")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4 text-sm">
            <p className="mb-2">Prescription #RX-12345678</p>
            <p className="text-muted-foreground">
              A copy of the signed document has been sent to your pharmacy for processing.
            </p>
          </div>

          <div className="rounded-md bg-pharmacy-accent p-4 text-sm">
            <p className="font-medium text-pharmacy-primary">What happens next?</p>
            <p className="mt-2 text-muted-foreground">
              Your prescription will be processed by the pharmacy. You will receive a notification when it's ready for
              pickup.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button className="h-12 px-8 text-base">{t("done")}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

