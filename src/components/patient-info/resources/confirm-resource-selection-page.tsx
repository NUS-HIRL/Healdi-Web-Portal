"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Bell, User, Trash2, ExternalLink, Plus } from "lucide-react"
import { Resource } from "@/types/resource"
import { Footer } from "../../common/footer"
import { Sidebar } from "../../common/sidebar"
import { SubmitSection } from "../../common/submit-section"
import Image from "next/image"
import ImagePlaceholder from "@/../public/common/image-placeholder.png"

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
    id: "88783dcedca05120e294a10e98bdc9ed12957d60",
    type: "Article",
    category: "High Blood Pressure & Heart Disease",
    source: "HealthHub",
    title: "How Does High Blood Pressure Affect Men and Women Differently?",
    assignedOrSaved: "Saved",
    url: "https://www.healthhub.sg/live-healthy/how-does-high-blood-pressure-affect-men-and-women-differently",
    imageUrl: "https://ch-api.healthhub.sg/api/public/content/6b8e6edf0e43452ab256a283ee1e0e0e?v=6b1f1e4d&t=livehealthyheaderimage"
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

interface ConfirmResourceSelectionPageProps {
  patientId?: string
}

export const ConfirmResourceSelectionPage = ({
  patientId
}: ConfirmResourceSelectionPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedResources, setSelectedResources] = useState<Resource[]>([])

  useEffect(() => {
    const selectedIds = searchParams.get("selected")?.split(",") || []
    const selected = AVAILABLE_RESOURCES.filter((resource) =>
      selectedIds.includes(resource.id)
    )
    setSelectedResources(selected)
  }, [searchParams])

  const handleAssignResources = () => {
    console.log(
      "Assigning resources:",
      selectedResources.map((r) => r.id)
    )

    if (patientId) {
      router.push(`/patient-info/${patientId}`)
    } else {
      router.back()
    }
  }

  const handleRemoveResource = (resourceId: string) => {
    setSelectedResources((prev) =>
      prev.filter((resource) => resource.id !== resourceId)
    )
  }

  const handleSelectResources = () => {
    const currentSelectedIds = selectedResources
      .map((resource) => resource.id)
      .join(",")

    if (patientId) {
      router.push(
        `/patient-info/${patientId}/resources/select?selected=${currentSelectedIds}`
      )
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
            {/* TODO: Gerald: Update breadcrumb navigation */}
            <nav className="text-sm text-gray-500">
              Home / Select Patient / View Patient / Select Resources / Assign
              Resources
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
                    <p>
                      No resources selected. Please go back and select resources
                      to assign.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {selectedResources.map((resource) => (
                      <div key={resource.id} className="py-4">
                        <div className="flex items-start">
                          <div className="flex gap-4 flex-1">
                            <div className="w-64 h-32 rounded-lg overflow-hidden border">
                              <Image
                                src={resource.imageUrl || ImagePlaceholder}
                                alt={resource.title}
                                width={256}
                                height={128}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-gray-600">
                                {resource.source}
                              </p>
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
                              onClick={() =>
                                window.open(resource.url || "#", "_blank")
                              }
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
