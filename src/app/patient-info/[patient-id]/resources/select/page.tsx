import { SelectResourcesPage } from "@/components/patient-info/resources/select-resources-page"

interface SelectResourcesProps {
  params: Promise<{
    "patient-id": string
  }>
}

const SelectResources = async ({ params }: SelectResourcesProps) => {
  const { "patient-id": patientId } = await params
  return <SelectResourcesPage patientId={patientId} />
}

export default SelectResources
