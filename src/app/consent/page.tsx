"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, ZoomIn, ZoomOut } from "lucide-react"

export default function ConsentPage() {
  const { t } = useLanguage()
  const [agreed, setAgreed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const increaseZoom = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.5))
  const decreaseZoom = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.8))

  return (
    <div className="container flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4 py-8">
      <LanguageSwitcher />

      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Link href="/verify">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <CardTitle className="text-xl">{t("consentForm")}</CardTitle>
              <CardDescription>{t("pleaseSign")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Prescription #RX-12345678</div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={decreaseZoom}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={increaseZoom}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="mb-4 max-h-[400px] overflow-y-auto rounded-md border bg-white p-4 text-sm"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
          >
            <h2 className="mb-4 text-lg font-bold">HIPAA Consent Form</h2>

            <p className="mb-3">
              I hereby consent to the use and disclosure of my protected health information for treatment, payment, and
              healthcare operations.
            </p>

            <h3 className="mb-2 font-semibold">Patient Rights:</h3>
            <ul className="mb-3 list-inside list-disc">
              <li>You have the right to request restrictions on certain uses and disclosures.</li>
              <li>You have the right to receive confidential communications.</li>
              <li>You have the right to inspect and copy your protected health information.</li>
              <li>You have the right to amend your protected health information.</li>
              <li>You have the right to receive an accounting of disclosures.</li>
              <li>You have the right to obtain a paper copy of this notice.</li>
            </ul>

            <h3 className="mb-2 font-semibold">Pharmacy Responsibilities:</h3>
            <p className="mb-3">
              The pharmacy is required by law to maintain the privacy of your protected health information and to
              provide you with notice of its legal duties and privacy practices.
            </p>

            <h3 className="mb-2 font-semibold">Electronic Signature:</h3>
            <p className="mb-3">
              By signing this form electronically, you acknowledge that your electronic signature is the legal
              equivalent of your manual signature on this form.
            </p>

            <p className="mb-3">This consent is valid until revoked by the patient.</p>

            <div className="mb-3 text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="agree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("iAgree")}
              </label>
              <p className="text-xs text-muted-foreground">
                <Link href="#" className="text-pharmacy-primary hover:underline">
                  {t("privacyPolicy")} <ExternalLink className="inline h-3 w-3" />
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/signature" className="w-full">
            <Button className="h-12 w-full text-base" disabled={!agreed}>
              {t("continue")}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

