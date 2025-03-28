"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, Clock, LogOut, Search, User } from "lucide-react"

// Sample data for the dashboard
const signatures = [
  {
    id: 1,
    patientName: "John Smith",
    prescriptionId: "RX-12345678",
    status: "completed",
    date: "2023-05-15",
    time: "14:32",
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    prescriptionId: "RX-23456789",
    status: "pending",
    date: "2023-05-15",
    time: "15:45",
  },
  {
    id: 3,
    patientName: "Robert Johnson",
    prescriptionId: "RX-34567890",
    status: "completed",
    date: "2023-05-15",
    time: "10:15",
  },
  {
    id: 4,
    patientName: "Sarah Williams",
    prescriptionId: "RX-45678901",
    status: "pending",
    date: "2023-05-15",
    time: "16:20",
  },
  {
    id: 5,
    patientName: "David Brown",
    prescriptionId: "RX-56789012",
    status: "completed",
    date: "2023-05-14",
    time: "11:05",
  },
  {
    id: 6,
    patientName: "Jennifer Davis",
    prescriptionId: "RX-67890123",
    status: "pending",
    date: "2023-05-14",
    time: "13:50",
  },
  {
    id: 7,
    patientName: "Michael Miller",
    prescriptionId: "RX-78901234",
    status: "completed",
    date: "2023-05-14",
    time: "09:30",
  },
  {
    id: 8,
    patientName: "Lisa Wilson",
    prescriptionId: "RX-89012345",
    status: "pending",
    date: "2023-05-13",
    time: "14:15",
  },
]

export default function DashboardPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter signatures based on status and search query
  const filteredSignatures = signatures.filter((signature) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && signature.status === "pending") ||
      (filter === "completed" && signature.status === "completed")

    const matchesSearch =
      signature.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signature.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-pharmacy-primary text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-pharmacy-primary">MedSign</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 pb-8 pt-6">
        <div className="container px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{t("dashboard")}</h2>
            <p className="text-muted-foreground">Manage electronic signatures for prescriptions</p>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-sm text-muted-foreground">Total Signatures</div>
              <div className="mt-1 text-2xl font-bold">24</div>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="mt-1 text-2xl font-bold">8</div>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-sm text-muted-foreground">Completed Today</div>
              <div className="mt-1 text-2xl font-bold">12</div>
            </div>
          </div>

          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b p-4">
              <Tabs defaultValue="all" onValueChange={setFilter}>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <TabsList>
                    <TabsTrigger value="all">{t("all")}</TabsTrigger>
                    <TabsTrigger value="pending">{t("pending")}</TabsTrigger>
                    <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
                  </TabsList>

                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder={t("search")}
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select defaultValue="today">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={t("filter")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">{t("today")}</SelectItem>
                        <SelectItem value="week">{t("thisWeek")}</SelectItem>
                        <SelectItem value="month">{t("thisMonth")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Tabs>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("patientName")}</TableHead>
                    <TableHead>{t("prescriptionId")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("time")}</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignatures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSignatures.map((signature) => (
                      <TableRow key={signature.id}>
                        <TableCell className="font-medium">{signature.patientName}</TableCell>
                        <TableCell>{signature.prescriptionId}</TableCell>
                        <TableCell>
                          {signature.status === "completed" ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {t("completed")}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-amber-200 bg-amber-100 text-amber-800">
                              <Clock className="mr-1 h-3 w-3" />
                              {t("pending")}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{signature.date}</TableCell>
                        <TableCell>{signature.time}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between border-t px-4 py-2">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredSignatures.length}</strong> of <strong>{signatures.length}</strong> signatures
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

