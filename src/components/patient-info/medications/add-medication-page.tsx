"use client"

import { MedicationList } from "./medications-list"
import { MainHeader } from "../../common/main-header"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

export const AddMedicationPage = () => {
  const router = useRouter()
  const onBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/patients/medication")
    }
  }

  return (
    <Suspense>
      <div className="flex h-screen bg-gray-50">
        {/* <Sidebar /> */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <MainHeader />
          {/* TODO: Ze Kai: Replace hardcoded breadcrumbs */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <nav className="text-sm text-gray-500 mb-4">
                Home / Select Patient / View Patient / Select Medication
              </nav>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Go back"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 mr-3">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                Select Medication
              </h1>
              <MedicationList />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </Suspense>
  )
}
