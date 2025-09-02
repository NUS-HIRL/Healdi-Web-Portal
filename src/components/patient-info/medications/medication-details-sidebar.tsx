"use client"

import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
import { Subtitle } from "@/components/common/sidebar/subtitle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Medication, MedicationTableValue } from "@/types/medication"
import { useRouter } from "next/navigation"

interface MedicationDetailsSidebarProps {
  medication: Medication | MedicationTableValue | null
  isOpen: boolean
  onClose: () => void
}

export const MedicationDetailsSidebar = ({
  medication,
  isOpen,
  onClose
}: MedicationDetailsSidebarProps) => {
  const router = useRouter()

  return (
    <DetailsSidebar isOpen={isOpen} onClose={onClose}>
      {medication && (
        <div className="space-y-4 ml-4 mr-4">
          <Separator className="mt-0" />

          <div className="space-y-2">
            <Subtitle title="Medication Name" />
            <Badge
              variant="secondary"
              className="bg-orange-50 text-red-400 border-orange-200">
              {medication.name}
            </Badge>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Dosage" />
            <p className="text-sm text-gray-900">{medication.dosage}</p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Type" />
            <p className="text-sm text-gray-900 leading-relaxed">
              {medication.type}
            </p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Creator" />
            <p className="text-sm text-gray-900 leading-relaxed">
              {medication.creator}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-black text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800"
              onClick={() => {
                // Fix/create this route
                router.push(`/patient-info/medication/${medication.id}/edit`)
              }}>
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
              Delete
            </Button>
          </div>
        </div>
      )}
    </DetailsSidebar>
  )
}
