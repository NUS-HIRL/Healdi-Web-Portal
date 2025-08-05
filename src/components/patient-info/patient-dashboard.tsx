'use client'

import { useState } from 'react'
import { Sidebar } from '../common/sidebar'
import { PatientHeader } from './patient-header'
import { ReportTab } from './report/report-tab'

interface PatientDashboardProps {
  patientId: string
}

export function PatientDashboard({ patientId }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState('Reports')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <PatientHeader patientId={patientId} />
        
        <div className="flex-1 overflow-auto">
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
            {activeTab === 'Medications' && <div className="text-gray-500">Medications content coming soon...</div>}
            {activeTab === 'Appointments' && <div className="text-gray-500">Appointments content coming soon...</div>}
            {activeTab === 'Notes' && <div className="text-gray-500">Notes content coming soon...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
