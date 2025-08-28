"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { Button } from "@/components/ui/button"
import { Resource } from "@/types/resource"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ResourceColumns } from "../../columns/resource-columns"
import { ResourceDetailsSidebar } from "./resource-details-sidebar"
import usePagination from "@/hooks/use-pagination"
import { PaginatedResponse } from "@/types/response"

interface ResourcesTabProps {
  patientId?: string
}

export const ResourcesTab = ({ patientId }: ResourcesTabProps) => {
  const router = useRouter()
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10
  })

  // TODO: Copy goals-tab way of calling the API once ready
  const { setCurrentPaginationTokenAndPageIndex, paginationToken } =
    usePagination(pagination, setPagination)

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  )
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Mock data for resources - TODO: Replace with API data when available
  const mockResources: Resource[] = useMemo(
    () => [
      {
        id: "bd226a7143f21901baa9a9e416f4e6f426af3441",
        type: "Article",
        source: "National Heart Centre Singapore",
        title: "Hypertension",
        assignedOrSaved: "Assigned",
        category: "High Blood Pressure & Heart Disease",
        subCategory: "Hypertension Management",
        url: "https://www.nhcs.com.sg/patient-care/conditions-treatments/hypertension",
        imageUrl:
          "https://ch-api.healthhub.sg/api/public/content/babc7f0c61234a10b91237a2c2377e55?v=9267a3d7&t=livehealthyheaderimage"
      },
      {
        id: "7f1e741f0739e0563b77466b9fa6f2791407fc9f",
        type: "Article",
        source: "HealthHub",
        title: "Health Benefits of Exercise and Exercise",
        assignedOrSaved: "Saved",
        category: "Exercise",
        subCategory: "Physical Activity Benefits",
        url: "https://www.healthhub.sg/live-healthy/physical-activity-benefits",
        imageUrl:
          "https://ch-api.healthhub.sg/api/public/content/5dcef3a720b74f8c966c1da19eecef83?v=731fd106&t=livehealthyheaderimage"
      },
      {
        id: "3873dedcfd1aa953c0c4cd3e43fa82654a0d8548",
        type: "Article",
        source: "HealthHub",
        title: "High Blood Pressure: Healthy Eating Guide",
        assignedOrSaved: "Assigned",
        category: "Healthy Lifestyle",
        subCategory: "Nutrition Guide",
        url: "https://www.healthhub.sg/a-z/diseases-and-conditions/high-blood-pressure-healthy-eating-guide",
        imageUrl:
          "https://ch-api.healthhub.sg/api/public/content/93bd7d00dbb94235aa8ce372f3afea2f?v=a53fbe4d&t=azheaderimage"
      },
      {
        id: "38c415d6f35873f969ed085bacdbf996da3410b3",
        type: "Article",
        source: "HealthHub",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Saved",
        category: "Healthy Lifestyle",
        subCategory: "Stress Management",
        url: "https://www.healthhub.sg/live-healthy/beatstressguide",
        imageUrl:
          "https://ch-api.healthhub.sg/api/public/content/babc7f0c61234a10b91237a2c2377e55?v=9267a3d7&t=livehealthyheaderimage"
      },
      {
        id: "011bcf8d6af48e9497baec7ba6d12e8856163081",
        type: "Video",
        source: "MOH Singapore",
        title: "Know About Medication Label",
        assignedOrSaved: "Assigned",
        category: "Management & Treatment",
        subCategory: "Medication",
        url: "https://www.youtube.com/watch?v=X3k2zj9AzUU",
        imageUrl: "https://i3.ytimg.com/vi/X3k2zj9AzUU/hqdefault.jpg"
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
  const results: PaginatedResponse<Resource> = {
    data: mockResources,
    count: mockResources.length,
    pagination: {
      next_page_key: null,
      previous_page_key: null
    }
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
              paginationToken={paginationToken}
              setCurrentPaginationTokenAndPageIndex={
                setCurrentPaginationTokenAndPageIndex
              }
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
