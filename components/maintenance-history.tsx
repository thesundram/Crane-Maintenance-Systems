"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const MAINTENANCE_RECORDS = [
  {
    id: 1,
    crane: "Hoist Unit A1",
    type: "Daily Check",
    date: "2025-12-24",
    completedBy: "John Smith",
    status: "Completed",
    notes: "All systems operational",
  },
  {
    id: 2,
    crane: "Hoist Unit B2",
    type: "Weekly Check - Brake Inspection",
    date: "2025-12-23",
    completedBy: "Jane Doe",
    status: "Completed",
    notes: "Minor brake lining wear detected, scheduled replacement",
  },
  {
    id: 3,
    crane: "Hoist Unit C3",
    type: "Monthly PM",
    date: "2025-12-22",
    completedBy: "Mike Johnson",
    status: "Completed",
    notes: "Gearbox oil analysis completed, replace oil next month",
  },
  {
    id: 4,
    crane: "Hoist Unit A1",
    type: "Repair - Wire Rope Replacement",
    date: "2025-12-15",
    completedBy: "Sarah Wilson",
    status: "Completed",
    notes: "Wire rope replaced per maintenance schedule",
  },
  {
    id: 5,
    crane: "Hoist Unit E5",
    type: "Load Test",
    date: "2025-12-10",
    completedBy: "David Lee",
    status: "Completed",
    notes: "Load test passed per IS standards",
  },
]

export function MaintenanceHistory() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
          <CardDescription>View and track all maintenance activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by crane or technician..."
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="daily">Daily Checks</SelectItem>
                <SelectItem value="weekly">Weekly Checks</SelectItem>
                <SelectItem value="monthly">Monthly PM</SelectItem>
                <SelectItem value="repair">Repairs</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Crane</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Completed By</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Notes</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {MAINTENANCE_RECORDS.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-secondary transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{record.crane}</td>
                    <td className="py-3 px-4 text-foreground">{record.type}</td>
                    <td className="py-3 px-4 text-muted-foreground">{record.date}</td>
                    <td className="py-3 px-4 text-foreground">{record.completedBy}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs max-w-xs truncate">{record.notes}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
