'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useState } from 'react'
import { CustomBar } from '@/components/common/chart'
import { ChartDataPoint, ChartProps } from '@/types/chart'

const data = [
  { day: '12AM', value: 7850, index: 0 },
  { day: '4AM', value: 9200, index: 1 },
  { day: '8AM', value: 8650, index: 2 },
  { day: '12PM', value: 10200, index: 3 },
  { day: '4PM', value: 8900, index: 4 },
  { day: '8PM', value: 12500, index: 5 },
]

export function StepsChart() {
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
        <h2 className="text-xl font-semibold text-gray-800">Steps</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#3b82f6]">{displayValue || ""}</p>
          <span className="text-xl text-gray-500">{displayValue ? "Steps" : ""}</span>
        </div>
        <p className="text-sm text-gray-500">{displayTime || ""}</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
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
              domain={[5000, 15000]}
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
              fill="#3b82f6" 
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
