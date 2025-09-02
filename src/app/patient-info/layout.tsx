"use client"

import { Footer } from "@/components/common/footer"
import { Sidebar } from "@/components/common/sidebar"
import { Suspense } from "react"

const PatientInfoLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <Suspense>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {children}
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default PatientInfoLayout
