"use client"

import { Footer } from "@/components/common/footer"
import { Sidebar } from "@/components/common/sidebar"

const PatientInfoLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default PatientInfoLayout
