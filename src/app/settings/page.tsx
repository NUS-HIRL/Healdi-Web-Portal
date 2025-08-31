"use client"

import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { Sidebar } from "@/components/common/sidebar"
import { SettingsContent } from "@/components/settings/settings-content"

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MainHeader />
        <div className="flex-1 overflow-auto">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-6">
              <nav className="text-sm text-gray-500 mb-4">Home / Settings</nav>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
              <SettingsContent />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
