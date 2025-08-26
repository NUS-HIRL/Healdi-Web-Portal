"use client"

import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
import { Subtitle } from "@/components/common/sidebar/subtitle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HealthCondition } from "@/types/health-condition"

interface HealthConditionsSidebarProps {
  isOpen: boolean
  onClose: () => void
  healthConditionsCount: number
}

// Mock health conditions data based on the count
const generateHealthConditions = (count: number): HealthCondition[] => {
  const conditions = [
    {
      id: "1",
      name: "Hypertension",
      severity: "Moderate" as const,
      diagnosedDate: "Jan 2023",
      status: "Active" as const
    },
    {
      id: "2",
      name: "Type 2 Diabetes",
      severity: "High" as const,
      diagnosedDate: "Mar 2022",
      status: "Active" as const
    },
    {
      id: "3",
      name: "High Cholesterol",
      severity: "Moderate" as const,
      diagnosedDate: "Jun 2023",
      status: "Monitoring" as const
    },
    {
      id: "4",
      name: "Asthma",
      severity: "Low" as const,
      diagnosedDate: "Dec 2021",
      status: "Active" as const
    },
    {
      id: "5",
      name: "Arthritis",
      severity: "Moderate" as const,
      diagnosedDate: "Aug 2023",
      status: "Active" as const
    },
    {
      id: "6",
      name: "Sleep Apnea",
      severity: "High" as const,
      diagnosedDate: "Feb 2023",
      status: "Monitoring" as const
    }
  ]

  return conditions.slice(0, count)
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-red-50 text-red-700 border-red-200"
    case "Moderate":
      return "bg-yellow-50 text-yellow-700 border-yellow-200"
    case "Low":
      return "bg-green-50 text-green-700 border-green-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-red-50 text-red-700 border-red-200"
    case "Monitoring":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "Inactive":
      return "bg-gray-50 text-gray-700 border-gray-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export const HealthConditionsSidebar = ({
  isOpen,
  onClose,
  healthConditionsCount
}: HealthConditionsSidebarProps) => {
  const healthConditions = generateHealthConditions(healthConditionsCount)

  return (
    <DetailsSidebar isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 ml-4 mr-4">
        <Separator className="mt-0" />

        {/* Header */}
        <div className="space-y-2">
          <Subtitle title={`Health Conditions (${healthConditionsCount})`} />
          <p className="text-sm text-gray-600">
            Current and past health conditions for this patient
          </p>
        </div>

        <Separator className="mt-2" />

        {/* Health Conditions List */}
        <div className="space-y-4">
          {healthConditions.map((condition, index) => (
            <div key={condition.id}>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                {/* Condition Name */}
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {condition.name}
                  </h4>
                </div>

                {/* Severity and Status Badges */}
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={getSeverityColor(condition.severity)}>
                    {condition.severity} Severity
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(condition.status)}>
                    {condition.status}
                  </Badge>
                </div>

                {/* Diagnosed Date */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Diagnosed</p>
                  <p className="text-sm text-gray-900">{condition.diagnosedDate}</p>
                </div>
              </div>
              
              {/* Add separator between conditions except for the last one */}
              {index < healthConditions.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {healthConditions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              No health conditions recorded for this patient.
            </p>
          </div>
        )}
      </div>
    </DetailsSidebar>
  )
}
