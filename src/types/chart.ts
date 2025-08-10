export interface ChartDataPoint {
  day?: string
  time?: string
  value: number
  index?: number
}

export interface BloodPressureDataPoint {
  time: string
  systolic: number
  diastolic: number
  index: number
  highlighted?: boolean
}

export type ChartProps = Record<string, unknown>
