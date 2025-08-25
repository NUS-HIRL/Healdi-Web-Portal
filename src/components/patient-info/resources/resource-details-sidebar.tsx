"use client"

import { Resource } from "@/types/resource"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import image_placeholder from "@/../public/common/image_placeholder.png"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface ResourceDetailsSidebarProps {
  resource: Resource | null
  isOpen: boolean
  onClose: () => void
}

export const ResourceDetailsSidebar = ({
  resource,
  isOpen,
  onClose
}: ResourceDetailsSidebarProps) => {
  const handleDelete = () => {
    // TODO: Implement delete functionality when API is available
  }

  const handleOpenUrl = () => {
    if (resource && resource.url) {
      window.open(resource.url, "_blank")
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center justify-between text-lg font-semibold">
            <span>View</span>
          </SheetTitle>
        </SheetHeader>

        {resource && (
          <div className="space-y-4 ml-4 mr-4">
            <Separator className="mt-0" />

            {/* Type */}
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-500 border-blue-200">
                {resource.type}
              </Badge>
              <p className="text-sm text-gray-900">{resource.source}</p>
              <h3 className="text-m font-bold text-gray-700">{resource.title}</h3>
            </div>

            {/* Preview Image */}
            <div className="space-y-2">
              <Image
                src={resource.imageUrl || image_placeholder}
                alt="Resource preview"
                width={800}
                height={320}
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>

            <Separator className="mt-2" />

            {/* Category and Sub Category Side-by-Side */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Category</h3>
                <p className="text-sm text-gray-900">
                  {resource.category || "-"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Sub Category</h3>
                <p className="text-sm text-gray-900">
                  {resource.subCategory || "-"}
                </p>
              </div>
            </div>

            <Separator className="mt-2" />

            {/* Assigned / Saved */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Assigned / Saved
              </h3>
              <p className="text-sm text-gray-900 font-medium">
                {resource.assignedOrSaved}
              </p>
            </div>

            <Separator className="mt-2" />

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-black text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800"
                onClick={handleOpenUrl}
                disabled={!resource.url}>
                Open URL
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
