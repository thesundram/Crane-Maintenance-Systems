'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  FileText,
  Download,
  Copy,
  Printer,
  Sparkles,
  RefreshCw,
  Activity,
  Layers,
  Check,
  ChevronRight,
  ShieldCheck,
  Building2,
  Clock,
  ExternalLink
} from 'lucide-react'

const mockCraneData = [
  { id: 'CRANE-001', name: 'Overhead Crane A', capacity: '10T', location: 'Hall 1', yearManufactured: 2015 },
  { id: 'CRANE-002', name: 'Overhead Crane B', capacity: '15T', location: 'Hall 2', yearManufactured: 2018 },
  { id: 'CRANE-003', name: 'Overhead Crane C', capacity: '20T', location: 'Hall 3', yearManufactured: 2016 },
  { id: 'CRANE-004', name: 'Overhead Crane D', capacity: '10T', location: 'Hall 4', yearManufactured: 2019 },
  { id: 'CRANE-005', name: 'Overhead Crane E', capacity: '15T', location: 'Hall 5', yearManufactured: 2020 },
  { id: 'CRANE-006', name: 'Overhead Crane F', capacity: '25T', location: 'Hall 6', yearManufactured: 2017 },
]

const mockMaintenanceHistory = [
  { craneId: 'CRANE-001', lastCheck: '2024-07-20', checkType: 'Daily', status: 'Pass' },
  { craneId: 'CRANE-001', lastCheck: '2024-07-10', checkType: 'Weekly', status: 'Pass' },
  { craneId: 'CRANE-002', lastCheck: '2024-07-18', checkType: 'Daily', status: 'Pass' },
  { craneId: 'CRANE-003', lastCheck: '2024-06-28', checkType: 'Monthly', status: 'Issues Found' },
  { craneId: 'CRANE-004', lastCheck: '2024-07-19', checkType: 'Daily', status: 'Pass' },
  { craneId: 'CRANE-005', lastCheck: '2024-07-15', checkType: 'Weekly', status: 'Pass' },
  { craneId: 'CRANE-006', lastCheck: '2024-07-05', checkType: 'Daily', status: 'Pass' },
]

const mockCurrentIssues = [
  { craneId: 'CRANE-003', issue: 'Wire rope showing signs of severe wear', severity: 'High' },
  { craneId: 'CRANE-001', issue: 'Brake test showing delayed response', severity: 'Medium' },
  { craneId: 'CRANE-006', issue: 'Hoist limit switch needs calibration', severity: 'Medium' },
]

const DEFAULT_REPORT_TEXT = `# Crane Maintenance Consultant Report

## Maintenance Recommendations

### Specific Preventive Maintenance Tasks

1. **CRANE-001 (Overhead Crane A)**
   - **Brake System Maintenance**: Conduct a detailed inspection and adjustment of the brake system to address the delayed response issue. Consider replacing brake pads or components if wear is excessive.
   - **Regular Brake Testing**: Implement more frequent brake performance tests to monitor and ensure reliability.

2. **CRANE-002 (Overhead Crane B)**
   - **Standard Check**: No immediate issues reported. Continue with regular daily, weekly, and monthly inspections.

3. **CRANE-003 (Overhead Crane C)**
   - **Wire Rope Replacement**: Immediate replacement of the wire rope due to high severity wear signs.
   - **Enhanced Inspection Protocol**: Increase the frequency of wire rope inspections to monthly, given the severity of the current issue.

4. **CRANE-004 (Overhead Crane D)**
   - **Standard Check**: Maintain current daily inspection routines as no issues have been reported.

5. **CRANE-005 (Overhead Crane E)**
   - **Standard Check**: Continue with existing weekly checks and monitor for any emerging issues.

6. **CRANE-006 (Overhead Crane F)**
   - **Hoist Limit Switch Calibration**: Schedule an immediate calibration of the hoist limit switch.
   - **Regular Functional Testing**: Increase the frequency of functional tests to ensure all electrical and mechanical components are operating correctly.

## Equipment Health Assessment

### Overall Health Based on Check History

- **CRANE-001**: Generally healthy but monitor braking system closely.
- **CRANE-002**: No reported issues, appears to be in good health.
- **CRANE-003**: Requires immediate attention due to critical wire rope condition.
- **CRANE-004**: No issues reported, maintenance routine is effective.
- **CRANE-005**: In good condition, no immediate concerns.
- **CRANE-006**: Critical need for calibration but otherwise healthy.

### Components Needing Attention or Replacement

- **CRANE-001**: Brake system components may need replacement.
- **CRANE-003**: Wire rope needs replacement.
- **CRANE-006**: Hoist limit switch calibration and potential replacement if issues persist.

## Compliance & Safety Alerts

### Safety Concerns and Compliance Gaps

- **CRANE-003**: The condition of the wire rope poses a significant safety risk. Immediate replacement is required to comply with safety standards such as ASME B30.2 and OSHA 1910.179.
- **CRANE-001 and CRANE-006**: Issues with brake response and hoist limit switch calibration may lead to non-compliance with operational safety standards if not addressed promptly.

## Priority Actions

### Critical Immediate Actions for Safety and Operational Efficiency

1. **Replace Wire Rope on CRANE-003**: This is the highest priority due to the high risk of failure and potential for severe accidents.
2. **Calibrate Hoist Limit Switch on CRANE-006**: Essential for ensuring the crane does not exceed its operational limits, which could lead to overloading and accidents.
3. **Inspect and Repair Brake System on CRANE-001**: Critical for ensuring the crane can safely stop during operations to prevent accidents.`

