"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react"

const MOCK_CRANES = [
  {
    id: 1,
    name: "Hoist Unit A1",
    location: "Assembly Line 1",
    capacity: "5 Ton",
    status: "Active",
    lastCheck: "2025-12-24",
    nextScheduled: "2025-12-25",
    health: "Good",
  },
  {
    id: 2,
    name: "Hoist Unit B2",
    location: "Assembly Line 2",
    capacity: "10 Ton",
    status: "Active",
    lastCheck: "2025-12-23",
    nextScheduled: "2025-12-27",
    health: "Needs Attention",
  },
  {
    id: 3,
    name: "Hoist Unit C3",
    location: "Material Storage",
    capacity: "8 Ton",
    status: "Maintenance",
    lastCheck: "2025-12-22",
    nextScheduled: "2025-12-28",
    health: "Fair",
  },
  {
    id: 4,
    name: "Hoist Unit D4",
    location: "Assembly Line 3",
    capacity: "5 Ton",
    status: "Active",
    lastCheck: "2025-12-24",
    nextScheduled: "2025-12-26",
    health: "Good",
  },
  {
    id: 5,
    name: "Hoist Unit E5",
    location: "Shipping Dock",
    capacity: "15 Ton",
    status: "Active",
    lastCheck: "2025-12-20",
    nextScheduled: "2025-12-29",
    health: "Good",
  },
  {
    id: 6,
    name: "Hoist Unit F6",
    location: "Assembly Line 1",
    capacity: "3 Ton",
    status: "Active",
    lastCheck: "2025-12-24",
    nextScheduled: "2025-12-25",
    health: "Good",
  },
]

export function CraneList() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Crane Inventory Overview</CardTitle>
              <CardDescription>Monitor all overhead cranes and their maintenance status</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Add New Crane</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cranes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{MOCK_CRANES.length}</div>
            <p className="text-xs text-muted-foreground mt-1">5 Active, 1 In Maintenance</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold">4 Good</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">2 Need Attention</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold">3 Scheduled</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Cranes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_CRANES.map((crane) => (
          <Card key={crane.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{crane.name}</CardTitle>
                  <CardDescription className="text-sm">{crane.location}</CardDescription>
                </div>
                <Badge
                  variant={crane.status === "Active" ? "default" : "secondary"}
                  className={crane.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                >
                  {crane.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{crane.capacity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Health</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {crane.health === "Good" && <div className="w-2 h-2 rounded-full bg-green-600" />}
                    {crane.health === "Fair" && <div className="w-2 h-2 rounded-full bg-yellow-600" />}
                    {crane.health === "Needs Attention" && <div className="w-2 h-2 rounded-full bg-red-600" />}
                    <span className="text-xs">{crane.health}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3 text-xs text-muted-foreground space-y-1">
                <p>Last Check: {crane.lastCheck}</p>
                <p>Next Scheduled: {crane.nextScheduled}</p>
              </div>
              <Button variant="outline" className="w-full mt-2 bg-transparent">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
