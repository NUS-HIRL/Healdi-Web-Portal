import { SelectResourcesPage } from "@/components/patient-info/resources/select-resources-page"

interface SelectResourcesProps {
  params: {
    "patient-id": string
  }
}

export default function SelectResources({ params }: SelectResourcesProps) {
  return <SelectResourcesPage patientId={params["patient-id"]} />
}
