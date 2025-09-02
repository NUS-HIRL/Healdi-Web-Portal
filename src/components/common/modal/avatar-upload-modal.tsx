"use client"

import { useState } from "react"
import { Upload, Trash2 } from "lucide-react"
import { BaseModal } from "./base-modal"
import { useFileUpload } from "@/hooks/use-file-upload"
import { ErrorMessage } from "@/components/common/error-message"

interface AvatarUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (file: File) => Promise<void>
}

export const AvatarUploadModal = ({
  isOpen,
  onClose,
  onSave
}: AvatarUploadModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    selectedFile,
    error,
    isDragging,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInputChange,
    removeFile,
    triggerFileSelect,
    reset
  } = useFileUpload({
    validation: {
      maxSize: 5 * 1024 * 1024, // 5MB
      minWidth: 500,
      minHeight: 500,
      allowedTypes: ['image/']
    }
  })

  const handleSave = async () => {
    if (!selectedFile) {
      return
    }

    setIsLoading(true)
    try {
      await onSave(selectedFile)
      onClose()
      reset()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  const customError = error ? (
    <ErrorMessage message={error} />
  ) : null

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Change Avatar"
      error="" // We'll handle error display manually for custom styling
      onCancel={handleCancel}
      onSave={handleSave}
      isLoading={isLoading}
      isSaveDisabled={!selectedFile}>
      {customError}
      <p className="text-gray-600 text-sm mb-4">
        Upload new avatar, make sure to keep it at least 500 × 500 px.
      </p>

      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileSelect}>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                Click or drag file to this area to upload
              </p>
              <p className="text-gray-500 text-sm">
                Support for a single upload.
              </p>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-red-600 text-sm font-medium">
                {selectedFile.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
