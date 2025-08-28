"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { Button } from "@/components/ui/button"
import { Resource } from "@/types/resource"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { ResourceColumns } from "../../columns/resource-columns"
import { ResourceDetailsSidebar } from "./resource-details-sidebar"

export const ResourcesTab = () => {
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
        id: "bd226a7143f21901baa9a9e416f4e6f426af3441",
        type: "Article",
        source: "National Heart Centre Singapore",
        title: "Hypertension",
        assignedOrSaved: "Saved",
        category: "Cardiovascular Health",
        subCategory: "Hypertension",
        url: "https://www.nhcs.com.sg/patient-care/conditions-treatments/hypertension"
      },
      {
        id: "6c6a909b8f5d1f3364ff330cea70fa640da31d47",
        type: "Article",
        source: "National Heart Centre Singapore",
        title: "Understanding Blood Pressure & Hypertension",
        assignedOrSaved: "Assigned",
        category: "Cardiovascular Health",
        subCategory: "Hypertension",
        url: "https://www.nhcs.com.sg/news/murmurs/understanding-blood-pressure-and-hypertension"
      },
      {
        id: "011bcf8d6af48e9497baec7ba6d12e8856163081",
        type: "Video",
        source: "MOH Singapore",
        title: "Know About Medication Label",
        assignedOrSaved: "Assigned",
        category: "Medication",
        subCategory: "Adherence",
        url: "https://www.youtube.com/watch?v=X3k2zj9AzUU"
      },
      {
        id: "6c6811ef041d33aefbd6a79b7d077c3398d89085",
        type: "Video",
        source: "MOH Singapore",
        title: "Know How to Remember to Take Your Meds",
        assignedOrSaved: "Saved",
        category: "Medication",
        subCategory: "Adherence",
        url: "https://www.youtube.com/watch?v=io1442LpcM8"
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
                  // TODO: Implement add resource functionality
                  console.log("Add resource clicked")
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
