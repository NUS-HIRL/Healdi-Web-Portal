"use client"

import { useState } from "react"
import { BaseModal } from "./base-modal"
import { Eye, EyeOff, X } from "lucide-react"

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (currentPassword: string, newPassword: string) => Promise<void>
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSave
}: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasMinLength = password.length >= 8

    return hasUppercase && hasLowercase && hasNumbers && hasSymbols && hasMinLength
  }

  const getPasswordRequirementsError = (): string => {
    return "Passwords must have at least 8 characters and contain uppercase letters, lowercase letters, numbers, and symbols (e.g. @, #, $, %, ^)."
  }

  const handleSave = async () => {
    setError("")

    if (!currentPassword.trim()) {
      setError("Current password is required")
      return
    }

    if (!newPassword.trim()) {
      setError("New password is required")
      return
    }

    if (!validatePassword(newPassword)) {
      setError(getPasswordRequirementsError())
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password")
      return
    }

    setIsLoading(true)
    try {
      await onSave(currentPassword, newPassword)
      onClose()
    } catch {
      setError("Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setError("")
    onClose()
  }

  const customError = error ? (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
        <X size={12} className="text-white" />
      </div>
      <span className="text-red-700 text-sm">{error}</span>
    </div>
  ) : null

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Change Password"
      error=""
      onCancel={handleCancel}
      onSave={handleSave}
      isLoading={isLoading}
    >
      {customError}
      <p className="text-gray-600 text-sm mb-4">Manage your login password to safeguard your account.</p>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
