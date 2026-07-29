"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { X, Upload } from "lucide-react"

const DAILY_CHECKS = [
  { id: "rope", label: "Wire rope condition", category: "Daily" },
  { id: "hook", label: "Hook latch & deformation", category: "Daily" },
  { id: "sound", label: "Abnormal sound / vibration", category: "Daily" },
  { id: "limit", label: "Limit switch functioning", category: "Daily" },
  { id: "brake", label: "Brake response", category: "Daily" },
  { id: "oil", label: "Oil leakage", category: "Daily" },
]

const WEEKLY_CHECKS = [
  { id: "hoist", label: "Hoist Brake - Wear & air gap", category: "Weekly" },
  { id: "rope-strand", label: "Wire Rope - Broken strands", category: "Weekly" },
  { id: "sheaves", label: "Sheaves - Groove wear", category: "Weekly" },
  { id: "panel", label: "Control Panel - Loose terminals", category: "Weekly" },
  { id: "wheels", label: "Wheels - Flange wear", category: "Weekly" },
  { id: "pendant", label: "Pendant / Radio - Functionality", category: "Weekly" },
]

const MONTHLY_CHECKS = [
  { id: "gearbox-oil", label: "Gearbox Oil Analysis", category: "Monthly" },
  { id: "brake-lining", label: "Brake Lining Thickness", category: "Monthly" },
  { id: "motor-ir", label: "Motor Insulation Resistance (IR Test)", category: "Monthly" },
  { id: "alignment", label: "Alignment Check", category: "Monthly" },
  { id: "load-test", label: "Load Test (As per IS Standard)", category: "Monthly" },
]

