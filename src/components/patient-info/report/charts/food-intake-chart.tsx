'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useState } from 'react'
import { CustomBar } from '@/components/common/chart'
import { ChartDataPoint, ChartProps } from '@/types/chart'

const data = [
  { day: '12AM', value: 2100 },
  { day: '4AM', value: 1850 },
  { day: '8AM', value: 2250 },
  { day: '12PM', value: 1950 },
  { day: '4PM', value: 2000 },
  { day: '8PM', value: 2300 },
]

export function FoodIntakeChart() {
  const [hoveredData, setHoveredData] = useState<ChartDataPoint | null>(null)

  const handleBarMouseEnter = (data: unknown) => {
      setHoveredData(data as ChartDataPoint)
    }

  const handleBarMouseLeave = () => {
    setHoveredData(null)
  }

  const displayValue = hoveredData ? hoveredData.value.toLocaleString() : null
  const displayTime = hoveredData ? hoveredData.day : null
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6 h-[90px]">
        <h2 className="text-xl font-semibold text-gray-800">Food Intake</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#22c55e]">{displayValue || ""}</p>
          <span className="text-xl text-gray-500">{displayValue ? "Kcal" : ""}</span>
        </div>
        <p className="text-sm text-gray-500">{displayTime || ""}</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            barCategoryGap="20%"
          >
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[1500, 2500]}
              width={40}
              orientation="right"
            />
            <Tooltip 
              content={() => null}
              cursor={false}
            />
            {hoveredData && (
              <ReferenceLine 
                x={hoveredData.day} 
                stroke="#000000" 
                strokeWidth={2} 
                strokeDasharray="none"
              />
            )}
            <Bar 
              dataKey="value" 
              fill="#22c55e" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
              shape={(props: unknown) => (
                <CustomBar 
                  {...props as ChartProps} 
                  onMouseEnter={handleBarMouseEnter}
                  onMouseLeave={handleBarMouseLeave}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
