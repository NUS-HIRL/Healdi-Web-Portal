"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { apiAxios } from "@/lib/axios"
import { mapCategoryToApi, mapCompletionTypeToApi } from "@/lib/goal-mappings"
import { Bell, Search, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SubmitSection } from "../../common/submit-section"

export const AddGoalPage = () => {
  type AddGoalForm = {
    category: string
    completionType: string
    title: string
    description: string
    coins: number
    bonus: number
    targetCompletionCount: number
    patientId: string
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")

  const { register, control, handleSubmit } = useForm<AddGoalForm>({
    defaultValues: {
      category: "",
      completionType: "",
      title: "",
      description: "",
      coins: 0,
      bonus: 0,
      targetCompletionCount: 0,
      patientId: patientId || ""
    }
  })

  const onSubmit = async (data: AddGoalForm) => {
    setIsSubmitting(true)
    try {
      const apiData = {
        title: data.title,
        description: data.description,
        category: mapCategoryToApi(data.category),
        completion_type: mapCompletionTypeToApi(data.completionType),
        target_completion_count: data.targetCompletionCount,
        coin_reward: data.coins,
        completion_bonus_reward: data.bonus
      }
      await apiAxios.post(`/v1/users/${patientId}/goals`, apiData)
      router.push(`/patient-info/${patientId}`)
    } catch (error) {
      console.error("Error creating goal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search Patient UID"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  21
                </span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            <nav className="text-sm text-gray-500">
              Home / Select Patient / View Patient
            </nav>
          </div>

          {/* Page Title */}
          <div className="px-6 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
          </div>

          {/* Add Goal Form */}
          <div className="px-6 pt-4 pb-6 bg-white">
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-blue-600 text-xl font-semibold">
                  New Goal
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Category
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Select the category type
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <Select
                          value={field.value || undefined}
                          onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sleep">Sleep</SelectItem>
                            <SelectItem value="Alcohol">Alcohol</SelectItem>
                            <SelectItem value="Stress">Stress</SelectItem>
                            <SelectItem value="Mindfulness">
                              Mindfulness
                            </SelectItem>
                            <SelectItem value="Medical Self Management">
                              Medical Self Management
                            </SelectItem>
                            <SelectItem value="Relationships">
                              Relationships
                            </SelectItem>
                            <SelectItem value="Work-Life Balance">
                              Work-Life Balance
                            </SelectItem>
                            <SelectItem value="Emotional Well-Being">
                              Emotional Well-Being
                            </SelectItem>
                            <SelectItem value="Exercise">Exercise</SelectItem>
                            <SelectItem value="Diet">Diet</SelectItem>
                            <SelectItem value="Smoking">Smoking</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Completion Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Completion Type
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Select Short Term, Long Term or One-Off
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Controller
                      control={control}
                      name="completionType"
                      render={({ field }) => (
                        <Select
                          value={field.value || undefined}
                          onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Completion Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Short Term">
                              Short Term
                            </SelectItem>
                            <SelectItem value="Long Term">Long Term</SelectItem>
                            <SelectItem value="One-Off">One-Off</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Title
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill in the goal title
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Goal Title"
                      className="w-full"
                      {...register("title")}
                    />
                  </div>
                </div>

                {/* How It Works */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      How It Works
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill in the description
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Description of the activity"
                      className="w-full min-h-[120px]"
                      {...register("description")}
                    />
                  </div>
                </div>

                {/* Target Completion Count */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Target Completion Count
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Set the number of times the user needs to complete the
                      goal
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="w-full"
                      {...register("targetCompletionCount", {
                        valueAsNumber: true
                      })}
                    />
                  </div>
                </div>

                {/* Coin Reward */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Coin Reward
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Awarded each time the user marks the activity as completed
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="w-full"
                      {...register("coins", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                {/* Coin Bonus */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-semibold text-gray-700">
                      Coin Bonus on Goal Completion
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Awarded when the user completes the entire goal duration.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="w-full"
                      {...register("bonus", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                <SubmitSection
                  description="Review your filled form details and make sure everything is accurate. Once you are ready, click the Submit button to add the new goal."
                  isLoading={isSubmitting}
                />
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
