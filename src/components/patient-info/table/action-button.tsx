import { Eye } from 'lucide-react'
import Link from 'next/link'

interface ActionButtonProps {
  patientUid: string
}

export function ActionButton({ patientUid }: ActionButtonProps) {
  return (
    <Link
      href={`/patient-info/${patientUid}`}
      className="flex items-center justify-center w-8 h-8 border border-blue-300 rounded-md hover:bg-blue-200 transition-colors"
      title="View patient details"
    >
      <Eye size={16} className="text-blue-600" />
    </Link>
  )
} 