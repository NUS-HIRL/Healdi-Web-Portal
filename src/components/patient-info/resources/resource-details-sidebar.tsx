"use client"

import { Resource } from "@/types/resource"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ImagePlaceholder from "@/../public/common/image-placeholder.png"
import Image from "next/image"
import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
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
    <DetailsSidebar isOpen={isOpen} onClose={onClose}>
      {resource && (
        <div className="space-y-4 ml-4 mr-4">
          <Separator className="mt-0" />

          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-500 border-blue-200">
              {resource.type}
            </Badge>
            <p className="text-sm text-gray-900">{resource.source}</p>
            <h3 className="text-m font-bold text-gray-700">{resource.title}</h3>
          </div>

          <div className="space-y-2">
            <Image
              src={resource.imageUrl || ImagePlaceholder}
              alt="Resource preview"
              width={800}
              height={320}
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>

          <Separator className="mt-2" />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Category</h3>
              <p className="text-sm text-gray-900">
                {resource.category || "-"}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Sub Category
              </h3>
              <p className="text-sm text-gray-900">
                {resource.subCategory || "-"}
              </p>
            </div>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Assigned / Saved
            </h3>
            <p className="text-sm text-gray-900 font-medium">
              {resource.assignedOrSaved}
            </p>
          </div>

          <Separator className="mt-2" />

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
    </DetailsSidebar>
  )
}
