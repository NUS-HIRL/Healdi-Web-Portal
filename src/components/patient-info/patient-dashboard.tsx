'use client'

import { useEffect, useState } from 'react'
import { Goal, X } from 'lucide-react'
import { Sidebar } from '../common/sidebar'
import { PatientHeader } from './patient-header'
import { ReportTab } from './report/report-tab'
import { GoalsTab } from './goals/goals-tab'
import { Footer } from '../common/footer'
import Medications from './medications/medications'
import AiExerciseRecommendations from './ai-exercise-recommendations/ai-exercise-recommendations'
import { AllergiesDetailsSidebar } from './allergies/allergies-details.sidebar'

interface PatientDashboardProps {
  patientId: string
}

// Lightweight modal for now
const Modal = ({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-start justify-center pt-24">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 id="modal-title" className="text-sm font-medium text-gray-900">{title}</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600" aria-label="Close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div className="px-4 py-4 text-sm text-gray-600">
            {children}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-right">
            <button onClick={onClose} className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PatientDashboard = ({ patientId }: PatientDashboardProps) => {
  const [activeTab, setActiveTab] = useState('Reports')
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
                {['Reports', 'Medications', 'Lab Results', 'Goals', 'AI Exercise Recommendations', 'Resources'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'Reports' && <ReportTab />}
            {activeTab === 'Medications' && <Medications />}
            {activeTab === 'Lab Results' && (
              <div className="text-gray-500">Lab Results content coming soon...</div>
            )}
            {activeTab === 'Goals' && <GoalsTab patientId={patientId} />}
            {activeTab === 'AI Exercise Recommendations' && (
              <AiExerciseRecommendations />
            )}
            {activeTab === 'Resources' && (
              <div className="text-gray-500">Resources content coming soon...</div>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Allergies modal */}
      <AllergiesDetailsSidebar
        isOpen={isAllergiesOpen}
        onClose={() => setIsAllergiesOpen(false)}
      />
    </div>
  )
}
