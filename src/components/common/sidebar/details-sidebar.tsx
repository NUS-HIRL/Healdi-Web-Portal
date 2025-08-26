"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import React from "react"

interface DetailsSidebarProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const DetailsSidebar = ({
  children,
  isOpen,
  onClose
}: DetailsSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center justify-between text-lg font-semibold">
            <span>View</span>
          </SheetTitle>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  )
}
