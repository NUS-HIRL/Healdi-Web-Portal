interface SubtitleProps {
  title: string
}

export const Subtitle = ({ title }: SubtitleProps) => {
  return <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
}
