"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

// Types
export type ReactionTone = "warning" | "info"
export type Allergy = {
  name: string
  reactions: { label: string; tone?: ReactionTone }[]
}

interface AllergiesDetailsSidebarProps {
  allergies?: Allergy[]
  isOpen: boolean
  onClose: () => void
  onEdit?: () => void
}

const badgeTone = (tone?: ReactionTone) =>
  tone === "info"
    ? "bg-blue-50 text-blue-600 border border-blue-200"
    : "bg-orange-50 text-orange-600 border border-orange-200"

const DEFAULT_ALLERGIES: Allergy[] = [
  {
    name: "Amoxicillin",
    reactions: [
      { label: "Skin Rash", tone: "warning" },
      { label: "Fever", tone: "warning" }
    ]
  },
  {
    name: "Repaglinide",
    reactions: [
      { label: "Dizziness", tone: "warning" },
      { label: "Nausea", tone: "info" }
    ]
  },
  { name: "Acarbose", reactions: [{ label: "Fever", tone: "warning" }] }
]

export const AllergiesDetailsSidebar = ({
  allergies = DEFAULT_ALLERGIES,
  isOpen,
  onClose
}: AllergiesDetailsSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Narrow right sheet to match the reference */}
      <SheetContent side="right" className="w-[360px] sm:w-[420px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <SheetTitle className="text-base font-semibold">Allergies</SheetTitle>
        </div>

        {/* Body */}
        <div className="flex h-full flex-col">
          <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {allergies.map((a, idx) => (
              <li key={idx} className="px-4 py-4">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {a.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {a.reactions.map((r, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={badgeTone(r.tone)}>
                      {r.label}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                window.location.href = "/patient-info/allergies/edit"
              }}>
              Edit
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
