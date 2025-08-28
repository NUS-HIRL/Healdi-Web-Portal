"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Footer } from "../../common/footer"
import { Sidebar } from "../../common/sidebar"
import { Search, Bell, User, Trash } from "lucide-react"
import { MultiSelect } from "@/components/common/multiselect"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

type DayAbbr = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
const DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
] as const satisfies readonly DayAbbr[]
const DAY_FULL: Record<DayAbbr, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday"
}

interface AddMedicationPageProps {
  medicationId: string
  onChangeMedication?: () => void
}

type Dose = { quantity: number; time: string }
type Schedule = Record<DayAbbr, Dose[]>

type MedicationPlanForm = {
  medicationId: string
  recurringDays: DayAbbr[]
}

type Medication = {
  id: string
  name: string
  dosage: string
  type: string
}

/** Mock – replace with real fetch using medicationId */
const MOCK_MEDICATIONS: Record<string, Medication> = {
  "1": {
    id: "1",
    name: "Propranolol Hydrochloride",
    dosage: "500 mg",
    type: "Tablet"
  }
}

export const EditMedicationPage = ({
  medicationId
}: AddMedicationPageProps) => {
  const [medication, setMedication] = useState<Medication | null>(null)
  const [schedule, setSchedule] = useState<Schedule>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  })
  const router = useRouter()

  const { handleSubmit, setValue, watch, reset } = useForm<MedicationPlanForm>({
    defaultValues: { medicationId, recurringDays: [] }
  })

  const TIME_OPTIONS = useMemo(() => {
    const list: string[] = []
    for (let i = 0; i < 24 * 4; i++) {
      const h = Math.floor(i / 4)
      const m = (i % 4) * 15
      list.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      )
    }
    return list
  }, [])

  useEffect(() => {
    const m = MOCK_MEDICATIONS[medicationId] ?? MOCK_MEDICATIONS["1"]
    setMedication(m)
    reset({ medicationId, recurringDays: [] })
  }, [medicationId, reset])

  const recurringDays = watch("recurringDays")

  // Align schedule with chosen days
  useEffect(() => {
    setSchedule((prev) => {
      const next: Schedule = {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
      }
      for (const day of recurringDays) {
        const existing = prev[day]
        next[day] =
          existing && existing.length > 0
            ? existing.map((d) => ({ ...d }))
            : [{ quantity: 1, time: "" }]
      }
      return next
    })
  }, [recurringDays])

  const addDose = (day: DayAbbr) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { quantity: 1, time: "" }]
    }))
  }
  const removeDose = (day: DayAbbr, index: number) => {
    setSchedule((prev) => {
      const copy = { ...prev }
      const arr = [...(copy[day] || [])]
      arr.splice(index, 1)
      copy[day] = arr.length ? arr : [{ quantity: 1, time: "" }]
      return copy
    })
  }
  const updateDoseQty = (day: DayAbbr, index: number, qty: number) => {
    setSchedule((prev) => {
      const copy = { ...prev }
      const arr = [...(copy[day] || [])]
      arr[index] = { ...arr[index], quantity: qty }
      copy[day] = arr
      return copy
    })
  }
  const updateDoseTime = (day: DayAbbr, index: number, time: string) => {
    setSchedule((prev) => {
      const copy = { ...prev }
      const arr = [...(copy[day] || [])]
      arr[index] = { ...arr[index], time }
      copy[day] = arr
      return copy
    })
  }

  const onSubmit = (data: MedicationPlanForm) => {
    router.push(`/patient-info/medication`)
    console.log("Medication Plan Data:", { ...data, schedule })
  }

  const onBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = "/patients/medication" // fallback route
      }
    }
  }

  if (!medication) return <div>Loading...</div>

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search Patient UID"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  21
                </span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            <nav className="text-sm text-gray-500">
              Home / Select Patient / View Patient / Select Medication Plan /
              Add Medication Plan
            </nav>
          </div>

          <div className="px-6 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 mr-3">
                <ArrowLeft className="h-4 w-4" />
              </button>
              Edit Medication Plan
            </h1>
          </div>

          {/* Card */}
          <div className="px-6 pt-4 pb-6 bg-white">
            {/* Section title */}
            <h2 className="text-xl font-semibold mb-6 text-[#4FA0E8]">
              Existing Medication Plan
            </h2>

            {/* Selected medication row (Change on far right) */}
            {/* Top info row: left group tight, Change on far right */}
            <div className="mb-6 w-full md:flex md:items-start md:justify-between">
              {/* LEFT: name / dosage / type packed together */}
              <div className="space-y-4 md:space-y-0 md:flex md:items-start md:gap-8 md:flex-none">
                <div>
                  <Label className="text-sm font-semibold text-gray-500">
                    Selected Medication
                  </Label>
                  <p className="mt-2 text-gray-900">{medication.name}</p>
                </div>

                <div className="md:border-l md:pl-8 border-gray-200">
                  <Label className="text-sm font-semibold text-gray-500">
                    Dosage
                  </Label>
                  <p className="mt-2 text-gray-900">{medication.dosage}</p>
                </div>

                <div className="md:border-l md:pl-8 border-gray-200">
                  <Label className="text-sm font-semibold text-gray-500">
                    Type
                  </Label>
                  <p className="mt-2 text-gray-900">{medication.type}</p>
                </div>
              </div>
            </div>

            {/* Recurring Period */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-6">
              <div className="md:col-span-1">
                <Label className="text-sm font-semibold text-gray-700">
                  Recurring Period
                </Label>
                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Days to take the medication.
                </p>
              </div>
              <div className="md:col-span-2">
                <MultiSelect<DayAbbr>
                  value={recurringDays}
                  onChange={(next) =>
                    setValue("recurringDays", next, { shouldDirty: true })
                  }
                  placeholder="Select Days"
                  options={DAYS}
                />
              </div>
            </div>

            {/* === Day sections only if there are selected days === */}
            {recurringDays.length > 0 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 ">
                {recurringDays.map((abbr) => {
                  const doses = schedule[abbr] || []
                  return (
                    <section key={abbr}>
                      <div className="flex items-center justify-between mb-4 ">
                        <h3 className="text-lg font-semibold text-[#4FA0E8]">
                          {DAY_FULL[abbr]}
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 px-3 bg-white text-[#60A5FA] border border-[#60A5FA]
                                    hover:bg-white hover:text-[#60A5FA] hover:border-[#60A5FA]
                                    focus-visible:ring-[#60A5FA]/40"
                          onClick={() => addDose(abbr)}>
                          + Add Dose
                        </Button>
                      </div>
                      {doses.map((dose, idx) => (
                        <div key={`${abbr}-${idx}`} className="mb-8">
                          {/* Dose X Quantity */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="md:col-span-1">
                              <Label className="text-sm font-semibold text-gray-700">
                                {`Dose ${idx + 1} Quantity`}
                              </Label>
                              <p className="text-sm text-gray-500 mt-1">
                                Dosage of the medication.
                              </p>
                            </div>
                            <div className="md:col-span-2 flex items-center gap-3">
                              <Input
                                type="number"
                                min={0}
                                value={dose.quantity}
                                onChange={(e) =>
                                  updateDoseQty(
                                    abbr,
                                    idx,
                                    Number(e.target.value || 0)
                                  )
                                }
                                className="w-full"
                                placeholder="1"
                              />
                              <Button
                                type="button"
                                aria-label="Remove dose"
                                variant="outline"
                                className="h-9 w-9 bg-white border border-red-500 hover:border-red-600 focus-visible:ring-red-200"
                                onClick={() => removeDose(abbr, idx)}>
                                <Trash size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </div>

                          {/* Dose X Time */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
                            <div className="md:col-span-1">
                              <Label className="text-sm font-semibold text-gray-700">
                                {`Dose ${idx + 1} Time`}
                              </Label>
                              <p className="text-sm text-gray-500 mt-1 mb-5">
                                Select the time at which the medication to be
                                taken.
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <Select
                                value={dose.time || undefined}
                                onValueChange={(v) =>
                                  updateDoseTime(abbr, idx, v)
                                }>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Time" />
                                </SelectTrigger>
                                <SelectContent className="max-h-64">
                                  {TIME_OPTIONS.map((t) => (
                                    <SelectItem
                                      key={`${abbr}-${idx}-${t}`}
                                      value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </section>
                  )
                })}

                {/* Ready to Submit */}
                <div className="bg-gray-100 rounded-lg p-6 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Ready to Submit?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Review your filled form details and make sure everything is
                    accurate. Once you are ready, click the Add Medication Plan
                    button to add the new medication plan.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      className="bg-black text-white hover:bg-gray-800"
                      onClick={() => {
                        setValue("medicationId", medication.id, {
                          shouldDirty: true
                        })
                        router.push(`/patient-info/medication`)
                      }}>
                      Add Medication Plan
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Empty-state (no days picked) Ready to Submit block */}
            {recurringDays.length === 0 && (
              <div className="bg-gray-100 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Submit?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Review your filled form details and make sure everything is
                  accurate. Once you are ready, click the Add Medication Plan
                  button to add the new medication plan.
                </p>
                <div className="flex justify-end">
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => {
                      setValue("medicationId", medication.id, {
                        shouldDirty: true
                      })
                      router.push(`/patient-info/medication`)
                    }}>
                    Add Medication Plan
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
