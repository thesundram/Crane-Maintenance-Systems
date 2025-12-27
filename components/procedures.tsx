"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle } from "lucide-react"

const PROCEDURES = {
  safety: [
    {
      id: 1,
      title: "Lock Out / Tag Out (LOTO)",
      steps: [
        "Ensure all power sources are de-energized",
        "Place lockout devices on all power sources",
        "Verify no stored energy exists",
        "Place warning tags on all isolation points",
      ],
    },
    {
      id: 2,
      title: "Load Attachment Procedure",
      steps: [
        "Inspect rigging equipment before use",
        "Ensure load capacity is within crane limits",
        "Attach slings using proper techniques",
        "Perform function test before lifting",
        "Communicate with all personnel in work area",
      ],
    },
  ],
  brake: [
    {
      id: 3,
      title: "Brake Inspection & Maintenance",
      steps: [
        'Inspect brake pads for wear (minimum 1/8" thickness)',
        'Check air gap specification (typically 0.020" - 0.030")',
        "Verify brake response time",
        "Clean brake components of debris and oil",
        "Replace linings if wear exceeds limits",
      ],
    },
  ],
  rope: [
    {
      id: 4,
      title: "Wire Rope Inspection",
      steps: [
        "Visually inspect entire length of rope",
        "Check for broken strands (replace if >10 breaks per rope lay)",
        "Look for corrosion or rust",
        "Measure diameter - replace if reduced >5%",
        "Check for kinking or crushing",
      ],
    },
    {
      id: 5,
      title: "Wire Rope Replacement",
      steps: [
        "LOTO all power sources",
        "Remove old rope carefully",
        "Install new rope of same grade and diameter",
        "Tension rope to specifications",
        "Perform load test before returning to service",
      ],
    },
  ],
}

export function Procedures() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Standard Procedures & Guidelines</CardTitle>
          <CardDescription>Critical maintenance and safety procedures for crane operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="safety" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="safety">Safety Procedures</TabsTrigger>
              <TabsTrigger value="brake">Brake Maintenance</TabsTrigger>
              <TabsTrigger value="rope">Wire Rope Service</TabsTrigger>
            </TabsList>

            {Object.entries(PROCEDURES).map(([key, procedures]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                {procedures.map((procedure) => (
                  <Card key={procedure.id} className="bg-background border-border mt-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-accent" />
                        {procedure.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {procedure.steps.map((step, index) => (
                          <li key={index} className="flex gap-3 text-sm text-foreground">
                            <span className="font-semibold text-primary min-w-6">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Compliance Standards Card */}
      <Card className="bg-card border-border border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Compliance Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-foreground">
          <p>
            <strong>ASME B30.16:</strong> Overhead Hoist Cranes (Top Running Single Girder, Top Running Underhung,
            Monorail Hoist and Jib Cranes)
          </p>
          <p>
            <strong>OSHA Regulations:</strong> 29 CFR 1910.179 - Overhead and Gantry Cranes
          </p>
          <p>
            <strong>IS Standards:</strong> IS 3177-2006 (Electric Wire Rope Hoists for Cranes)
          </p>
          <p>
            <strong>Inspection Frequency:</strong> Daily (operator), Weekly (maintenance), Monthly/Quarterly (PM)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
