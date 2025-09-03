"use client"

import { useState } from "react"
import { ProfileTab } from "./profile-tab"
import { SecurityTab } from "./security-tab"

export const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile")

  return (
    <div className="w-full">
      <div className="flex space-x-8 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 px-1 border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-blue-500 text-blue-600 font-medium"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-4 px-1 border-b-2 transition-colors ${
            activeTab === "security"
              ? "border-blue-500 text-blue-600 font-medium"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          Security
        </button>
      </div>

      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "security" && <SecurityTab />}
    </div>
  )
}
