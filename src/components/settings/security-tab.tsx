"use client"

import { useState } from "react"
import { SecurityQuestionsModal } from "@/components/common/modal/security-questions-modal"
import { ChangePasswordModal } from "@/components/common/modal/change-password-modal"
import { ChangeEmailModal } from "@/components/common/modal/change-email-modal"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/common/toast"

export const SecurityTab = () => {
    const [isSecurityQuestionsModalOpen, setIsSecurityQuestionsModalOpen] = useState(false)
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)
    const [currentEmail, setCurrentEmail] = useState("an*****@domain.com")
    const [toast, setToast] = useState<{
        isVisible: boolean
        message: string
        type: "success" | "error"
    }>({
        isVisible: false,
        message: "",
        type: "success"
    })

    const handleSecurityQuestionsSave = async (questions: Array<{ question: string, answer: string }>) => {
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random error for demonstration
                    if (Math.random() > 0.7) {
                        reject(new Error("Network error"))
                    } else {
                        resolve(true)
                    }
                }, 1500)
            })

            setToast({
                isVisible: true,
                message: "Security questions updated successfully!",
                type: "success"
            })
        } catch (error) {
            setToast({
                isVisible: true,
                message: "Failed to update security questions. Please try again.",
                type: "error"
            })
            throw error
        }
    }

    const handleChangePasswordSave = async (currentPassword: string, newPassword: string) => {
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random error for demonstration
                    if (Math.random() > 0.7) {
                        reject(new Error("Network error"))
                    } else {
                        resolve(true)
                    }
                }, 1500)
            })

            setToast({
                isVisible: true,
                message: "Password updated successfully!",
                type: "success"
            })
        } catch (error) {
            setToast({
                isVisible: true,
                message: "Failed to update password. Please try again.",
                type: "error"
            })
            throw error
        }
    }

    const handleChangeEmailSave = async (newEmail: string) => {
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random error for demonstration
                    if (Math.random() > 0.7) {
                        reject(new Error("Network error"))
                    } else {
                        resolve(true)
                    }
                }, 1500)
            })

            // Mask the new email for display
            const maskedEmail = newEmail.replace(/(.{2})(.*)(@.*)/, '$1*****$3')
            setCurrentEmail(maskedEmail)

            setToast({
                isVisible: true,
                message: "Email verification updated successfully!",
                type: "success"
            })
        } catch (error) {
            setToast({
                isVisible: true,
                message: "Failed to update email verification. Please try again.",
                type: "error"
            })
            throw error
        }
    }

    const closeToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }))
    }
    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Security</h2>
                <p className="text-gray-600 mb-8">
                    View and manage your account security information.
                </p>

                <div className="divide-y divide-gray-200 space-y-0">
                    <div className="grid grid-cols-3 items-center py-6 gap-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Security Questions</h3>
                                <p className="text-sm text-gray-500">Manage your security questions for enhanced account protection.</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-900">Last updated 14 Sep 2020</span>
                        </div>
                        <div className="text-right">
                            <Button
                                onClick={() => setIsSecurityQuestionsModalOpen(true)}
                                variant="outline"
                                size="sm"
                            >
                                Manage
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-center py-6 gap-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Log In Password</h3>
                                <p className="text-sm text-gray-500">Manage your login password to safeguard your account.</p>
                            </div>
                        </div>
                        <div className="text-center">
                            {/* Placeholder value to maintain layout */}
                            <span className="text-gray-900"></span>
                        </div>
                        <div className="text-right">
                            <Button
                                onClick={() => setIsChangePasswordModalOpen(true)}
                                variant="outline"
                                size="sm"
                            >
                                Change
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-center py-6 gap-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Email Verification</h3>
                                <p className="text-sm text-gray-500">Protect your account with email codes.</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-900">{currentEmail}</span>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                onClick={() => setIsChangeEmailModalOpen(true)}
                                variant="outline"
                                size="sm"
                            >
                                Change
                            </Button>
                            <Button variant="outline" size="sm">
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <SecurityQuestionsModal
                isOpen={isSecurityQuestionsModalOpen}
                onClose={() => setIsSecurityQuestionsModalOpen(false)}
                onSave={handleSecurityQuestionsSave}
            />

            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setIsChangePasswordModalOpen(false)}
                onSave={handleChangePasswordSave}
            />

            <ChangeEmailModal
                isOpen={isChangeEmailModalOpen}
                onClose={() => setIsChangeEmailModalOpen(false)}
                onSave={handleChangeEmailSave}
            />

            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </div>
    )
}
