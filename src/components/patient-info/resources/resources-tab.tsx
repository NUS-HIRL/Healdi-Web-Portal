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

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const [sorting, setSorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: null,
    direction: null
  })

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
        subCategory: "Hypertension"
      },
      {
        id: "3",
        type: "Document",
        source: "PatientCare",
        title: "Exercise Guidelines for Heart Health",
        assignedOrSaved: "Assigned",
        category: "Physical Activity",
        subCategory: "Cardio Exercise"
      },
      {
        id: "4",
        type: "Article",
        source: "HealthXChange",
        title: "Nutrition Tips for Better Health",
        assignedOrSaved: "Saved",
        category: "Nutrition",
        subCategory: "Healthy Eating"
      },
      {
        id: "5",
        type: "Video",
        source: "MedEd",
        title: "Stress Management Techniques",
        assignedOrSaved: "Assigned",
        category: "Mental Health",
        subCategory: "Stress Relief"
      }
    ],
    []
  )

  // Apply sorting to resources
  const sortedResources = useMemo(() => {
    const sorted = [...mockResources]

    if (sorting.column && sorting.direction) {
      sorted.sort((a, b) => {
        let aValue: string | number = a[sorting.column as keyof Resource] as
          | string
          | number
        let bValue: string | number = b[sorting.column as keyof Resource] as
          | string
          | number

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (sorting.direction === "asc") {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }
    return sorted
  }, [mockResources, sorting])

  const handleSortingChange = (column: string) => {
    setSorting((prev) => {
      if (prev.column === column) {
        // Toggle direction if same column
        if (prev.direction === "asc") return { column, direction: "desc" }
        if (prev.direction === "desc") return { column, direction: null }
        return { column, direction: "asc" }
      } else {
        // New column, start with ascending
        return { column, direction: "asc" }
      }
    })

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0
    }))
  }

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource)
    setIsViewOpen(true)
  }

  const columns = ResourceColumns({
    onSortingChange: handleSortingChange,
    onViewResource: handleViewResource,
    sorting: sorting
  })

  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedResource(null)
  }

  const ResourcesTable = CustomDataTable<Resource>

  // Mock paginated results
  const results = {
    data: sortedResources,
    totalCount: sortedResources.length,
    page: 1,
    totalPages: Math.ceil(sortedResources.length / pagination.pageSize)
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
