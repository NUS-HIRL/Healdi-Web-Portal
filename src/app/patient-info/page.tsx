"use client"

import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { Sidebar } from "@/components/common/sidebar"
import { PatientList } from "@/components/patient-info/patient-list"

const PatientInfoPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <MainHeader />

        <main className="flex-1 p-6 overflow-auto">
          <nav className="text-sm text-gray-500 mb-4">
            {/* TODO: Ze Kai: Fix the hardcoded breadcrumbs here to redirect to the pages */}
            Home / Select Patient
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Select Patient
          </h1>
          {/* Patient List */}
          <PatientList />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default PatientInfoPage
