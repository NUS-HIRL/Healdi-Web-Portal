"use client"

import { useState } from "react"
import { Footer } from "../common/footer"
import { Sidebar } from "../common/sidebar"
import { GoalsTab } from "./goals/goals-tab"
import { Medications } from "./medications/medications"
import { PatientHeader } from "./patient-header"
import { ReportTab } from "./report/report-tab"
import { Button } from "../ui/button"
import { AllergiesDetailsSidebar } from "./allergies/allergies-details.sidebar"
import { AiExerciseRecommendations } from "./ai-exercise-recommendations/ai-exercise-recommendations"
import { ResourcesTab } from "./resources/resources-tab"

interface PatientDashboardProps {
  patientId: string
}

export const PatientDashboard = ({ patientId }: PatientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("Reports")

  const tabs = [
    "Reports",
    "Medications",
    "Goals",
    "AI Exercise Recommendations",
    "Resources"
  ]
  const [isAllergiesOpen, setIsAllergiesOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <PatientHeader
          patientId={patientId}
          onViewAllergies={() => setIsAllergiesOpen(true)}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-2">
            <div className="mb-2">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    variant="ghost"
                    className={`px-4 py-3 font-medium text-sm rounded-none ${
                      activeTab === tab
                        ? "text-cyan-600 border-b-2 border-cyan-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    {tab}
                  </Button>
                ))}
              </div>
            </div>

            {activeTab === "Reports" && <ReportTab />}
            {activeTab === "Medications" && <Medications />}
            {activeTab === "Goals" && <GoalsTab patientId={patientId} />}
            {activeTab === "AI Exercise Recommendations" && (
              <AiExerciseRecommendations patientId={patientId} />
            )}
            {activeTab === "Resources" && <ResourcesTab />}
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Allergies modal */}
      <AllergiesDetailsSidebar
        isOpen={isAllergiesOpen}
        onClose={() => setIsAllergiesOpen(false)}
      />
    </div>
  )
}
