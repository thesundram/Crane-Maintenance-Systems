"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

const SPARE_PARTS = [
  {
    id: 1,
    name: "Wire Rope (6x19 IWRC)",
    partNumber: "WR-6x19-IW",
    unit: "per meter",
    stock: 45,
    minStock: 30,
    cost: 25.5,
    supplier: "IndiaSteel Supplies",
  },
  {
    id: 2,
    name: "Brake Lining Kit",
    partNumber: "BK-5T-STD",
    unit: "per kit",
    stock: 8,
    minStock: 6,
    cost: 450.0,
    supplier: "Precision Equipment",
  },
  {
    id: 3,
    name: "Hoist Motor Oil (ISO VG 46)",
    partNumber: "OIL-ISO46-20L",
    unit: "per 20L drum",
    stock: 5,
    minStock: 8,
    cost: 320.0,
    supplier: "Lubricant Co",
  },
  {
    id: 4,
    name: "Load Pin (10 ton)",
    partNumber: "LP-10T-SSL",
    unit: "per piece",
    stock: 4,
    minStock: 4,
    cost: 1200.0,
    supplier: "Precision Equipment",
  },
  {
    id: 5,
    name: "Sheave Wheel Assembly",
    partNumber: "SWA-4IN-BB",
    unit: "per assembly",
    stock: 2,
    minStock: 2,
    cost: 850.0,
    supplier: "IndiaSteel Supplies",
  },
  {
    id: 6,
    name: "Control Panel Contactor",
    partNumber: "CPC-380V-60A",
    unit: "per unit",
    stock: 6,
    minStock: 3,
    cost: 280.0,
    supplier: "ElectroTech Industries",
  },
]

export function InventoryManager() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Spare Parts & Tools Inventory</CardTitle>
              <CardDescription>Manage stock levels for critical maintenance components</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Add New Item</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter */}
          <div className="flex gap-2">
            <Input
              placeholder="Search parts..."
              className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-48 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Part Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Part Number</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Min. Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Cost/Unit</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {SPARE_PARTS.map((part) => {
                  const isLow = part.stock < part.minStock
                  return (
                    <tr
                      key={part.id}
                      className={`border-b border-border hover:bg-secondary transition-colors ${isLow ? "bg-accent/5" : ""}`}
                    >
                      <td className="py-3 px-4 text-foreground font-medium">{part.name}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{part.partNumber}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-semibold">{part.stock}</span>
                          {isLow && <AlertTriangle className="w-4 h-4 text-accent" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{part.minStock}</td>
                      <td className="py-3 px-4 text-foreground">₹{part.cost.toFixed(2)}</td>
                      <td className="py-3 px-4 text-foreground text-xs">{part.supplier}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          {isLow ? "Order" : "Edit"}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Total Inventory Value</p>
                <p className="text-xl font-bold text-foreground">₹26,495.00</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Low Stock Items</p>
                <p className="text-xl font-bold text-accent">1 Item</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Avg. Reorder Time</p>
                <p className="text-xl font-bold text-foreground">5-7 Days</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
