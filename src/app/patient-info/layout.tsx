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
      <div className="flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default PatientInfoLayout
