"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger"
}: ConfirmationDialogProps) => {
  if (!isOpen) return null

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <AlertTriangle size={24} className="text-red-500" />,
          confirmButton: "bg-red-600 hover:bg-red-700 text-white",
          border: "border-red-200"
        }
      case "warning":
        return {
          icon: <AlertTriangle size={24} className="text-yellow-500" />,
          confirmButton: "bg-yellow-600 hover:bg-yellow-700 text-white",
          border: "border-yellow-200"
        }
      case "info":
        return {
          icon: <AlertTriangle size={24} className="text-blue-500" />,
          confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
          border: "border-blue-200"
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 min-h-screen w-full">
      <div className="bg-white rounded-lg shadow-xl w-full mx-4 max-w-md">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">{styles.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex justify-end space-x-3">
            <Button onClick={onClose} variant="outline" className="px-4 py-2">
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={`px-4 py-2 ${styles.confirmButton} disabled:opacity-50`}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
