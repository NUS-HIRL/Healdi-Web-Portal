"use client"

import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { RecentPatientsColumns } from "@/components/columns/recent-patients-columns"
import Image from "next/image"
import usePagination from "@/hooks/use-pagination"
import { Patient } from "@/types/patient"
import { MONTH_NAMES_ARRAY } from "@/constants/month-names"

// Mock data for recent patients
const recentPatients: Patient[] = [
  {
    id: "1",
    patientUid: "RES0001",
    age: 56,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 45,
    healthConditions: ["Hypertension"],
    goals: ["Weight Loss"]
  },
  {
    id: "2",
    patientUid: "RES0002",
    age: 65,
    gender: "M",
    fitnessLevel: "Low",
    hrv: 38,
    healthConditions: ["Diabetes"],
    goals: ["Blood Sugar Control"]
  },
  {
    id: "3",
    patientUid: "RES0003",
    age: 54,
    gender: "M",
    fitnessLevel: "High",
    hrv: 52,
    healthConditions: ["Arthritis"],
    goals: ["Pain Management"]
  },
  {
    id: "4",
    patientUid: "RES0004",
    age: 65,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 42,
    healthConditions: ["Heart Disease"],
    goals: ["Cardiovascular Health"]
  },
  {
    id: "5",
    patientUid: "RES0005",
    age: 63,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 40,
    healthConditions: ["Obesity"],
    goals: ["Weight Management"]
  },
  {
    id: "6",
    patientUid: "RES0006",
    age: 48,
    gender: "M",
    fitnessLevel: "High",
    hrv: 55,
    healthConditions: ["Asthma"],
    goals: ["Respiratory Fitness"]
  }
]

// Mock pagination response
const recentPatientsResponse = {
  data: recentPatients,
  count: recentPatients.length,
  pagination: {
    next_page_key: null,
    previous_page_key: null
  }
}

const HomePage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10
  })
  const { setCurrentPaginationTokenAndPageIndex, paginationToken } =
    usePagination(pagination, setPagination)
  const columns = RecentPatientsColumns()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [viewMode, setViewMode] = useState<"month" | "year">("month")

  // Generate years array (current year ± 10 years)
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  // Month names
  const monthNames = MONTH_NAMES_ARRAY

  // Update calendar date when year or month changes
  const handleYearChange = (year: string) => {
    const newYear = parseInt(year)
    setCurrentYear(newYear)
    setSelectedDate(new Date(newYear, currentMonth, 1))
  }

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month)
    setCurrentMonth(newMonth)
    setSelectedDate(new Date(currentYear, newMonth, 1))
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-sm text-gray-600 mb-2">Home</h1>
          <h2 className="text-3xl font-bold text-gray-900">
            Hello, Dr. Andrew
          </h2>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card className="max-h-24 flex justify-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Patient</p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Image
                      src="/common/new-patient-icon.svg"
                      alt="New Patient"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="max-h-24 flex justify-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Hypertensive Patients
                    </p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Image
                      src="/common/hypertensive-patient-icon.svg"
                      alt="Hypertensive Patients"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Recent Patients Section */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">
                Recent Patients
              </h4>
              <CustomDataTable
                data={recentPatientsResponse}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                setCurrentPaginationTokenAndPageIndex={
                  setCurrentPaginationTokenAndPageIndex
                }
                paginationToken={paginationToken}
                isLoading={false}
                hidePagination={true}
                error={null}
              />
            </div>

            {/* Appointments Section */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">
                Appointments
              </h4>
              <div className="py-2 max-w-screen">
                <div className="relative flex flex-1 flex-col overflow-x-auto rounded-md border h-[500px]">
                  {/* Calendar Controls */}
                  <div className="flex items-center justify-end gap-2 p-3 bg-white">
                    <div className="flex items-center gap-2">
                      <Select
                        value={currentYear.toString()}
                        onValueChange={handleYearChange}>
                        <SelectTrigger className="w-22 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={currentMonth.toString()}
                        onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-22 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {monthNames.map((month, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <ToggleGroup
                      type="single"
                      value={viewMode}
                      onValueChange={(value) =>
                        setViewMode(value as "month" | "year")
                      }>
                      <ToggleGroupItem
                        value="month"
                        className="h-8 px-3 text-xs">
                        Month
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="year"
                        className="h-8 px-3 text-xs">
                        Year
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={new Date(currentYear, currentMonth)}
                    onMonthChange={(date) => {
                      setCurrentYear(date.getFullYear())
                      setCurrentMonth(date.getMonth())
                    }}
                    className="h-full w-full [--cell-size:4.4rem]"
                    showOutsideDays={true}
                    required={true}
                    captionLayout="dropdown"
                    classNames={{
                      nav: "hidden",
                      month_caption: "hidden",
                      caption_label: "hidden"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
