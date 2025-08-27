"use client"

import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
import { Subtitle } from "@/components/common/sidebar/subtitle"
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
      title: "Hypertension",
      description: "High blood pressure condition requiring regular monitoring and medication management."
    },
    {
      id: "2",
      title: "Type 2 Diabetes",
      description: "Metabolic disorder characterized by high blood sugar levels, managed through diet and medication."
    },
    {
      id: "3",
      title: "High Cholesterol",
      description: "Elevated cholesterol levels in the blood that may increase risk of heart disease."
    },
    {
      id: "4",
      title: "Asthma",
      description: "Respiratory condition causing difficulty breathing, wheezing, and shortness of breath."
    },
    {
      id: "5",
      title: "Arthritis",
      description: "Joint inflammation causing pain, stiffness, and reduced range of motion."
    },
    {
      id: "6",
      title: "Sleep Apnea",
      description: "Sleep disorder characterized by breathing interruptions during sleep."
    }
  ]

  return conditions.slice(0, count)
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

        {/* Health Conditions List */}
        <div className="space-y-4">
          {healthConditions.map((condition, index) => (
            <div key={condition.id}>
              <div className="space-y-2">
                {/* Condition Title */}
                <h4 className="text-sm font-semibold text-gray-900">
                  {condition.title}
                </h4>

                {/* Condition Description */}
                <p className="text-sm text-gray-600">
                  {condition.description}
                </p>
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
