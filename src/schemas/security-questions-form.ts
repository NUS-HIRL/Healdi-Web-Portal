import { z } from "zod"

export const securityQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .min(1, "Please select a security question"),
        answer: z
          .string()
          .min(1, "Answer is required")
          .max(100, "Answer must be less than 100 characters")
      })
    )
    .length(3, "Exactly 3 security questions are required")
    .refine(
      (questions) => {
        const questionTexts = questions.map(q => q.question)
        const uniqueQuestions = new Set(questionTexts)
        return uniqueQuestions.size === questionTexts.length
      },
      {
        message: "Please select different security questions"
      }
    )
})

export type SecurityQuestionsFormData = z.infer<typeof securityQuestionsSchema>