export function DailyChecklist() {
  const [selectedCrane, setSelectedCrane] = useState("1")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [observations, setObservations] = useState<Record<string, string>>({})
  const [actionsTaken, setActionsTaken] = useState<Record<string, string>>({})
  const [startTimes, setStartTimes] = useState<Record<string, string>>({})
  const [endTimes, setEndTimes] = useState<Record<string, string>>({})
  const [checkType, setCheckType] = useState("daily")
  const [itemsUsed, setItemsUsed] = useState<
    Record<string, Array<{ id: string; name: string; quantity: string; lifePeriod: string }>>
  >({})
  const [photos, setPhotos] = useState<Record<string, File[]>>({})

  const checks = checkType === "daily" ? DAILY_CHECKS : checkType === "weekly" ? WEEKLY_CHECKS : MONTHLY_CHECKS

  const handleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const addItem = (checkId: string) => {
    const newItemId = Date.now().toString()
    setItemsUsed((prev) => ({
      ...prev,
      [checkId]: [...(prev[checkId] || []), { id: newItemId, name: "", quantity: "", lifePeriod: "" }],
    }))
  }

  const removeItem = (checkId: string, itemId: string) => {
    setItemsUsed((prev) => ({
      ...prev,
      [checkId]: prev[checkId].filter((item) => item.id !== itemId),
    }))
  }

  const updateItem = (checkId: string, itemId: string, field: string, value: string) => {
    setItemsUsed((prev) => ({
      ...prev,
      [checkId]: prev[checkId].map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    }))
  }

  const handlePhotoUpload = (checkId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setPhotos((prev) => ({
        ...prev,
        [checkId]: [...(prev[checkId] || []), ...Array.from(files)],
      }))
    }
  }

  const removePhoto = (checkId: string, index: number) => {
    setPhotos((prev) => ({
      ...prev,
      [checkId]: prev[checkId].filter((_, i) => i !== index),
    }))
  }

  const isFormValid = () => {
    for (const check of checks) {
      if (checkedItems[check.id]) {
        if (!startTimes[check.id] || !endTimes[check.id] || !observations[check.id] || !actionsTaken[check.id]) {
          return false
        }
        const items = itemsUsed[check.id] || []
        for (const item of items) {
          if (!item.name || !item.quantity || !item.lifePeriod) {
            return false
          }
        }
      }
    }
    return true
  }

  const handleSave = () => {
    if (!isFormValid()) {
      alert(
        "Please fill all mandatory fields for each checked item: Start Time, End Time, Observation, and Action Taken",
      )
      return
    }
    console.log("Check saved successfully")
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="space-y-6">
      <Card className="bg-white border-[#1e3a5f]/20">
        <CardHeader className="bg-[#1e3a5f] text-white rounded-t-lg">
          <CardTitle className="text-white">Maintenance Checklist</CardTitle>
          <CardDescription className="text-blue-200">
            Complete daily, weekly, and monthly checks for assigned cranes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">Select Crane</label>
              <Select value={selectedCrane} onValueChange={setSelectedCrane}>
                <SelectTrigger className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#1e3a5f]/30">
                  <SelectItem value="1">Hoist Unit A1 (Assembly Line 1)</SelectItem>
                  <SelectItem value="2">Hoist Unit B2 (Assembly Line 2)</SelectItem>
                  <SelectItem value="3">Hoist Unit C3 (Material Storage)</SelectItem>
                  <SelectItem value="4">Hoist Unit D4 (Assembly Line 3)</SelectItem>
                  <SelectItem value="5">Hoist Unit E5 (Shipping Dock)</SelectItem>
                  <SelectItem value="6">Hoist Unit F6 (Assembly Line 1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">Check Type</label>
              <Select value={checkType} onValueChange={setCheckType}>
                <SelectTrigger className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#1e3a5f]/30">
                  <SelectItem value="daily">Daily Checks</SelectItem>
                  <SelectItem value="weekly">Weekly Checks</SelectItem>
                  <SelectItem value="monthly">Monthly Checks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">Progress</label>
              <div className="bg-[#1e3a5f]/10 rounded-md p-3 text-center border border-[#1e3a5f]/20">
                <p className="text-sm font-semibold text-[#1e3a5f]">
                  {completedCount}/{checks.length} Completed
                </p>
                <div className="w-full bg-[#1e3a5f]/20 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(completedCount / checks.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {checks.map((check) => (
              <div key={check.id} className="border border-[#1e3a5f]/20 rounded-lg p-4 bg-[#1e3a5f]/5 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={checkedItems[check.id] || false}
                    onCheckedChange={() => handleCheck(check.id)}
                    className="border-[#1e3a5f] data-[state=checked]:bg-[#1e3a5f]"
                  />
                  <span
                    className={`flex-1 font-medium ${
                      checkedItems[check.id] ? "line-through text-gray-400" : "text-[#1e3a5f]"
                    }`}
                  >
                    {check.label}
                  </span>
                </label>

                {checkedItems[check.id] && (
                  <div className="space-y-3 pl-8 border-l-2 border-[#1e3a5f]">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">
                          Start Date & Time <span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="datetime-local"
                          value={startTimes[check.id] || ""}
                          onChange={(e) =>
                            setStartTimes((prev) => ({
                              ...prev,
                              [check.id]: e.target.value,
                            }))
                          }
                          className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">
                          End Date & Time <span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="datetime-local"
                          value={endTimes[check.id] || ""}
                          onChange={(e) =>
                            setEndTimes((prev) => ({
                              ...prev,
                              [check.id]: e.target.value,
                            }))
                          }
                          className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">
                        Observation <span className="text-red-600">*</span>
                      </label>
                      <Textarea
                        placeholder="Enter detailed observations about this check item..."
                        value={observations[check.id] || ""}
                        onChange={(e) =>
                          setObservations((prev) => ({
                            ...prev,
                            [check.id]: e.target.value,
                          }))
                        }
                        className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f] placeholder:text-gray-400 text-sm"
                        rows={2}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1e3a5f] mb-2 block">
                        Action Taken <span className="text-red-600">*</span>
                      </label>
                      <Textarea
                        placeholder="Describe the action taken or maintenance performed..."
                        value={actionsTaken[check.id] || ""}
                        onChange={(e) =>
                          setActionsTaken((prev) => ({
                            ...prev,
                            [check.id]: e.target.value,
                          }))
                        }
                        className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f] placeholder:text-gray-400 text-sm"
                        rows={2}
                        required
                      />
                    </div>

                    <div className="bg-white rounded-lg p-3 space-y-3 border border-[#1e3a5f]/20">
                      <label className="text-sm font-medium text-[#1e3a5f] block">Items Used (Optional)</label>

                      {(itemsUsed[check.id] || []).map((item, index) => (
                        <div key={item.id} className="space-y-2 bg-[#1e3a5f]/5 p-3 rounded border border-[#1e3a5f]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500">Item {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeItem(check.id, item.id)}
                              className="text-red-600 hover:text-red-700 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-xs font-medium text-[#1e3a5f] mb-1 block">Item Name</label>
                              <Input
                                type="text"
                                placeholder="e.g., Oil, Filter, Bolt"
                                value={item.name}
                                onChange={(e) => updateItem(check.id, item.id, "name", e.target.value)}
                                className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f] text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#1e3a5f] mb-1 block">Quantity</label>
                              <Input
                                type="text"
                                placeholder="e.g., 2, 5L, 1kg"
                                value={item.quantity}
                                onChange={(e) => updateItem(check.id, item.id, "quantity", e.target.value)}
                                className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f] text-sm h-8"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#1e3a5f] mb-1 block">Life Period</label>
                              <Input
                                type="text"
                                placeholder="e.g., 1 year, 6 months"
                                value={item.lifePeriod}
                                onChange={(e) => updateItem(check.id, item.id, "lifePeriod", e.target.value)}
                                className="bg-white border-[#1e3a5f]/30 text-[#1e3a5f] text-sm h-8"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        onClick={() => addItem(check.id)}
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/10"
                      >
                        + Add Item Used
                      </Button>
                    </div>

                    <div className="bg-white rounded-lg p-3 space-y-3 border border-[#1e3a5f]/20">
                      <label className="text-sm font-medium text-[#1e3a5f] block">Photographs (Optional)</label>

                      {(photos[check.id] || []).length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {(photos[check.id] || []).map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded border border-[#1e3a5f]/20"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(check.id, index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="border-2 border-dashed border-[#1e3a5f]/30 rounded-lg p-4 text-center hover:border-[#1e3a5f]/50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(check.id, e)}
                          className="hidden"
                          id={`photo-upload-${check.id}`}
                        />
                        <label
                          htmlFor={`photo-upload-${check.id}`}
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload size={20} className="text-[#1e3a5f]" />
                          <span className="text-sm font-medium text-[#1e3a5f]">Click to upload photos</span>
                          <span className="text-xs text-gray-400">or drag and drop</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white flex-1 font-semibold">
              Save Check
            </Button>
            <Button variant="outline" className="border-[#1e3a5f]/30 bg-white text-[#1e3a5f] hover:bg-[#1e3a5f]/10">
              Clear Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
