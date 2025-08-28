interface SubmitSectionProps {
  title?: string
  description?: string
  buttonText?: string
  onSubmit?: () => void
  disabled?: boolean
  isForm?: boolean
}

export const SubmitSection = ({
  title = "Ready to Submit?",
  description = "Review your filled form details and make sure everything is accurate. Once you're ready, click the 'Submit' button to add the new item.",
  buttonText = "Submit",
  onSubmit,
  disabled = false,
  isForm = true
}: SubmitSectionProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="flex justify-end border-t border-gray-200 pt-4">
        <button
          type={isForm ? "submit" : "button"}
          onClick={!isForm ? onSubmit : undefined}
          disabled={disabled}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
          {buttonText}
        </button>
      </div>
    </div>
  )
}
