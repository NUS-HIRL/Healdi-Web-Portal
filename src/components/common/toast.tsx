"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

interface ToastProps {
  isVisible: boolean
  message: string
  type: "success" | "error"
  onClose: () => void
  duration?: number
}

export const Toast = ({
  isVisible,
  message,
  type,
  onClose,
  duration = 3000
}: ToastProps) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Allow time for exit animation
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-lg border border-gray-200 bg-white">
        <div className={`flex-shrink-0 ${type === "success" ? "text-green-500" : "text-red-500"}`}>
          {type === "success" ? (
            <Check size={20} />
          ) : (
            <X size={20} />
          )}
        </div>
        <span className="font-medium text-gray-900">{message}</span>
      </div>
    </div>
  )
}
