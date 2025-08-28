"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "../../common/sidebar"
import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { SubmitSection } from "../../common/submit-section"
import Image from "next/image"

interface AddExerciseFormProps {
  patientId: string
}

export const AddExerciseForm = ({ patientId }: AddExerciseFormProps) => {
  const router = useRouter()

  const handleSubmit = () => {
    console.log("Adding new exercise...")

    router.push(`/patient-info/${patientId}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MainHeader />

        <main className="flex-1 overflow-auto flex flex-col">
          <div className="p-6">
            <nav className="text-sm text-gray-500 mb-4">
              Home / Select Patient /{" "}
              <span className="text-gray-900">View Patient</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">
              Exercise Recommendations
            </h1>
          </div>
          <div className="bg-white flex-1">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                Add Exercise Recommendation
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-8 items-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center p-1">
                    <Image
                      src="/common/ai-vector.png"
                      alt="AI"
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-md font-bold text-black-700">
                    AI Recommended Summary
                  </h3>
                </div>

                <div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Recommended for you
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      Yoga • 1 hour • Once a week
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                        <div className="w-3 h-3 bg-orange-300 rounded-sm"></div>
                        <div className="w-3 h-3 bg-orange-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        Moderate Intensity
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm text-gray-700">
                      Do you like this recommendation?
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Image
                          src="/common/thumbsup-icon.png"
                          alt="Thumbs up"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Image
                          src="/common/thumbsdown-icon.png"
                          alt="Thumbs down"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form>
                <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-md font-bold text-black-700">
                      Activity Type
                    </label>
                    <label className="text-xs text-black-700">
                      Fill in the activity type
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Brisk Walking"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-md font-bold text-black-700">
                      Duration
                    </label>
                    <label className="text-xs text-black-700">
                      Select Duration
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Enter value"
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                    />
                    <select className="flex-1 border border-gray-300 rounded-lg p-2">
                      <option value="">Unit</option>
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-md font-bold text-black-700">
                      Frequency
                    </label>
                    <label className="text-xs text-black-700">
                      Select the frequency
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Enter value"
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                    />
                    <select className="flex-1 border border-gray-300 rounded-lg p-2">
                      <option value="">Unit</option>
                      <option value="per day">Per Day</option>
                      <option value="per week">Per Week</option>
                      <option value="per month">Per Month</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-md font-bold text-black-700">
                      Intensity
                    </label>
                    <label className="text-xs text-black-700">
                      Select intensity level
                    </label>
                  </div>
                  <select className="w-full border border-gray-300 rounded-lg p-2">
                    <option value="">Select intensity</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-md font-bold text-black-700">
                      Assigned/Saved
                    </label>
                    <label className="text-xs text-black-700">
                      Select Assigned/Saved
                    </label>
                  </div>
                  <select className="w-full border border-gray-300 rounded-lg p-2">
                    <option value="">Select status</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Saved">Saved</option>
                  </select>
                </div>
                <SubmitSection
                  description="Review your filled form details and make sure everything is accurate. Once you're ready, click the 'Submit' button to add the new exercise recommendation."
                  onSubmit={handleSubmit}
                  isForm={false}
                />
              </form>
            </div>
          </div>
          {/* TODO: Kervyn: Create layout.tsx to prevent need for footer in every page */}
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  )
}
