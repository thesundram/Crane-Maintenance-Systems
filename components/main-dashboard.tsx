"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CraneList } from "./crane-list"
import { DailyChecklist } from "./daily-checklist"
import { MaintenanceHistory } from "./maintenance-history"
import { Procedures } from "./procedures"
import { InventoryManager } from "./inventory-manager"
import { CostPlanning } from "./cost-planning"
import { AIReport } from "./ai-report"
import { Footer } from "./footer"
import {
  CheckCircle,
  Activity,
  Sparkles,
  ClipboardList,
  History,
  BookOpen,
  Package,
  CircleDollarSign,
  LayoutDashboard
} from "lucide-react"

export function MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Top Enterprise Header */}
      <header className="bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#1e293b] text-white shadow-lg border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Crane Maintenance Manager
              </h1>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl">
                Digital scheduling, tracking, diagnostic AI analytics & safety compliance for factory overhead cranes
              </p>
            </div>

            {/* Header Right Real-time Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-medium">6 Cranes Active</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-200 font-medium">1 Critical Alert</span>
              </div>

              <Badge className="bg-blue-500/30 text-blue-100 border-blue-400/40 text-xs px-3 py-1 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                AI Diagnostic Engine Ready
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Bar Tabs */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto p-1.5 bg-slate-200/70 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 rounded-2xl shadow-inner gap-1">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="daily"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Daily Checks
            </TabsTrigger>

            <TabsTrigger
              value="history"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <History className="w-3.5 h-3.5" />
              History
            </TabsTrigger>

            <TabsTrigger
              value="procedures"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Procedures
            </TabsTrigger>

            <TabsTrigger
              value="inventory"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Package className="w-3.5 h-3.5" />
              Inventory
            </TabsTrigger>

            <TabsTrigger
              value="costs"
              className="flex items-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <CircleDollarSign className="w-3.5 h-3.5" />
              Costs
            </TabsTrigger>

            <TabsTrigger
              value="ai-report"
              className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-700 data-[state=active]:to-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-md relative"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              AI Report
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-2 ring-2 ring-[#1e3a5f]" />
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <CraneList />
          </TabsContent>

          <TabsContent value="daily" className="mt-6 space-y-6">
            <DailyChecklist />
          </TabsContent>

          <TabsContent value="history" className="mt-6 space-y-6">
            <MaintenanceHistory />
          </TabsContent>

          <TabsContent value="procedures" className="mt-6 space-y-6">
            <Procedures />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6 space-y-6">
            <InventoryManager />
          </TabsContent>

          <TabsContent value="costs" className="mt-6 space-y-6">
            <CostPlanning />
          </TabsContent>

          <TabsContent value="ai-report" className="mt-6 space-y-6">
            <AIReport />
          </TabsContent>
        </Tabs>

        <Footer />
      </main>
    </div>
  )
}
