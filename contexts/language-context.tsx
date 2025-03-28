"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es"

type Translations = {
  [key: string]: {
    en: string
    es: string
  }
}

// Common translations used across the app
const translations: Translations = {
  welcome: {
    en: "Welcome to MedSign",
    es: "Bienvenido a MedSign",
  },
  login: {
    en: "Login",
    es: "Iniciar sesión",
  },
  patientLogin: {
    en: "Patient Login",
    es: "Acceso para pacientes",
  },
  staffLogin: {
    en: "Staff Login",
    es: "Acceso para personal",
  },
  username: {
    en: "Username",
    es: "Nombre de usuario",
  },
  password: {
    en: "Password",
    es: "Contraseña",
  },
  forgotPassword: {
    en: "Forgot Password?",
    es: "¿Olvidó su contraseña?",
  },
  verify: {
    en: "Verify Identity",
    es: "Verificar identidad",
  },
  lastName: {
    en: "Last Name",
    es: "Apellido",
  },
  dateOfBirth: {
    en: "Date of Birth",
    es: "Fecha de nacimiento",
  },
  prescriptionCode: {
    en: "Prescription Code",
    es: "Código de receta",
  },
  continue: {
    en: "Continue",
    es: "Continuar",
  },
  consentForm: {
    en: "Consent Form",
    es: "Formulario de consentimiento",
  },
  iAgree: {
    en: "I agree to the terms and conditions",
    es: "Estoy de acuerdo con los términos y condiciones",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    es: "Política de privacidad",
  },
  signature: {
    en: "Signature",
    es: "Firma",
  },
  clear: {
    en: "Clear",
    es: "Borrar",
  },
  sign: {
    en: "Sign",
    es: "Firmar",
  },
  confirmation: {
    en: "Confirmation",
    es: "Confirmación",
  },
  signatureRecorded: {
    en: "Signature recorded successfully",
    es: "Firma registrada con éxito",
  },
  dashboard: {
    en: "Dashboard",
    es: "Panel de control",
  },
  patientName: {
    en: "Patient Name",
    es: "Nombre del paciente",
  },
  prescriptionId: {
    en: "Prescription ID",
    es: "ID de receta",
  },
  status: {
    en: "Status",
    es: "Estado",
  },
  date: {
    en: "Date",
    es: "Fecha",
  },
  time: {
    en: "Time",
    es: "Hora",
  },
  pending: {
    en: "Pending",
    es: "Pendiente",
  },
  completed: {
    en: "Completed",
    es: "Completado",
  },
  hipaaCompliant: {
    en: "HIPAA Compliant",
    es: "Conforme a HIPAA",
  },
  secureConnection: {
    en: "Secure Connection",
    es: "Conexión segura",
  },
  logout: {
    en: "Logout",
    es: "Cerrar sesión",
  },
  back: {
    en: "Back",
    es: "Atrás",
  },
  next: {
    en: "Next",
    es: "Siguiente",
  },
  cancel: {
    en: "Cancel",
    es: "Cancelar",
  },
  submit: {
    en: "Submit",
    es: "Enviar",
  },
  search: {
    en: "Search",
    es: "Buscar",
  },
  filter: {
    en: "Filter",
    es: "Filtrar",
  },
  all: {
    en: "All",
    es: "Todos",
  },
  today: {
    en: "Today",
    es: "Hoy",
  },
  thisWeek: {
    en: "This Week",
    es: "Esta semana",
  },
  thisMonth: {
    en: "This Month",
    es: "Este mes",
  },
  signatureRequired: {
    en: "Signature Required",
    es: "Firma requerida",
  },
  pleaseSign: {
    en: "Please sign below",
    es: "Por favor firme abajo",
  },
  hipaaNotice: {
    en: "This system complies with HIPAA regulations for patient data privacy",
    es: "Este sistema cumple con las regulaciones HIPAA para la privacidad de datos del paciente",
  },
  dataEncrypted: {
    en: "All data is encrypted and securely stored",
    es: "Todos los datos están encriptados y almacenados de forma segura",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

