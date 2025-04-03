import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
// import { ThemeProvider } from "../components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { SecureFooter } from "@/components/secure-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedSign - Secure Electronic Signature System",
  description: "HIPAA-compliant electronic signature system for pharmacies",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-pharmacy-light`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <SecureFooter />
            </div>
          </LanguageProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

