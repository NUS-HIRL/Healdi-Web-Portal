"use client"

import { useState } from "react"
import { BaseModal } from "./base-modal"
import { ErrorMessage } from "@/components/common/error-message"

interface ChangeEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newEmail: string) => Promise<void>
}

export const ChangeEmailModal = ({
  isOpen,
  onClose,
  onSave
}: ChangeEmailModalProps) => {
  const [newEmail, setNewEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSave = async () => {
    setError("")

    if (!newEmail.trim()) {
      setError("Email address is required")
      return
    }

    if (!validateEmail(newEmail)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    try {
      await onSave(newEmail)
      onClose()
    } catch {
      setError("Failed to update email verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setNewEmail("")
    setError("")
    onClose()
  }

  // Custom error display with X icon
  const customError = error ? (
    <ErrorMessage message={error} />
  ) : null

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Change Email Verification"
      error="" // We'll handle error display manually for custom styling
      onCancel={handleCancel}
      onSave={handleSave}
      isLoading={isLoading}>
      {customError}
      <p className="text-gray-600 text-sm mb-2">
        Update your email address for account verification and security
        notifications.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Email Address
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </BaseModal>
  )
}
