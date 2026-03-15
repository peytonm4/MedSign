"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const SESSION_TIMEOUT = 60

export default function ConfirmationPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = useState(SESSION_TIMEOUT)

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/")
      return
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft, router])

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
        <CardFooter className="flex flex-col items-center gap-3">
          <Button className="h-12 px-8 text-base" onClick={() => router.push("/")}>
            {t("done")}
          </Button>
          <p className="text-xs text-muted-foreground">
            Returning to home in {secondsLeft}s
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
