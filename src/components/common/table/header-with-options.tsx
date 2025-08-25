import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderWithOptionsProps {
  title: string
  to: string
}

export const HeaderWithOptions = ({ title, to }: HeaderWithOptionsProps) => {
  const router = useRouter()
  return (
    <div className="py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          className="border-blue-500 text-blue-500 bg-transparent"
          onClick={() => {
            router.push(to)
          }}>
          <Plus size={16} />
          Add
        </Button>
      </div>
    </div>
  )
}
