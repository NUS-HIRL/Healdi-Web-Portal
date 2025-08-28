"use client"

import { Footer } from "@/components/common/footer"
import { Sidebar } from "@/components/common/sidebar"
import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

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
