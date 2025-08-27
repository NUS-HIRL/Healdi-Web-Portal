"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { Button } from "@/components/ui/button"
import { Resource } from "@/types/resource"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ResourceColumns } from "../../columns/resource-columns"
import { ResourceDetailsSidebar } from "./resource-details-sidebar"

interface ResourcesTabProps {
  patientId?: string
}

export const ResourcesTab = ({ patientId }: ResourcesTabProps) => {
  const router = useRouter()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  )
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Mock data for resources - TODO: Replace with API data when available
  const mockResources: Resource[] = useMemo(
    () => [
      {
        id: "1",
        type: "Article",
        source: "HealthXChange",
        title: "Annual Screening for Diabetes Complications",
        assignedOrSaved: "Saved",
        category: "Complications & Prevention",
        subCategory: "Protective Measures",
        url: "https://example.com/diabetes-screening"
      },
      {
        id: "2",
        type: "Video",
        source: "MedEd",
        title: "Understanding Blood Pressure Management",
        assignedOrSaved: "Assigned",
        category: "Cardiovascular Health",
        subCategory: "Hypertension",
        url: "https://example.com/blood-pressure-management"
      },
      {
        id: "3",
        type: "Document",
        source: "PatientCare",
        title: "Exercise Guidelines for Heart Health",
        assignedOrSaved: "Assigned",
        category: "Physical Activity",
        subCategory: "Cardio Exercise",
        url: "https://example.com/exercise-guidelines"
      },
      {
        id: "4",
        type: "Article",
        source: "HealthXChange",
        title: "Nutrition Tips for Better Health",
        assignedOrSaved: "Saved",
        category: "Nutrition",
        subCategory: "Healthy Eating",
        url: "https://example.com/nutrition-tips"
      },
      {
        id: "5",
        type: "Video",
        source: "MedEd",
        title: "Stress Management Techniques",
        assignedOrSaved: "Assigned",
        category: "Mental Health",
        subCategory: "Stress Relief",
        url: "https://example.com/stress-management"
      }
    ],
    []
  )

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource)
    setIsViewOpen(true)
  }

  const columns = ResourceColumns({
    onViewResource: handleViewResource
  })

  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedResource(null)
  }

  const ResourcesTable = CustomDataTable<Resource>

  // Mock paginated results
  const results = {
    data: mockResources,
    totalCount: mockResources.length,
    page: 1,
    totalPages: Math.ceil(mockResources.length / pagination.pageSize)
  }

  return (
    <div className="bg-gray-100">
      {/* Resources Section */}
      <div className="px-6 pb-6">
        <div className="bg-gray-100">
          {/* Section Header */}
          <div className="py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-500 bg-transparent"
                onClick={() => {
                  if (patientId) {
                    router.push(`/patient-info/${patientId}/resources/select`)
                  }
                }}>
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>

          {/* Resources Table */}
          <div className="py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned & Saved Resources
            </h3>

            <ResourcesTable
              data={results}
              columns={columns}
              pagination={{ pageIndex: 0, pageSize: pagination.pageSize }}
              error={null}
              isLoading={false}
              setPagination={setPagination}
            />
          </div>
        </div>
      </div>

      {/* Resource Details Sidebar */}
      <ResourceDetailsSidebar
        resource={selectedResource}
        isOpen={isViewOpen}
        onClose={handleCloseView}
      />
    </div>
  )
}
