"use client"

import { useState } from "react"
import Image from "next/image"

export const ProfileTab = () => {
  const [firstName, setFirstName] = useState("Dr. Andrew")

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Profile</h2>
        <p className="text-gray-600 mb-8">
          View and manage your personal profile information.
        </p>

        <div className="divide-y divide-gray-200 space-y-0">
          <div className="grid grid-cols-3 items-center py-6 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">First Name</h3>
                <p className="text-sm text-gray-500">Set a first name for your profile.</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-900 font-medium">{firstName}</span>
            </div>
            <div className="text-right">
              <button className="bg-white text-black border border-grey-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Edit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center py-6 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Avatar</h3>
                <p className="text-sm text-gray-500">Select an avatar to personalise your account.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border">
                <Image
                  src="/chat/placeholder-avatar.svg"
                  alt="Profile avatar"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="bg-white text-black border border-grey-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Change
              </button>
              <button className="bg-white text-black border border-grey-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
