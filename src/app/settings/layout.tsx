"use client"

import { Footer } from "@/components/common/footer"
import { MainHeader } from "@/components/common/main-header"
import { Sidebar } from "@/components/common/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Suspense } from "react"

const SettingsLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <Suspense>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <MainHeader />
          <div className="flex-1 overflow-auto">
            <div className="min-h-full flex flex-col">
              <div className="flex-1 p-6">
                <Breadcrumb className="mb-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/home">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Settings
                </h1>
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default SettingsLayout
