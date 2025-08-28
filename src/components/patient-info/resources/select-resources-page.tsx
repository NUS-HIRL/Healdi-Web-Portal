"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Bell, User, Check } from "lucide-react"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { Resource } from "@/types/resource"
import { SelectResourceColumns } from "../../columns/select-resource-columns"
import { Footer } from "../../common/footer"
import { Sidebar } from "../../common/sidebar"

const AVAILABLE_RESOURCES: Resource[] = [
  {
    id: "bd226a7143f21901baa9a9e416f4e6f426af3441",
    type: "Article",
    category: "High Blood Pressure & Heart Disease",
    source: "National Heart Centre Singapore",
    title: "Hypertension",
    assignedOrSaved: "Saved",
    url: "https://www.nhcs.com.sg/patient-care/conditions-treatments/hypertension",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/babc7f0c61234a10b91237a2c2377e55?v=9267a3d7&t=livehealthyheaderimage"
  },
  {
    id: "6c6a909b8f5d1f3364ff330cea70fa640da31d47",
    type: "Article",
    category: "High Blood Pressure & Heart Disease",
    source: "National Heart Centre Singapore",
    title: "Understanding Blood Pressure & Hypertension",
    assignedOrSaved: "Assigned",
    url: "https://www.nhcs.com.sg/news/murmurs/understanding-blood-pressure-and-hypertension",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/93bd7d00dbb94235aa8ce372f3afea2f?v=a53fbe4d&t=azheaderimage"
  },
  {
    id: "7f1e741f0739e0563b77466b9fa6f2791407fc9f",
    type: "Article",
    category: "Exercise",
    source: "HealthHub",
    title: "Health Benefits of Exercise and Exercise",
    assignedOrSaved: "Assigned",
    url: "https://www.healthhub.sg/live-healthy/physical-activity-benefits",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/5dcef3a720b74f8c966c1da19eecef83?v=731fd106&t=livehealthyheaderimage"
  },
  {
    id: "45fec694bf5a1c5ee071ddb8e97f23d8e8e028c6",
    type: "Article",
    category: "Exercise",
    source: "HealthHub",
    title: "Exercise Is Key to Active Ageing",
    assignedOrSaved: "Saved",
    url: "https://www.healthhub.sg/live-healthy/physicalactivity_akeytohealthyageing_pdf",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/c45fde36812e4da8922cae348f1688a7?v=a96fcdca&t=livehealthyheaderimage"
  },
  {
    id: "35349984acdd6d7deb87669c519bdc2ce8ccc86c",
    type: "Article",
    category: "Exercise",
    source: "HealthHub",
    title: "Here's How To Exercise When You Have No Time",
    assignedOrSaved: "Assigned",
    url: "https://www.healthhub.sg/live-healthy/squeezing-in-time-to-get-fit",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/5dcef3a720b74f8c966c1da19eecef83?v=731fd106&t=livehealthyheaderimage"
  },
  {
    id: "3873dedcfd1aa953c0c4cd3e43fa82654a0d8548",
    type: "Article",
    category: "Healthy Lifestyle",
    source: "HealthHub",
    title: "High Blood Pressure: Healthy Eating Guide",
    assignedOrSaved: "Saved",
    url: "https://www.healthhub.sg/a-z/diseases-and-conditions/high-blood-pressure-healthy-eating-guide",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/93bd7d00dbb94235aa8ce372f3afea2f?v=a53fbe4d&t=azheaderimage"
  },
  {
    id: "38c415d6f35873f969ed085bacdbf996da3410b3",
    type: "Article",
    category: "Healthy Lifestyle",
    source: "HealthHub",
    title: "Your Guide to Stress Management",
    assignedOrSaved: "Assigned",
    url: "https://www.healthhub.sg/live-healthy/beatstressguide",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/babc7f0c61234a10b91237a2c2377e55?v=9267a3d7&t=livehealthyheaderimage"
  },
  {
    id: "b843d6b2e87d4524a40acc7d793a6d37a3606eef",
    type: "Article",
    category: "Healthy Lifestyle",
    source: "HealthHub",
    title: "The Importance of Sleep",
    assignedOrSaved: "Saved",
    url: "https://www.healthhub.sg/live-healthy/sleep",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/df3f71c2a39448ce802f55a4c271b8f8?v=4938464f&t=livehealthyheaderimage"
  },
  {
    id: "011bcf8d6af48e9497baec7ba6d12e8856163081",
    type: "Video",
    category: "Management & Treatment",
    source: "MOH Singapore",
    title: "Know About Medication Label",
    assignedOrSaved: "Assigned",
    url: "https://www.youtube.com/watch?v=X3k2zj9AzUU",
    imageUrl: "https://i3.ytimg.com/vi/X3k2zj9AzUU/hqdefault.jpg"
  }
]

interface SelectResourcesPageProps {
  patientId?: string
}

export const SelectResourcesPage = ({
  patientId
}: SelectResourcesPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedResources, setSelectedResources] = useState<Set<string>>(
    new Set()
  )
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  // Initialize selected resources from URL parameters
  useEffect(() => {
    const selectedIds =
      searchParams.get("selected")?.split(",").filter(Boolean) || []
    setSelectedResources(new Set(selectedIds))
  }, [searchParams])

  const handleSelectResource = (resourceId: string, checked: boolean) => {
    const newSelected = new Set(selectedResources)
    if (checked) {
      newSelected.add(resourceId)
    } else {
      newSelected.delete(resourceId)
    }
    setSelectedResources(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResources(new Set(AVAILABLE_RESOURCES.map((r) => r.id)))
    } else {
      setSelectedResources(new Set())
    }
  }

  const handleConfirmSelection = () => {
    const selectedIds = Array.from(selectedResources).join(",")
    // Navigate to confirm page with selected resource IDs
    if (patientId) {
      router.push(
        `/patient-info/${patientId}/resources/confirm?selected=${selectedIds}`
      )
    } else {
      router.push(`/patient-info/resources/confirm?selected=${selectedIds}`)
    }
  }

  const columns = SelectResourceColumns({
    selectedResources,
    onSelectResource: handleSelectResource,
    onSelectAll: handleSelectAll
  })

  const ResourcesTable = CustomDataTable<Resource>

  const results = {
    data: AVAILABLE_RESOURCES,
    totalCount: AVAILABLE_RESOURCES.length,
    page: Math.floor(pagination.pageIndex / pagination.pageSize) + 1,
    totalPages: Math.ceil(AVAILABLE_RESOURCES.length / pagination.pageSize)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search Patient UID"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  21
                </span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            {/* TODO: Gerald: Update breadcrumb navigation */}
            <nav className="text-sm text-gray-500">
              Home / Select Patient / View Patient / Select Resources
            </nav>
          </div>

          <div className="px-6 pb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Select Resources
              </h1>
            </div>
          </div>

          <div className="px-6 pt-4 pb-2 border-b border-gray-200 bg-white">
            <div className="w-full">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-black-600 text-xl font-semibold">
                    Assign From Selection
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Select one or more resources to assign to the patient.
                  </p>
                </div>

                <Button
                  onClick={handleConfirmSelection}
                  disabled={selectedResources.size === 0}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                  <Check size={16} />
                  Confirm Selection
                </Button>
              </div>

              <div className="mb-6">
                <div className="mb-4">
                  <span className="text-sm text-gray-600">
                    {selectedResources.size} selected
                  </span>
                </div>

                <ResourcesTable
                  data={results}
                  columns={columns}
                  pagination={{
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize
                  }}
                  error={null}
                  isLoading={false}
                  setPagination={setPagination}
                />
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
