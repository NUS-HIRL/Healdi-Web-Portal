import { X } from "lucide-react"

interface ErrorMessageProps {
  message: string
  className?: string
}

export const ErrorMessage = ({
  message,
  className = ""
}: ErrorMessageProps) => {
  if (!message) return null

  return (
    <div
      className={`mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 ${className}`}>
      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <X size={12} className="text-white" />
      </div>
      <span className="text-red-700 text-sm">{message}</span>
    </div>
  )
}
