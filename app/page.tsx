"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "../src/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User } from "lucide-react"

export default function WelcomePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("patient")

  return (
    <div className="container flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4 py-8">
      <LanguageSwitcher />

      <div className="mb-8 flex flex-col items-center">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-pharmacy-primary">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-center text-2xl font-bold text-pharmacy-primary sm:text-3xl">{t("welcome")}</h1>
        <p className="mt-2 text-center text-muted-foreground">{t("hipaaNotice")}</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">{t("login")}</CardTitle>
          <CardDescription className="text-center">{t("dataEncrypted")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">{t("patientLogin")}</TabsTrigger>
              <TabsTrigger value="staff">{t("staffLogin")}</TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <form className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-id">{t("prescriptionCode")}</Label>
                  <Input id="patient-id" placeholder="RX-12345678" className="h-12 text-base" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patient-dob">{t("dateOfBirth")}</Label>
                  </div>
                  <Input id="patient-dob" type="date" className="h-12 text-base" />
                </div>
                <Link href="/verify" className="w-full">
                  <Button className="h-12 w-full text-base">{t("continue")}</Button>
                </Link>
              </form>
            </TabsContent>

            <TabsContent value="staff">
              <form className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t("username")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input id="username" placeholder="username" className="h-12 pl-10 text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Link href="#" className="text-sm text-pharmacy-primary hover:underline">
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type="password" className="h-12 pl-10 text-base" />
                  </div>
                </div>
                <Link href="/dashboard" className="w-full">
                  <Button className="h-12 w-full text-base">{t("login")}</Button>
                </Link>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-xs text-muted-foreground">
          <p>
            {activeTab === "patient"
              ? "Enter your prescription code and date of birth to access your forms"
              : "Staff login is for authorized pharmacy personnel only"}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

