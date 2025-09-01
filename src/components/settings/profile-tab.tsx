"use client"

import { useState } from "react"
import Image from "next/image"
import { EditModal } from "@/components/common/modal/edit-modal"
import { AvatarUploadModal } from "@/components/common/modal/avatar-upload-modal"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/common/toast"

export const ProfileTab = () => {
    const [firstName, setFirstName] = useState("Dr. Andrew")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
    const [toast, setToast] = useState<{
        isVisible: boolean
        message: string
        type: "success" | "error"
    }>({
        isVisible: false,
        message: "",
        type: "success"
    })

    const handleEditFirstName = async (newName: string) => {
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random error for demonstration
                    if (Math.random() > 0.5) {
                        reject(new Error("Network error"))
                    } else {
                        resolve(true)
                    }
                }, 1000)
            })

            setFirstName(newName)
            setToast({
                isVisible: true,
                message: "First name updated successfully!",
                type: "success"
            })
        } catch (error) {
            setToast({
                isVisible: true,
                message: "Failed to update first name. Please try again.",
                type: "error"
            })
            throw error
        }
    }

    const handleAvatarUpload = async () => {
        try {
            // Simulate API call for avatar upload
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random error for demonstration
                    if (Math.random() > 0.7) {
                        reject(new Error("Upload failed"))
                    } else {
                        resolve(true)
                    }
                }, 1500)
            })

            setToast({
                isVisible: true,
                message: "Avatar updated successfully!",
                type: "success"
            })
        } catch (error) {
            setToast({
                isVisible: true,
                message: "Failed to upload avatar. Please try again.",
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Profile</h2>
                <p className="text-gray-600 mb-8">
                    View and manage your personal profile information.
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">First Name</h3>
                                <p className="text-sm text-gray-500">Set a first name for your profile.</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-900 font-medium">{firstName}</span>
                        </div>
                        <div className="text-right">
                            <Button
                                onClick={() => setIsEditModalOpen(true)}
                                variant="outline"
                                size="sm"
                            >
                                Edit
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
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Avatar</h3>
                                <p className="text-sm text-gray-500">Select an avatar to personalise your account.</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border">
                                <Image
                                    src="/chat/placeholder-avatar.svg"
                                    alt="Profile avatar"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                onClick={() => setIsAvatarModalOpen(true)}
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

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditFirstName}
                title="Edit First Name"
                description="Set a first name for your profile."
                currentValue={firstName.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s/, "")}
                placeholder="First Name"
                hasPrefix={true}
            />

            <AvatarUploadModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                onSave={handleAvatarUpload}
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
