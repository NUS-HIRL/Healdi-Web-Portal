'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useState } from 'react'
import { CustomBar } from '@/components/common/chart'
import { ChartDataPoint, ChartProps } from '@/types/chart'

const data = [
  { time: '12AM', value: 102 },
  { time: '4AM', value: 109 },
  { time: '8AM', value: 80 },
  { time: '12PM', value: 90 },
  { time: '4PM', value: 120 },
  { time: '8PM', value: 115 },
]

export function HeartRateChart() {
  const [hoveredData, setHoveredData] = useState<ChartDataPoint | null>(null)

  const handleBarMouseEnter = (data: unknown) => {
    setHoveredData(data as ChartDataPoint)
  }

  const handleBarMouseLeave = () => {
    setHoveredData(null)
  }

  const displayValue = hoveredData ? hoveredData.value.toString() : null
  const displayTime = hoveredData ? hoveredData.time : null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6 h-[90px]">
        <h2 className="text-xl font-semibold text-gray-800">Heart Rate</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-pink-500">{displayValue || ""}</p>
          <span className="text-xl text-gray-500">{displayValue ? "BPM" : ""}</span>
        </div>
        <p className="text-sm text-gray-500">{displayTime || ""}</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[0, 300]}
              width={40}
              orientation="right"
            />
            <Tooltip 
              content={() => null}
              cursor={false}
            />
            {hoveredData && (
              <ReferenceLine 
                x={hoveredData.time} 
                stroke="#000000" 
                strokeWidth={2} 
                strokeDasharray="none"
              />
            )}
            <Bar 
              dataKey="value" 
              fill="#ec4899" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
              shape={(props: unknown) => (
                <CustomBar 
                  {...(props as ChartProps)} 
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
