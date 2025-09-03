"use client"

import { useEffect, useState } from "react"
import { Check, X, AlertTriangle, Info } from "lucide-react"
import { ToastProps } from "@/types/toast"

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

  const getToastIcon = () => {
    switch (type) {
      case "success":
        return <Check size={20} className="text-green-500" />
      case "error":
        return <X size={20} className="text-red-500" />
      case "warning":
        return <AlertTriangle size={20} className="text-yellow-500" />
      case "info":
        return <Info size={20} className="text-blue-500" />
      default:
        return <Check size={20} className="text-green-500" />
    }
  }

  // TODO: Add different background colors and styles based on toast type
  // TODO: Add support for dark mode theming
  const getToastStyles = () => {
    const baseStyles = "flex items-center space-x-3 px-4 py-2 rounded-lg shadow-lg border bg-white"
    switch (type) {
      case "success":
        return `${baseStyles} border-green-200`
      case "error":
        return `${baseStyles} border-red-200`
      case "warning":
        return `${baseStyles} border-yellow-200`
      case "info":
        return `${baseStyles} border-blue-200`
      default:
        return `${baseStyles} border-gray-200`
    }
  }

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}>
      <div className={getToastStyles()}>
        <div className="flex-shrink-0">
          {getToastIcon()}
        </div>
        <span className="font-medium text-gray-900">{message}</span>
      </div>
    </div>
  )
}
