"use client"

import { ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  error?: string
  onCancel: () => void
  onSave: () => void
  isLoading?: boolean
  isSaveDisabled?: boolean
  saveText?: string
  cancelText?: string
  maxWidth?: "sm" | "md" | "lg"
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  error,
  onCancel,
  onSave,
  isLoading = false,
  isSaveDisabled = false,
  saveText = "Save",
  cancelText = "Cancel",
  maxWidth = "md"
}: BaseModalProps) => {
  if (!isOpen) return null

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg"
  }[maxWidth]

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 min-h-screen w-full">
      <div className={`bg-white rounded-lg shadow-xl w-full mx-4 ${maxWidthClass}`}>
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 pt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}
          
          {children}
        </div>
        
        <div className="flex justify-end space-x-3 p-6">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onSave}
            disabled={isLoading || isSaveDisabled}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : saveText}
          </Button>
        </div>
      </div>
    </div>
  )
}
