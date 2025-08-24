export interface ChartDataPoint {
  value: number
  day?: string
  time?: string
}

export interface BloodPressureDataPoint {
  time: string
  systolic: number
  diastolic: number
  index: number
  highlighted?: boolean
}

export type ChartProps = Record<string, unknown>
