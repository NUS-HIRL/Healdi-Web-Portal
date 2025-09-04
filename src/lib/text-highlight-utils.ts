// utils/text-highlight-utils.ts
import { SearchOccurrence } from "@/lib/chat";

export const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export interface HighlightSegment {
  text: string;
  isHighlighted: boolean;
  isCurrentOccurrence?: boolean;
  key: string;
}

export interface HighlightTextParams {
  text: string;
  query: string;
  currentOccurrence?: SearchOccurrence | null;
}

export const getHighlightSegments = ({
  text,
  query,
  currentOccurrence = null
}: HighlightTextParams): HighlightSegment[] => {
  const tokens = query.split(/\s+/).map(t => t.trim()).filter(Boolean);
  if (!tokens.length) return [{ text, isHighlighted: false, key: '0' }];

  const pattern = new RegExp(`(${tokens.map(escapeRegex).join('|')})`, 'gi');
  const parts = text.split(pattern);
  
  const segments: HighlightSegment[] = [];
  let currentPosition = 0;

  if (!currentOccurrence) {
    // Simple highlighting without current occurrence
    parts.forEach((part, i) => {
      segments.push({
        text: part,
        isHighlighted: i % 2 === 1,
        key: `${i}`
      });
    });
    return segments;
  }

  // Complex highlighting with current occurrence
  const { startIndex, length } = currentOccurrence;
  
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      // Matched part
      const partStart = currentPosition;
      const partEnd = partStart + part.length;
      
      if (startIndex >= partStart && startIndex < partEnd) {
        // This part contains the current occurrence
        const beforeCurrent = part.substring(0, startIndex - partStart);
        const current = part.substring(startIndex - partStart, startIndex - partStart + length);
        const afterCurrent = part.substring(startIndex - partStart + length);
        
        if (beforeCurrent) {
          segments.push({
            text: beforeCurrent,
            isHighlighted: true,
            key: `${i}-before`
          });
        }
        
        segments.push({
          text: current,
          isHighlighted: true,
          isCurrentOccurrence: true,
          key: `${i}-current`
        });
        
        if (afterCurrent) {
          segments.push({
            text: afterCurrent,
            isHighlighted: true,
            key: `${i}-after`
          });
        }
      } else {
        // Normal matched part
        segments.push({
          text: part,
          isHighlighted: true,
          key: `${i}`
        });
      }
    } else {
      // Non-matched part
      segments.push({
        text: part,
        isHighlighted: false,
        key: `${i}`
      });
    }
    
    currentPosition += part.length;
  });

  return segments;
};