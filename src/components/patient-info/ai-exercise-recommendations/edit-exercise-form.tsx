"use client"

import { Sidebar } from "../../common/sidebar"
import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { SubmitSection } from "../../common/submit-section"
import { DurationUnit, FrequencyUnit, IntensityLevel, AssignmentStatus } from "@/types/exercise"
import Image from "next/image"

interface EditExerciseFormProps {
  exerciseId: string
}

// TODO: Gerald: Add exerciseId usage once fully fleshing out the form, remove below eslint-disable

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditExerciseForm = ({ exerciseId }: EditExerciseFormProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <MainHeader />

        <main className="flex-1 overflow-auto flex flex-col">
          <div className="p-6">
            {/* TODO: Gerald: Update breadcrumb navigation */}
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
                Edit Exercise Recommendation
              </h2>

              {/* AI Recommended Summary Section */}
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

              {/* Form for editing exercise recommendation */}
              <form>
                {/* Form fields go here */}
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
                      <option value="" disabled>
                        Unit
                      </option>
                      {Object.entries(DurationUnit).map(([, value]) => (
                        <option key={value} value={value}>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </option>
                      ))}
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
                      <option value="" disabled>
                        Unit
                      </option>
                      {Object.entries(FrequencyUnit).map(([, value]) => (
                        <option key={value} value={value}>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </option>
                      ))}
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
                    <option value="" disabled>
                      Select intensity
                    </option>
                    {Object.entries(IntensityLevel).map(([, value]) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
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
                    <option value="" disabled>
                      Select status
                    </option>
                    {Object.entries(AssignmentStatus).map(([, value]) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <SubmitSection description="Review your filled form details and make sure everything is accurate. Once you're ready, click the 'Submit' button to add the new exercise recommendation." />
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
