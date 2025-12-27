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
import { Footer } from "./footer"

export function MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
                Crane Maintenance System
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 line-clamp-2">
                Digital scheduling & tracking system for factory overhead cranes
              </p>
            </div>
            <Badge variant="outline" className="h-fit bg-primary/10 text-primary border-primary/30 self-start sm:self-center">
              3-10 Cranes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-secondary gap-1 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">Overview</TabsTrigger>
            <TabsTrigger value="daily" className="text-xs sm:text-sm px-2 py-2">Daily</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm px-2 py-2">History</TabsTrigger>
            <TabsTrigger value="procedures" className="text-xs sm:text-sm px-2 py-2">Procedures</TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs sm:text-sm px-2 py-2">Inventory</TabsTrigger>
            <TabsTrigger value="costs" className="text-xs sm:text-sm px-2 py-2">Costs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <CraneList />
          </TabsContent>

          {/* Daily Checks Tab */}
          <TabsContent value="daily" className="space-y-6">
            <DailyChecklist />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <MaintenanceHistory />
          </TabsContent>

          {/* Procedures Tab */}
          <TabsContent value="procedures" className="space-y-6">
            <Procedures />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <InventoryManager />
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="space-y-6">
            <CostPlanning />
          </TabsContent>
        </Tabs>
        <Footer />
      </main>
    </div>
  )
}
