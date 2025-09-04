import { Message } from "@/types/chat";

export interface SearchOccurrence {
  messageId: string;
  occurrenceIndex: number;
  startIndex: number;
  length: number;
  createdAt: Date;
}

export const computeOccurrences = (messages: Message[], query: string): SearchOccurrence[] => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const queryTokens = trimmedQuery.split(/\s+/).map(t => t.trim()).filter(Boolean);
  if (queryTokens.length === 0) return [];

  const occurrences: SearchOccurrence[] = [];
  const tokenPatterns = queryTokens.map(token => new RegExp(escapeRegex(token), 'gi'));

  // Create a map for quick message lookup by ID to get createdAt
  const messageMap = new Map<string, Message>();
  messages.forEach(message => {
    messageMap.set(message.id, message);
  });

  messages.forEach(message => {
    if (message.body) {
      const text = message.body;
      
      // Check if ALL tokens are present in the message
      const hasAllTokens = queryTokens.every(token => 
        text.toLowerCase().includes(token.toLowerCase())
      );
      
      if (hasAllTokens) {
        // Find all occurrences of each token
        tokenPatterns.forEach((pattern) => {
          let match;
          while ((match = pattern.exec(text)) !== null) {
            occurrences.push({
              messageId: message.id,
              occurrenceIndex: occurrences.length,
              startIndex: match.index,
              length: match[0].length,
              createdAt: new Date(message.createdAt) // Add createdAt from the message
            });
          }
          // Reset the regex for next use
          pattern.lastIndex = 0;
        });
      }
    }
  });

  // Sort occurrences by creation time (newest first) and then by position within the message
  return occurrences.sort((a, b) => {
    // First sort by creation time (descending - newest first)
    const timeDiff = b.createdAt.getTime() - a.createdAt.getTime();
    if (timeDiff !== 0) return timeDiff;
    
    // If same creation time, sort by message ID for consistency
    if (a.messageId !== b.messageId) return a.messageId.localeCompare(b.messageId);
    
    // If same message, sort by position within the message
    return a.startIndex - b.startIndex;
  });
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');