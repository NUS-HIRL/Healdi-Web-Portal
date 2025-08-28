import { Message } from "@/types/chat"

export const computeHitIds = (messages: Message[], query: string): string[] => {
  const tokens = query
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
  if (!tokens.length) return []
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const rx = new RegExp(tokens.map(escape).join("|"), "i")
  return messages.filter((m) => m.body && rx.test(m.body)).map((m) => m.id)
}
