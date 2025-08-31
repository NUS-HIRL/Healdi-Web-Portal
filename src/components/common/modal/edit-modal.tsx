"use client"

import { useState } from "react"
import { BaseModal } from "./base-modal"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (value: string) => Promise<void>
  title: string
  description: string
  currentValue: string
  placeholder: string
  fieldType?: "text" | "email" | "password"
  hasPrefix?: boolean
  prefixOptions?: string[]
}

export const EditModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  currentValue,
  placeholder,
  fieldType = "text",
  hasPrefix = false,
  prefixOptions = ["Dr.", "Mr.", "Ms.", "Mrs."]
}: EditModalProps) => {
  const [value, setValue] = useState(currentValue)
  const [prefix, setPrefix] = useState("Dr.")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setError("")

    if (!value.trim()) {
      setError("This field is required")
      return
    }

    setIsLoading(true)
    try {
      const finalValue = hasPrefix ? `${prefix} ${value}` : value
      await onSave(finalValue)
      onClose()
    } catch (err) {
      setError("Failed to save changes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setValue(currentValue)
    setError("")
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      error={error}
      onCancel={handleCancel}
      onSave={handleSave}
      isLoading={isLoading}
    >
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      
      <div className="space-y-4">
        {hasPrefix && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {prefixOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {title}
          </label>
          <input
            type={fieldType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? "border-red-300" : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </BaseModal>
  )
}