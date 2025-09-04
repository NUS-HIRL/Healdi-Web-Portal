// components/chat/highlighted-text.tsx
import { getHighlightSegments, HighlightTextParams } from "@/lib/text-highlight-utils";

interface HighlightedTextProps extends HighlightTextParams {
  isOwn: boolean;
  className?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  query,
  isOwn,
  currentOccurrence,
  className = ""
}) => {
  if (!query.trim()) {
    return <span className={className}>{text}</span>;
  }

  const segments = getHighlightSegments({
    text,
    query,
    currentOccurrence
  });

  return (
    <span className={className}>
      {segments.map((segment) => {
        if (segment.isCurrentOccurrence) {
          return (
            <span key={segment.key} className="bg-yellow-400 text-black rounded px-0.5">
              {segment.text}
            </span>
          );
        } else if (segment.isHighlighted) {
          return (
            <span
              key={segment.key}
              className={`${isOwn ? 'bg-black/40' : 'bg-sky-500/30'} text-inherit rounded px-0.5`}>
              {segment.text}
            </span>
          );
        } else {
          return <span key={segment.key}>{segment.text}</span>;
        }
      })}
    </span>
  );
};