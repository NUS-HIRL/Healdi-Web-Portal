/**
 * Utility functions for mapping goal-related data between UI and API formats
 */

// Category mapping: UI display values to API enum keys
export const mapCategoryToApi = (category: string): string => {
  const categoryMap: Record<string, string> = {
    Sleep: "SLEEP",
    Alcohol: "ALCOHOL",
    Stress: "STRESS",
    Mindfulness: "MINDFULNESS",
    "Medical Self Management": "MEDICAL_SELF_MANAGEMENT",
    Relationships: "RELATIONSHIPS",
    "Work-Life Balance": "WORK_LIFE_BALANCE",
    "Emotional Well-Being": "EMOTIONAL_WELL_BEING",
    Exercise: "EXERCISE",
    Diet: "DIET",
    Smoking: "SMOKING"
  }
  return categoryMap[category] || category
}

// Category mapping: API enum keys to UI display values
export const mapCategoryToDisplay = (category: string): string => {
  const categoryMap: Record<string, string> = {
    MEDICAL_SELF_MANAGEMENT: "Medical Self Management",
    RELATIONSHIPS: "Relationships",
    EMOTIONAL_WELL_BEING: "Emotional Well-Being",
    EXERCISE: "Exercise",
    DIET: "Diet",
    WORK_LIFE_BALANCE: "Work-Life Balance",
    SMOKING: "Smoking",
    SLEEP: "Sleep",
    ALCOHOL: "Alcohol",
    STRESS: "Stress",
    MINDFULNESS: "Mindfulness"
  }
  return categoryMap[category] || category
}

// Completion type mapping: UI display values to API enum keys
export const mapCompletionTypeToApi = (completionType: string): string => {
  const typeMap: Record<string, string> = {
    "Short Term": "SHORT_TERM",
    "Long Term": "LONG_TERM",
    "One-Off": "ONE_OFF"
  }
  return typeMap[completionType] || completionType
}

// Completion type mapping: API enum keys to UI display values
export const mapCompletionTypeToDisplay = (completionType: string): string => {
  const typeMap: Record<string, string> = {
    SHORT_TERM: "Short Term",
    LONG_TERM: "Long Term",
    ONE_OFF: "One Off"
  }
  return typeMap[completionType] || completionType
}