export function AIReport() {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<string | null>(DEFAULT_REPORT_TEXT)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'dashboard' | 'document'>('dashboard')
  const [selectedCraneFilter, setSelectedCraneFilter] = useState<string>('ALL')
  const [copied, setCopied] = useState(false)

  const generateReport = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          craneData: mockCraneData,
          maintenanceHistory: mockMaintenanceHistory,
          currentIssues: mockCurrentIssues,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report')
      }

      setReport(data.report)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating report.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!report) return
    navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!report) return
    const element = document.createElement('a')
    const file = new Blob([report], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `Crane_Maintenance_AI_Report_${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handlePrint = () => {
    window.print()
  }

  const parsedData = useMemo(() => {
    return {
      priorityActions: [
        {
          id: 1,
          craneId: 'CRANE-003',
          craneName: 'Overhead Crane C (20T)',
          title: 'Replace Wire Rope Immediately',
          severity: 'CRITICAL',
          badgeClass: 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800',
          badgeDot: 'bg-red-500',
          description: 'High risk of tensile failure. Urgent replacement required to comply with ASME B30.2 & OSHA 1910.179 standards.',
          action: 'Order wire rope assembly & schedule emergency downtime.',
        },
        {
          id: 2,
          craneId: 'CRANE-006',
          craneName: 'Overhead Crane F (25T)',
          title: 'Calibrate Hoist Limit Switch',
          severity: 'HIGH PRIORITY',
          badgeClass: 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
          badgeDot: 'bg-amber-500',
          description: 'Prevents upper/lower limit over-travel and structural hoist assembly damage.',
          action: 'Calibrate electrical limit switches and verify cut-off thresholds.',
        },
        {
          id: 3,
          craneId: 'CRANE-001',
          craneName: 'Overhead Crane A (10T)',
          title: 'Inspect & Adjust Brake System',
          severity: 'MEDIUM PRIORITY',
          badgeClass: 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
          badgeDot: 'bg-amber-500',
          description: 'Delayed braking response observed. Potential wear on brake pads or hydraulic actuator.',
          action: 'Inspect lining thickness, adjust air gap, and test stop-distance under full load.',
        },
      ],
      craneStatuses: [
        {
          id: 'CRANE-001',
          name: 'Overhead Crane A',
          capacity: '10T',
          location: 'Hall 1',
          status: 'WARNING',
          statusText: 'Brake Delay',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300',
          healthScore: 72,
          recommendation: 'Inspect brake pads & recalibrate response time.',
          componentAttention: 'Brake lining / Actuator',
        },
        {
          id: 'CRANE-002',
          name: 'Overhead Crane B',
          capacity: '15T',
          location: 'Hall 2',
          status: 'HEALTHY',
          statusText: 'Optimal',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300',
          healthScore: 96,
          recommendation: 'Continue regular daily & weekly check schedule.',
          componentAttention: 'None (Regular check)',
        },
        {
          id: 'CRANE-003',
          name: 'Overhead Crane C',
          capacity: '20T',
          location: 'Hall 3',
          status: 'CRITICAL',
          statusText: 'Replace Wire Rope',
          badgeClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300',
          healthScore: 35,
          recommendation: 'Halt lifting operations until wire rope replacement is completed.',
          componentAttention: 'Wire Rope Cable',
        },
        {
          id: 'CRANE-004',
          name: 'Overhead Crane D',
          capacity: '10T',
          location: 'Hall 4',
          status: 'HEALTHY',
          statusText: 'Optimal',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300',
          healthScore: 98,
          recommendation: 'Maintain standard preventive routines.',
          componentAttention: 'None (Regular check)',
        },
        {
          id: 'CRANE-005',
          name: 'Overhead Crane E',
          capacity: '15T',
          location: 'Hall 5',
          status: 'HEALTHY',
          statusText: 'Optimal',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300',
          healthScore: 94,
          recommendation: 'Continue weekly inspection log.',
          componentAttention: 'None (Regular check)',
        },
        {
          id: 'CRANE-006',
          name: 'Overhead Crane F',
          capacity: '25T',
          location: 'Hall 6',
          status: 'WARNING',
          statusText: 'Limit Switch Calibration',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300',
          healthScore: 78,
          recommendation: 'Schedule electrical calibration for upper limit sensor.',
          componentAttention: 'Hoist Limit Switch',
        },
      ],
      complianceAlerts: [
        {
          craneId: 'CRANE-003',
          standard: 'ASME B30.2 & OSHA 1910.179',
          title: 'Critical Wire Rope Safety Violation Risk',
          details: 'Operating with worn wire rope violates mandatory hoist safety standards and invalidates operational certification.',
          severity: 'HIGH RISK',
        },
        {
          craneId: 'CRANE-001 & CRANE-006',
          standard: 'Operational Safety Norms (IS 3177 / ASME B30)',
          title: 'Brake Response & Limit Switch Calibration Compliance',
          details: 'Delayed braking and uncalibrated limit switches present non-compliance risks during official safety audits.',
          severity: 'MODERATE RISK',
        },
      ],
    }
  }, [])

  const filteredCranes = useMemo(() => {
    if (selectedCraneFilter === 'ALL') return parsedData.craneStatuses
    return parsedData.craneStatuses.filter(c => c.id === selectedCraneFilter)
  }, [selectedCraneFilter, parsedData.craneStatuses])

  const filteredPriorityActions = useMemo(() => {
    if (selectedCraneFilter === 'ALL') return parsedData.priorityActions
    return parsedData.priorityActions.filter(p => p.craneId === selectedCraneFilter)
  }, [selectedCraneFilter, parsedData.priorityActions])

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <Card className="relative overflow-hidden border border-[#1e3a5f]/20 bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#1e293b] text-white p-6 shadow-xl rounded-2xl">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                AI Diagnostic Intelligence
              </Badge>

              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 px-2.5 py-0.5 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Analysis
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Crane Fleet AI Consultant Report
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Automated diagnostic evaluation, component health assessment, safety compliance alerts, and prioritized maintenance roadmap for all active factory cranes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={generateReport}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/30 h-11 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Re-Analyze Fleet
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Fleet KPI Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Fleet Health Score</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
              <span>74%</span>
              <span className="text-xs font-normal text-amber-400 font-medium">Attention Needed</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Critical Alerts</span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-xl font-bold text-red-400 flex items-baseline gap-1.5">
              <span>1</span>
              <span className="text-xs font-normal text-slate-300">Wire Rope (C-003)</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Pending Adjustments</span>
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-300 flex items-baseline gap-1.5">
              <span>2</span>
              <span className="text-xs font-normal text-slate-300">C-001 & C-006</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Fully Operational</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400 flex items-baseline gap-1.5">
              <span>3 / 6</span>
              <span className="text-xs font-normal text-slate-300">Cranes Pass</span>
            </div>
          </div>
        </div>
      </Card>

      {error && (
        <Card className="border-red-300 bg-red-50 dark:bg-red-950/20 p-5 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-red-800 dark:text-red-400 font-semibold">Report Generation Notice</h3>
            <p className="text-red-700 dark:text-red-300 text-sm mt-0.5">{error}</p>
          </div>
        </Card>
      )}

      {/* Main View Container */}
      <Card className="border border-[#1e3a5f]/15 bg-white dark:bg-slate-900 shadow-md rounded-2xl p-6">
        {/* Toolbar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-[#1e3a5f] dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Executive Dashboard
            </button>

            <button
              onClick={() => setViewMode('document')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'document'
                  ? 'bg-white dark:bg-slate-900 text-[#1e3a5f] dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Full Consultant Report Text
            </button>
          </div>

          {/* Export Actions & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Crane Filter Dropdown/Tabs */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 px-2 font-medium">Crane:</span>
              {['ALL', 'CRANE-001', 'CRANE-003', 'CRANE-006'].map(craneId => (
                <button
                  key={craneId}
                  onClick={() => setSelectedCraneFilter(craneId)}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    selectedCraneFilter === craneId
                      ? 'bg-[#1e3a5f] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {craneId}
                </button>
              ))}
            </div>

            {/* Quick Tools */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 h-9 rounded-lg text-xs"
                title="Print Report / Export to PDF"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Print / PDF
              </Button>

              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 h-9 rounded-lg text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-[#1e3a5f] hover:bg-[#152a47] text-white h-9 rounded-lg text-xs shadow-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export TXT
              </Button>
            </div>
          </div>
        </div>

        {/* VIEW 1: EXECUTIVE DASHBOARD MODE */}
        {viewMode === 'dashboard' && (
          <div className="space-y-8 mt-6">
            {/* Section 1: Priority Actions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center justify-center text-red-600">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Critical Priority Actions
                    </h3>
                    <p className="text-xs text-slate-500">
                      Immediate interventions required to uphold safety and prevent equipment breakdown
                    </p>
                  </div>
                </div>

                <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
                  {filteredPriorityActions.length} Action Items
                </Badge>
              </div>

              {filteredPriorityActions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-sm">
                  No priority issues found for the selected crane filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredPriorityActions.map(action => (
                    <Card
                      key={action.id}
                      className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-200 p-5 rounded-xl relative flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{action.id} • {action.craneId}
                          </span>
                          <Badge className={`text-[10px] font-bold px-2 py-0.5 border flex items-center gap-1.5 ${action.badgeClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${action.badgeDot}`} />
                            {action.severity}
                          </Badge>
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {action.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                          Recommended Protocol:
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200/60 dark:border-slate-700">
                          {action.action}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: Equipment Health Assessment */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Equipment Health & Diagnostic Assessment
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-time status, component health scores, and attention flags for each crane
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCranes.map(crane => (
                  <div
                    key={crane.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {crane.id}
                        </h4>
                        <span className="text-xs text-slate-500">{crane.name} ({crane.capacity}) • {crane.location}</span>
                      </div>
                      <Badge className={`text-xs font-semibold border ${crane.badgeClass}`}>
                        {crane.statusText}
                      </Badge>
                    </div>

                    {/* Health score progress bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">Health Index</span>
                        <span className={`font-bold ${
                          crane.healthScore < 50 ? 'text-red-600' : crane.healthScore < 85 ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {crane.healthScore}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            crane.healthScore < 50 ? 'bg-red-500' : crane.healthScore < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${crane.healthScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                      <div className="text-slate-600 dark:text-slate-300">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Component Focus: </span>
                        {crane.componentAttention}
                      </div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        {crane.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Safety & Compliance Alerts */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Compliance & Safety Regulations Standard
                  </h3>
                  <p className="text-xs text-slate-500">
                    Industrial standard checks aligned with ASME B30.2, OSHA 1910.179, and IS standards
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {parsedData.complianceAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-amber-200/70 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-600 text-white text-[10px] uppercase font-bold">
                          {alert.severity}
                        </Badge>
                        <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                          {alert.standard}
                        </span>
                        <span className="text-xs text-slate-500">• Applies to {alert.craneId}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {alert.details}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-800 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-xs shrink-0 self-start md:self-center"
                    >
                      View Safety Protocol
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FORMATTED CONSULTANT REPORT TEXT */}
        {viewMode === 'document' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-2 font-medium">
                <Building2 className="w-4 h-4 text-blue-600" />
                Uttam Innovative Solution Pvt. Ltd. — Official Engineering Diagnostic Report
              </span>
              <span className="text-slate-400">Generated: {new Date().toLocaleDateString()}</span>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8 font-sans leading-relaxed text-sm text-slate-800 dark:text-slate-200 space-y-6 max-h-[700px] overflow-y-auto">
              {report ? (
                report.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-2xl font-black text-[#1e3a5f] dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-3">
                        {paragraph.replace('# ', '')}
                      </h1>
                    )
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-lg font-bold text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-800">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-base font-semibold text-blue-950 dark:text-blue-300">
                        {paragraph.replace('### ', '')}
                      </h3>
                    )
                  }
                  if (paragraph.includes('\n- ') || paragraph.includes('\n1. ')) {
                    return (
                      <div key={index} className="space-y-1.5 pl-2">
                        {paragraph.split('\n').map((line, lIdx) => {
                          if (line.match(/^\d+\.\s/)) {
                            return (
                              <p key={lIdx} className="font-bold text-slate-900 dark:text-white pt-2">
                                {line}
                              </p>
                            )
                          }
                          if (line.startsWith('   - ') || line.startsWith('- ')) {
                            const cleaned = line.replace(/^(\s*-\s*)/, '')
                            const parts = cleaned.split(': ')
                            return (
                              <div key={lIdx} className="flex items-start gap-2 pl-4 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>
                                  {parts.length > 1 ? (
                                    <>
                                      <strong className="font-semibold text-slate-900 dark:text-white">{parts[0]}:</strong>{' '}
                                      {parts.slice(1).join(': ')}
                                    </>
                                  ) : (
                                    cleaned
                                  )}
                                </span>
                              </div>
                            )
                          }
                          return <p key={lIdx}>{line}</p>
                        })}
                      </div>
                    )
                  }
                  return (
                    <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm">
                      {paragraph}
                    </p>
                  )
                })
              ) : (
                <div className="text-center py-12 text-slate-400">
                  No report generated yet. Click "Re-Analyze Fleet" above to run diagnostic analysis.
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
