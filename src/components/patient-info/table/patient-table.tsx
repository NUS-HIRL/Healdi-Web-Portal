import { flexRender } from '@tanstack/react-table'
import { TableHeader } from './table-header'
import { FitnessLevelBadge } from './fitness-level-badge'
import { ActionButton } from './action-button'
import { Patient } from '@/types/patient'

interface PatientTableProps {
  patients: Patient[]
  onSort: (columnKey: string) => void
}

export const PatientTable = ({ patients, onSort }: PatientTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader 
              title="Patient UID" 
              onSort={() => onSort('patientUid')}
            />
            <TableHeader 
              title="Age" 
              onSort={() => onSort('age')}
            />
            <TableHeader 
              title="Gender" 
              onSort={() => onSort('gender')}
            />
            <TableHeader 
              title="Fitness Level" 
              onSort={() => onSort('fitnessLevel')}
            />
            <TableHeader 
              title="HRV (ms)" 
              onSort={() => onSort('hrv')}
            />
            <TableHeader 
              title="Health Conditions" 
              onSort={() => {}} 
              sortable={false}
            />
            <TableHeader 
              title="Goals" 
              onSort={() => {}} 
              sortable={false}
            />
            <TableHeader 
              title="Action" 
              onSort={() => {}} 
              sortable={false}
            />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient, index) => (
            <tr key={patient.patientUid} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium text-gray-900">{patient.patientUid}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.age}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.gender}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <FitnessLevelBadge level={patient.fitnessLevel} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.hrv}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.healthConditions.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.goals.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <ActionButton patientUid={patient.patientUid} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 