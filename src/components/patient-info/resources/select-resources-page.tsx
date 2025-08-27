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
        id: "res-1",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "Understanding Blood Pressure & Hypertension",
        assignedOrSaved: "Saved",
        url: "https://example.com/understanding-blood-pressure"
    },
    {
        id: "res-2",
        type: "Video",
        category: "Physical Activity",
        source: "HealthHub",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned",
        url: "https://example.com/physical-activity-active-aging"
    },
    {
        id: "res-3",
        type: "Article",
        category: "Lifestyle Modifications",
        source: "Own Source",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Saved",
        url: "https://example.com/stress-management"
    },
    {
        id: "res-4",
        type: "Video",
        category: "Physical Activity",
        source: "Health Promotion Board",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned",
        url: "https://example.com/physical-activity-active-aging"
    },
    {
        id: "res-5",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "How Does High Blood Pressure Affect Men and Women Differently?",
        assignedOrSaved: "Saved",
        url: "https://example.com/blood-pressure"
    },
    {
        id: "res-6",
        type: "Video",
        category: "Physical Activity",
        source: "HealthHub",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned",
        url: "https://example.com/physical-activity-active-aging"
    },
    {
        id: "res-7",
        type: "Article",
        category: "Hypertension & HHD",
        source: "Own Source",
        title: "Hypertension & Health Behaviours",
        assignedOrSaved: "Saved",
        url: "https://example.com/hypertension-health-behaviours"
    },
    {
        id: "res-8",
        type: "Video",
        category: "Lifestyle Modifications",
        source: "Health Promotion Board",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Assigned",
        url: "https://example.com/stress-management"
    },
    {
        id: "res-9",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "Hypertension & Health Behaviours",
        assignedOrSaved: "Saved",
        url: "https://example.com/hypertension-health-behaviours"
    },
    {
        id: "res-10",
        type: "Video",
        category: "Lifestyle Modifications",
        source: "HealthHub",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Assigned",
        url: "https://example.com/stress-management"
    }
]

interface SelectResourcesPageProps {
    patientId?: string
}

export const SelectResourcesPage = ({ patientId }: SelectResourcesPageProps) => {
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
        const selectedIds = searchParams.get('selected')?.split(',').filter(Boolean) || []
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
        const selectedIds = Array.from(selectedResources).join(',')
        // Navigate to confirm page with selected resource IDs
        if (patientId) {
            router.push(`/patient-info/${patientId}/resources/confirm?selected=${selectedIds}`)
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
