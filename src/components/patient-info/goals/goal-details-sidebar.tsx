"use client"

import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
import { Subtitle } from "@/components/common/sidebar/subtitle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { apiAxios } from "@/lib/axios"
import {
  mapCategoryToDisplay,
  mapCompletionTypeToDisplay
} from "@/lib/goal-mappings"
import { Goal } from "@/types/goal"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface GoalDetailsSidebarProps {
  goal: Goal | null
  isOpen: boolean
  onClose: () => void
  onGoalDeleted?: () => void
}

export const GoalDetailsSidebar = ({
  goal,
  isOpen,
  onClose,
  onGoalDeleted
}: GoalDetailsSidebarProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!goal) return

    const confirmed = window.confirm(
      `Are you sure you want to delete the goal "${goal.title}"? This action cannot be undone.`
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await apiAxios.delete(`/v1/users/ethan/goals/${goal.goal_id}`)
      onClose() // Close the sidebar
      // Trigger data refetch instead of page reload
      onGoalDeleted?.()
    } catch (error) {
      console.error("Error deleting goal:", error)
      alert("Failed to delete goal. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DetailsSidebar isOpen={isOpen} onClose={onClose}>
      {goal && (
        <div className="space-y-4 ml-4 mr-4">
          <Separator className="mt-0" />

          {/* Category */}
          <div className="space-y-2">
            <Subtitle title="Category" />
            <Badge
              variant="secondary"
              className="bg-orange-50 text-red-400 border-orange-200">
              {mapCategoryToDisplay(goal.category)}
            </Badge>
          </div>

          <Separator className="mt-2" />

          {/* Completion Type */}
          <div className="space-y-2">
            <Subtitle title="Completion Type" />
            <p className="text-sm text-gray-900">
              {mapCompletionTypeToDisplay(goal.completion_type)}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* Title */}
          <div className="space-y-2">
            <Subtitle title="Title" />
            <p className="text-sm text-gray-900 leading-relaxed">
              {goal.title}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* How It Works */}
          <div className="space-y-2">
            <Subtitle title="How It Works" />
            <p className="text-sm text-gray-900 leading-relaxed">
              {goal.description}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* Coin Reward */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Coin Reward</h3>
            <p className="text-sm text-gray-900 font-medium">
              {goal.coin_reward}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* Coin Bonus */}
          <div className="space-y-2">
            <Subtitle title="Coin Bonus on Goal Completion" />
            <p className="text-sm text-gray-900 font-medium">
              {goal.completion_bonus_reward}
            </p>
          </div>

          <Separator className="mt-2" />

          {/* Progress */}
          <div className="space-y-2">
            <Subtitle title="Type" />{" "}
            {/* Change back to progress after API is done */}
            <p className="text-sm text-gray-900 font-medium">
              {mapCompletionTypeToDisplay(goal.completion_type)}
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
                router.push(`/patient-info/goals/${goal.goal_id}/edit`)
              }}>
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleDelete}
              disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      )}
    </DetailsSidebar>
  )
}
