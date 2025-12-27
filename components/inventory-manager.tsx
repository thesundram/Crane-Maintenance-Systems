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
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl">Spare Parts & Tools Inventory</CardTitle>
              <CardDescription className="text-sm">Manage stock levels for critical maintenance components</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm">
              Add New Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Search parts..."
              className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Table - Mobile Cards */}
          <div className="block sm:hidden space-y-3">
            {SPARE_PARTS.map((part) => {
              const isLow = part.stock < part.minStock
              return (
                <Card key={part.id} className={`border-border ${isLow ? "border-accent/50 bg-accent/5" : ""}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground text-sm truncate">{part.name}</h4>
                        <p className="text-xs text-muted-foreground font-mono">{part.partNumber}</p>
                      </div>
                      {isLow && <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" />}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Stock</p>
                        <p className="font-semibold text-foreground">{part.stock}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Min. Stock</p>
                        <p className="text-foreground">{part.minStock}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cost/Unit</p>
                        <p className="text-foreground">₹{part.cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Supplier</p>
                        <p className="text-foreground truncate">{part.supplier}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-primary border-primary/30 hover:bg-primary/10"
                    >
                      {isLow ? "Order Now" : "Edit Item"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Inventory Table - Desktop */}
          <div className="hidden sm:block overflow-x-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-4 border-t border-border">
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Total Inventory Value</p>
                <p className="text-lg sm:text-xl font-bold text-foreground">₹26,495.00</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Low Stock Items</p>
                <p className="text-lg sm:text-xl font-bold text-accent">1 Item</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Avg. Reorder Time</p>
                <p className="text-lg sm:text-xl font-bold text-foreground">5-7 Days</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
