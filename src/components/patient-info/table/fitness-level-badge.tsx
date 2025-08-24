interface FitnessLevelBadgeProps {
  level: string
}

const getFitnessLevelColor = (level: string) => {
  switch (level) {
    case "High":
      return "bg-green-100 text-green-800"
    case "Moderate":
      return "bg-orange-100 text-orange-800"
    case "Low":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const FitnessLevelBadge = ({ level }: FitnessLevelBadgeProps) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getFitnessLevelColor(level)}`}>
      {level}
    </span>
  )
}
