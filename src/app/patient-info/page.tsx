"use client"

import { MainHeader } from "@/components/common/main-header"
import { PatientList } from "@/components/patient-info/patient-list"
import { Suspense } from "react"

const PatientInfoPage = () => {
  return (
    <Suspense>
      {/* Header */}
      <MainHeader />
      {/* TODO: Ze Kai: Replace hardcoded breadcrumbs */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <nav className="text-sm text-gray-500 mb-4">
            Home / Select Patient
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Select Patient
          </h1>
          {/* Patient List */}
          <PatientList />
        </div>
      </div>
    </Suspense>
  )
}

export default PatientInfoPage
