"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MONTHLY_COSTS = [
  { month: "Jan", labor: 8500, parts: 3200, oil: 1200 },
  { month: "Feb", labor: 7200, parts: 2800, oil: 1200 },
  { month: "Mar", labor: 9800, parts: 5400, oil: 1200 },
  { month: "Apr", labor: 6500, parts: 2100, oil: 1200 },
  { month: "May", labor: 8900, parts: 4200, oil: 1200 },
  { month: "Jun", labor: 7800, parts: 3100, oil: 1200 },
]

const COST_BREAKDOWN = [
  { name: "Labor", value: 48700, color: "oklch(0.22 0.15 283)" },
  { name: "Parts", value: 20800, color: "oklch(0.55 0.2 27)" },
  { name: "Lubricants", value: 7200, color: "oklch(0.6 0.15 140)" },
  { name: "Other", value: 3300, color: "oklch(0.7 0.12 70)" },
]

const CRANE_COSTS = [
  { crane: "A1", annual: 18500, status: "On Budget" },
  { crane: "B2", annual: 22300, status: "Over Budget" },
  { crane: "C3", annual: 16200, status: "On Budget" },
  { crane: "D4", annual: 19100, status: "On Budget" },
  { crane: "E5", annual: 21800, status: "Over Budget" },
  { crane: "F6", annual: 15900, status: "On Budget" },
]

export function CostPlanning() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="overview">Cost Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="perCrane">Per Crane Costs</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Monthly Maintenance Costs (6 Month Trend)</CardTitle>
              <CardDescription>Track spending patterns across labor, parts, and consumables</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MONTHLY_COSTS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis dataKey="month" stroke="oklch(0.556 0 0)" />
                  <YAxis stroke="oklch(0.556 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.145 0 0)",
                      border: "1px solid oklch(0.922 0 0)",
                      borderRadius: "0.625rem",
                    }}
                    labelStyle={{ color: "oklch(0.985 0 0)" }}
                  />
                  <Legend />
                  <Bar dataKey="labor" stackId="a" fill="oklch(0.22 0.15 283)" />
                  <Bar dataKey="parts" stackId="a" fill="oklch(0.55 0.2 27)" />
                  <Bar dataKey="oil" stackId="a" fill="oklch(0.6 0.15 140)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">6-Month Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹80,300</div>
                <p className="text-xs text-muted-foreground mt-1">Avg: ₹13,383/month</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">On Budget</div>
                <p className="text-xs text-muted-foreground mt-1">3.2% below target</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cost/Crane/Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹2,230</div>
                <p className="text-xs text-muted-foreground mt-1">Based on 6 cranes</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>6-Month Cost Breakdown by Category</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={COST_BREAKDOWN}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COST_BREAKDOWN.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {COST_BREAKDOWN.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">₹{item.value.toLocaleString()}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          backgroundColor: item.color,
                          width: `${(item.value / COST_BREAKDOWN.reduce((sum, i) => sum + i.value, 0)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Per Crane Tab */}
        <TabsContent value="perCrane" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Annual Cost Per Crane</CardTitle>
              <CardDescription>Compare maintenance costs across all cranes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CRANE_COSTS.map((item) => (
                  <div
                    key={item.crane}
                    className="flex items-center justify-between p-3 border border-border rounded-lg bg-secondary/50"
                  >
                    <div>
                      <p className="font-semibold text-foreground">Hoist Unit {item.crane}</p>
                      <p className="text-xs text-muted-foreground">{item.status}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">₹{item.annual.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Budget Summary */}
              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Annual (6 Cranes)</span>
                  <span className="font-semibold text-foreground">₹113,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average Per Crane</span>
                  <span className="font-semibold text-foreground">₹18,967</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Variance</span>
                  <span className="font-semibold text-green-600">+₹6,200 (5% Under)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
