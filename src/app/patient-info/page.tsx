"use client"

import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { Sidebar } from "@/components/common/sidebar"
import { PatientList } from "@/components/patient-info/patient-list"
import { Patient } from "@/types/patient"

// Placeholder data
const placeholderPatients: Patient[] = [
  {
    id: "1",
    patientUid: "RES0001",
    age: 56,
    gender: "M",
    fitnessLevel: "High",
    hrv: 65,
    healthConditions: ["Hypertension"],
    goals: ["Lower BP", "10k steps/day"]
  },
  {
    id: "2",
    patientUid: "RES0002",
    age: 50,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 42,
    healthConditions: ["Hypertension", "Obesity"],
    goals: ["Weight loss", "Improve fitness"]
  },
  {
    id: "3",
    patientUid: "RES0003",
    age: 75,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 42,
    healthConditions: ["Prehypertension"],
    goals: ["Stress reduction"]
  },
  {
    id: "4",
    patientUid: "RES0004",
    age: 45,
    gender: "M",
    fitnessLevel: "High",
    hrv: 78,
    healthConditions: ["Diabetes"],
    goals: ["Blood sugar control", "Weight management"]
  },
  {
    id: "5",
    patientUid: "RES0005",
    age: 62,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 55,
    healthConditions: ["Hypertension", "Arthritis"],
    goals: ["Pain management", "Mobility improvement"]
  },
  {
    id: "6",
    patientUid: "RES0006",
    age: 38,
    gender: "M",
    fitnessLevel: "High",
    hrv: 82,
    healthConditions: ["Asthma"],
    goals: ["Respiratory health", "Endurance building"]
  },
  {
    id: "7",
    patientUid: "RES0007",
    age: 55,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 38,
    healthConditions: ["Heart Disease"],
    goals: ["Cardiac rehabilitation", "Lifestyle changes"]
  },
  {
    id: "8",
    patientUid: "RES0008",
    age: 42,
    gender: "M",
    fitnessLevel: "Moderate",
    hrv: 48,
    healthConditions: ["Obesity"],
    goals: ["Weight loss", "Muscle building"]
  },
  {
    id: "9",
    patientUid: "RES0009",
    age: 68,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 45,
    healthConditions: ["Osteoporosis"],
    goals: ["Bone strength", "Balance improvement"]
  },
  {
    id: "10",
    patientUid: "RES0010",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  },
  {
    id: "11",
    patientUid: "RES0011",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  },
  {
    id: "12",
    patientUid: "RES0012",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  }
]

export default function PatientInfoPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <MainHeader />

        <main className="flex-1 p-6 overflow-auto">
          <nav className="text-sm text-gray-500 mb-4">
            Home / Select Patient
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Select Patient
          </h1>
          {/* Patient List */}
          <PatientList patients={placeholderPatients} />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
