"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Goal } from "@/types/goal"
import { Button } from "@/components/ui/button"
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
import { Footer } from "../../common/footer"
import { Sidebar } from "../../common/sidebar"
import { Search, Bell, User } from "lucide-react"

interface EditGoalPageProps {
  goalId: string
}

type EditGoalForm = {
  category: string
  completionType: string
  title: string
  description: string
  coins: number
  bonus: number
}

// Mock goal data - in a real app, this would be fetched from an API
const mockGoal: Goal = {
  id: "1",
  category: "Physical Activity",
  completionType: "Short Term",
  title: "I will jog for 15 minutes three times a week.",
  description:
    "Jog for at least 15 minutes three times a week to complete this goal. Whether you're at the park, on a running track, treadmill, or around your neighbourhood, it all counts. Come back to Healdi to mark it as complete. You can only complete this goal once per day.",
  coins: 50,
  bonus: 500,
  progress: "1/3"
}

export const EditGoalPage = ({ goalId }: EditGoalPageProps) => {
  const [goal, setGoal] = useState<Goal | null>(null)

  const { register, control, handleSubmit, reset } = useForm<EditGoalForm>({
    defaultValues: {
      category: "",
      completionType: "",
      title: "",
      description: "",
      coins: 0,
      bonus: 0
    }
  })

  useEffect(() => {
    // TODO: Change this section when API is ready
    setGoal(mockGoal)
  }, [goalId])

  useEffect(() => {
    if (goal) {
      reset({
        category: goal.category,
        completionType: goal.completionType,
        title: goal.title,
        description: goal.description,
        coins: goal.coins,
        bonus: goal.bonus
      })
    }
  }, [goal, reset])

  const onSubmit = (data: EditGoalForm) => {
    // Handle form submission - in a real app, this would update the goal
    console.log("Updated goal data:", data)
  }

  if (!goal) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

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

          {/* Edit Goal Form */}
          <div className="px-6 pt-4 pb-6 bg-white">
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-blue-600 text-xl font-semibold">
                  Edit Goal
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
                            <SelectItem value="Physical Activity">
                              Physical Activity
                            </SelectItem>
                            <SelectItem value="Nutrition">Nutrition</SelectItem>
                            <SelectItem value="Mental Health">
                              Mental Health
                            </SelectItem>
                            <SelectItem value="Sleep">Sleep</SelectItem>
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

                {/* Ready to Submit Section */}
                <div className="bg-gray-100 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Ready to Submit?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Review your filled form details and make sure everything is
                    accurate. Once you are ready, click the Submit button to
                    update the goal.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-black text-white hover:bg-gray-800">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  )
}
