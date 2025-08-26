"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Bell, User, Check, Trash2, ExternalLink, Plus } from "lucide-react"
import { Resource } from "@/types/resource"
import { Footer } from "../../common/footer"
import { Sidebar } from "../../common/sidebar"
import { SubmitSection } from "../../common/submit-section"

const AVAILABLE_RESOURCES: Resource[] = [
    {
        id: "res-1",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "Understanding Blood Pressure & Hypertension",
        assignedOrSaved: "Saved"
    },
    {
        id: "res-2",
        type: "Video",
        category: "Physical Activity",
        source: "HealthHub",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned"
    },
    {
        id: "res-3",
        type: "Article",
        category: "Lifestyle Modifications",
        source: "Own Source",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Saved"
    },
    {
        id: "res-4",
        type: "Video",
        category: "Physical Activity",
        source: "Health Promotion Board",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned"
    },
    {
        id: "res-5",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "How Does High Blood Pressure Affect Men and Women Differently?",
        assignedOrSaved: "Saved"
    },
    {
        id: "res-6",
        type: "Video",
        category: "Physical Activity",
        source: "HealthHub",
        title: "Physical Activity is Key to Active Aging",
        assignedOrSaved: "Assigned"
    },
    {
        id: "res-7",
        type: "Article",
        category: "Hypertension & HHD",
        source: "Own Source",
        title: "Hypertension & Health Behaviours",
        assignedOrSaved: "Saved"
    },
    {
        id: "res-8",
        type: "Video",
        category: "Lifestyle Modifications",
        source: "Health Promotion Board",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Assigned"
    },
    {
        id: "res-9",
        type: "Article",
        category: "Hypertension & HHD",
        source: "National Heart Centre Singapore",
        title: "Hypertension & Health Behaviours",
        assignedOrSaved: "Saved"
    },
    {
        id: "res-10",
        type: "Video",
        category: "Lifestyle Modifications",
        source: "HealthHub",
        title: "Your Guide to Stress Management",
        assignedOrSaved: "Assigned"
    }
]

interface ConfirmResourceSelectionPageProps {
    patientId?: string
}

export const ConfirmResourceSelectionPage = ({ patientId }: ConfirmResourceSelectionPageProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedResources, setSelectedResources] = useState<Resource[]>([])

    useEffect(() => {
        const selectedIds = searchParams.get('selected')?.split(',') || []
        const selected = AVAILABLE_RESOURCES.filter(resource =>
            selectedIds.includes(resource.id)
        )
        setSelectedResources(selected)
    }, [searchParams])

    const handleAssignResources = () => {
        console.log("Assigning resources:", selectedResources.map(r => r.id))

        if (patientId) {
            router.push(`/patient-info/${patientId}`)
        } else {
            router.back()
        }
    }

    const handleRemoveResource = (resourceId: string) => {
        setSelectedResources(prev => prev.filter(resource => resource.id !== resourceId))
    }

    const handleSelectResources = () => {
        const currentSelectedIds = selectedResources.map(resource => resource.id).join(',')
        
        if (patientId) {
            router.push(`/patient-info/${patientId}/resources/select?selected=${currentSelectedIds}`)
        } else {
            router.push(`/resources/select?selected=${currentSelectedIds}`)
        }
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
                            Home / Select Patient / View Patient / Select Resources / Assign Resources
                        </nav>
                    </div>

                    <div className="px-6 pb-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Assign Resources
                        </h1>
                    </div>

                    <div className="px-6 pt-4 pb-6 bg-white">
                        <div className="w-full">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-black-600 text-xl font-semibold">
                                    Selected Resources
                                </h2>

                                <Button
                                    onClick={handleSelectResources}
                                    size="sm"
                                    className="border border-blue-300 bg-white hover:bg-blue-200 text-blue-600 flex items-center gap-2">
                                    <Plus size={16} />
                                    Select Resources
                                </Button>
                            </div>

                            <div className="mb-8">
                                {selectedResources.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No resources selected. Please go back and select resources to assign.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200">
                                        {selectedResources.map((resource) => (
                                            <div key={resource.id} className="py-4">
                                                <div className="flex items-start">
                                                    <div className="flex gap-4 flex-1">
                                                        <div className="w-64 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <div className="text-blue-600 font-semibold text-xs">
                                                                {resource.type === 'Article' ? '📄' : '📹'}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-xs text-gray-600">{resource.source}</p>
                                                            <h3 className="text-base font-semibold text-gray-900">
                                                                {resource.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 flex-1 justify-center">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800 border border-blue-200">
                                                            {resource.type}
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-orange-100 text-orange-800 border border-orange-200">
                                                            {resource.category}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(resource.url || '#', '_blank')}
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                                                            <ExternalLink size={14} />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleRemoveResource(resource.id)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <SubmitSection
                                description="Review the selected resources and make sure everything is accurate. Once you are ready, click the Assign Resources button to add the new resources to the patient."
                                buttonText="Assign Resources"
                                onSubmit={handleAssignResources}
                                disabled={selectedResources.length === 0}
                                isForm={false}
                            />
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    )
}
