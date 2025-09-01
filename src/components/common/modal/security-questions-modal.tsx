"use client"

import { useState } from "react"
import { BaseModal } from "./base-modal"

interface SecurityQuestion {
  question: string
  answer: string
}

interface SecurityQuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (questions: SecurityQuestion[]) => Promise<void>
}

const SECURITY_QUESTION_OPTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "In which city were you born?",
  "What was your childhood nickname?",
  "What is the name of your favorite teacher?",
  "What was the make of your first car?",
  "What is your father's middle name?"
]

export const SecurityQuestionsModal = ({
  isOpen,
  onClose,
  onSave
}: SecurityQuestionsModalProps) => {
  const [questions, setQuestions] = useState<SecurityQuestion[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
  ])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    setQuestions(prev => prev.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    ))
    setError("")
  }

  const handleSave = async () => {
    setError("")

    // Validate all questions and answers are filled
    const emptyFields = questions.some(q => !q.question || !q.answer.trim())
    if (emptyFields) {
      setError("Please fill in all security questions and answers")
      return
    }

    // Check for duplicate questions
    const questionTexts = questions.map(q => q.question)
    const uniqueQuestions = new Set(questionTexts)
    if (uniqueQuestions.size !== questionTexts.length) {
      setError("Please select different security questions")
      return
    }

    setIsLoading(true)
    try {
      await onSave(questions)
      onClose()
    } catch (_err) {
      setError("Failed to save security questions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setQuestions([
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" }
    ])
    setError("")
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Manage Security Questions"
      error={error}
      onCancel={handleCancel}
      onSave={handleSave}
      isLoading={isLoading}
      maxWidth="lg"
    >
      <p className="text-gray-600 text-sm mb-2">Manage your security questions for enhanced account protection.</p>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-3">
            <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
            
            <div>
              <select
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              >
                <option value="">Select Question</option>
                {SECURITY_QUESTION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <input
                type="text"
                value={question.answer}
                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                placeholder="Answer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  )
}
