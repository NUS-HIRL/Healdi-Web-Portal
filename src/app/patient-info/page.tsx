'use client'

import { Footer } from "@/components/common/footer";
import { Sidebar } from "@/components/common/sidebar";
import { PatientList } from "@/components/patient-info/patient-list";
import { Patient } from '@/types/patient'
import { Bell, Search, User } from 'lucide-react'
import { useState } from 'react'

// Placeholder data
const placeholderPatients: Patient[] = [
  {
    id: '1', patientUid: 'RES0001', age: 56, gender: 'M', fitnessLevel: 'High', hrv: 65, healthConditions: ['Hypertension'], goals: ['Lower BP', '10k steps/day']
  },
  {
    id: '2', patientUid: 'RES0002', age: 50, gender: 'F', fitnessLevel: 'Moderate', hrv: 42, healthConditions: ['Hypertension', 'Obesity'], goals: ['Weight loss', 'Improve fitness']
  },
  {
    id: '3', patientUid: 'RES0003', age: 75, gender: 'F', fitnessLevel: 'Low', hrv: 42, healthConditions: ['Prehypertension'], goals: ['Stress reduction']
  },
  {
    id: '4', patientUid: 'RES0004', age: 45, gender: 'M', fitnessLevel: 'High', hrv: 78, healthConditions: ['Diabetes'], goals: ['Blood sugar control', 'Weight management']
  },
  {
    id: '5', patientUid: 'RES0005', age: 62, gender: 'F', fitnessLevel: 'Moderate', hrv: 55, healthConditions: ['Hypertension', 'Arthritis'], goals: ['Pain management', 'Mobility improvement']
  },
  {
    id: '6', patientUid: 'RES0006', age: 38, gender: 'M', fitnessLevel: 'High', hrv: 82, healthConditions: ['Asthma'], goals: ['Respiratory health', 'Endurance building']
  },
  {
    id: '7', patientUid: 'RES0007', age: 55, gender: 'F', fitnessLevel: 'Low', hrv: 38, healthConditions: ['Heart Disease'], goals: ['Cardiac rehabilitation', 'Lifestyle changes']
  },
  {
    id: '8', patientUid: 'RES0008', age: 42, gender: 'M', fitnessLevel: 'Moderate', hrv: 48, healthConditions: ['Obesity'], goals: ['Weight loss', 'Muscle building']
  },
  {
    id: '9', patientUid: 'RES0009', age: 68, gender: 'F', fitnessLevel: 'Low', hrv: 45, healthConditions: ['Osteoporosis'], goals: ['Bone strength', 'Balance improvement']
  },
  {
    id: '10', patientUid: 'RES0010', age: 35, gender: 'M', fitnessLevel: 'High', hrv: 75, healthConditions: ['Anxiety'], goals: ['Stress management', 'Mental wellness']
  },
  {
    id: '11', patientUid: 'RES0011', age: 35, gender: 'M', fitnessLevel: 'High', hrv: 75, healthConditions: ['Anxiety'], goals: ['Stress management', 'Mental wellness']
  },
  {
    id: '12', patientUid: 'RES0012', age: 35, gender: 'M', fitnessLevel: 'High', hrv: 75, healthConditions: ['Anxiety'], goals: ['Stress management', 'Mental wellness']
  },
]

export default function PatientInfoPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search Patient UID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Bell className="text-gray-600" size={20} />
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

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
  );
} 