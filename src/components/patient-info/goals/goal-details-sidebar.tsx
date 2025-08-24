"use client"

import { Goal } from "@/types/goal"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface GoalDetailsSidebarProps {
  goal: Goal | null
  isOpen: boolean
  onClose: () => void
}

export const GoalDetailsSidebar = ({
  goal,
  isOpen,
  onClose
}: GoalDetailsSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center justify-between text-lg font-semibold">
            <span>View</span>
          </SheetTitle>
        </SheetHeader>

        {goal && (
          <div className="space-y-4 ml-4 mr-4">
            <Separator className="mt-0" />

            {/* Category */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Category</h3>
              <Badge
                variant="secondary"
                className="bg-orange-50 text-red-400 border-orange-200">
                {goal.category}
              </Badge>
            </div>

            <Separator className="mt-2" />

            {/* Completion Type */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Completion Type
              </h3>
              <p className="text-sm text-gray-900">{goal.completionType}</p>
            </div>

            <Separator className="mt-2" />

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Title</h3>
              <p className="text-sm text-gray-900 leading-relaxed">
                {goal.title}
              </p>
            </div>

            <Separator className="mt-2" />

            {/* How It Works */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                How It Works
              </h3>
              <p className="text-sm text-gray-900 leading-relaxed">
                {goal.description}
              </p>
            </div>

            <Separator className="mt-2" />

            {/* Coin Reward */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Coin Reward
              </h3>
              <p className="text-sm text-gray-900 font-medium">{goal.coins}</p>
            </div>

            <Separator className="mt-2" />

            {/* Coin Bonus */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Coin Bonus on Goal Completion
              </h3>
              <p className="text-sm text-gray-900 font-medium">{goal.bonus}</p>
            </div>

            <Separator className="mt-2" />

            {/* Progress */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Progress</h3>
              <p className="text-sm text-gray-900 font-medium">
                {goal.progress}
              </p>
            </div>

            <Separator className="mt-2" />

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 bg-black text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800"
                onClick={() => {
                  // Navigate to edit page
                  window.location.href = `/patient-info/goals/${goal.id}/edit`
                }}>
                Edit
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
