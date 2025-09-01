"use client"

import { useState, useRef, DragEvent } from "react"
import { X, Upload, Trash2 } from "lucide-react"
import { BaseModal } from "./base-modal"

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file")
      return false
    }

    // Check file size (optional - you can set a max file size)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError("File size must be less than 5MB")
      return false
    }

    // Create image to check dimensions
    const img = new window.Image()
    img.onload = () => {
      if (img.width < 500 || img.height < 500) {
        setError("Oops! Image must be 500 × 500 pixels.")
        setSelectedFile(null)
        return
      }
      setError("")
    }
    img.src = URL.createObjectURL(file)

    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      setError("")
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Please select a file")
      return
    }

    setIsLoading(true)
    try {
      await onSave(selectedFile)
      onClose()
      setSelectedFile(null)
      setError("")
    } catch (_err) {
      setError("Failed to upload avatar. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setError("")
    onClose()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const customError = error ? (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <X size={12} className="text-white" />
      </div>
      <span className="text-red-700 text-sm">{error}</span>
    </div>
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
      isSaveDisabled={!selectedFile}
    >
      {customError}
      <p className="text-gray-600 text-sm mb-4">Upload new avatar, make sure to keep it at least 500 × 500 px.</p>
      
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
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">Click or drag file to this area to upload</p>
              <p className="text-gray-500 text-sm">Support for a single upload.</p>
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
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-red-600 text-sm font-medium">{selectedFile.name}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  )
}