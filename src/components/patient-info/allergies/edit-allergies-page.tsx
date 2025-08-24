"use client"
import { useMemo, useState } from "react"
import { Sidebar } from "../../common/sidebar"
import { Footer } from "../../common/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { MultiSelect } from "./allergies-multiselect"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"
import { AllergyItem, Reaction } from "@/types/reaction"

export const EditAllergiesPage = () => {
  const [items, setItems] = useState<AllergyItem[]>([
    { id: "a1", title: "Amoxicillin", reactions: ["Skin Rash", "Fever"] },
    {
      id: "a2",
      title: "Repaglinide",
      reactions: ["Dizziness", "Others"],
      other: ""
    },
    { id: "a3", title: "Acarbose", reactions: ["Fever"] }
  ])
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const confirmDelete = () => {
    if (confirmId) removeItem(confirmId)
    setConfirmId(null)
  }

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), title: "", reactions: [] }
    ])

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const updateTitle = (id: string, title: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, title } : i)))

  const updateReactions = (id: string, reactions: Reaction[]) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              reactions,
              other: reactions.includes("Others") ? (i.other ?? "") : undefined
            }
          : i
      )
    )

  const updateOther = (id: string, other: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, other } : i)))

  const payload = useMemo(() => items.map(({ id, ...rest }) => rest), [items])

  const onSave = () => {
    // TODO: integrate API call
    console.log("Allergies payload:", payload)
  }

  const onBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = "/patients" // fallback route
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            <nav className="text-sm text-gray-500">
              Home / Select Patient / Edit Allergies
            </nav>
          </div>

          {/* Page Title Row */}
          <div className="px-6 pb-4 flex items-center justify-between">
            <div className="flex col gap-5">
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Allergies
              </h1>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="gap-2">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>

          {/* Form */}
          <div className="px-6 pt-4 pb-6 bg-white">
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Allergies List
                </h2>
              </div>

              {/* Repeatable blocks */}
              {items.map((row, idx) => (
                <div key={row.id} className="relative">
                  {/* Divider between rows (not before the first) */}
                  {idx !== 0 && (
                    <div className="my-8 border-t border-gray-200" />
                  )}

                  {/* Title */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-2">
                    <div className="md:col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">
                        Title
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Provide a descriptive title for the allergy.
                      </p>
                    </div>

                    {/* input + delete aligned */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Allergy title"
                          value={row.title}
                          onChange={(e) => updateTitle(row.id, e.target.value)}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => setConfirmId(row.id)}
                          aria-label="Delete allergy"
                          className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-rose-300 text-rose-600 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
                    <div className="md:col-span-1">
                      <Label className="text-sm font-semibold text-gray-700">
                        Allergies
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        List any known allergies.
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <MultiSelect
                        value={row.reactions}
                        onChange={(next) => updateReactions(row.id, next)}
                        placeholder="Select reactions"
                      />
                    </div>
                  </div>

                  {/* Other Allergy (only when 'Others' is picked) */}
                  {row.reactions.includes("Others") && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
                      <div className="md:col-span-1">
                        <Label className="text-sm font-semibold text-gray-700">
                          Other Allergy
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Please specify the allergy that is not listed.
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          placeholder="Please Specify"
                          value={row.other ?? ""}
                          onChange={(e) => updateOther(row.id, e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Save */}
              <div className="bg-gray-100 rounded-lg p-6 mt-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Submit?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Review the details and make sure everything is accurate. Click
                  Submit to save changes.
                </p>
                <div className="flex justify-end">
                  <Button
                    onClick={onSave}
                    className="bg-black text-white hover:bg-gray-800">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <AlertDialog
          open={!!confirmId}
          onOpenChange={(open) => !open && setConfirmId(null)}>
          <AlertDialogContent className="sm:max-w-lg">
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              </div>
              <AlertDialogDescription>
                Are you sure you want to delete this item?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-black text-white hover:bg-gray-800">
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Footer />
      </div>
    </div>
  )
}
