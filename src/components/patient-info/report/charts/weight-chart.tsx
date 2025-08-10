'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useState } from 'react'
import { CustomBar } from '@/components/common/chart'

const data = [
  { day: '12AM', value: 80, index: 0 },
  { day: '4AM', value: 80, index: 1 },
  { day: '8AM', value: 81, index: 2 },
  { day: '12PM', value: 80, index: 3 },
  { day: '4PM', value: 79, index: 4 },
  { day: '8PM', value: 80, index: 5 },
]

export function WeightChart() {
  const [hoveredData, setHoveredData] = useState<typeof data[0] | null>(null)

  const handleBarMouseEnter = (data: any) => {
    setHoveredData(data)
  }

  const handleBarMouseLeave = () => {
    setHoveredData(null)
  }

  const displayValue = hoveredData ? hoveredData.value.toString() : null
  const displayTime = hoveredData ? hoveredData.day : null
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6 h-[90px]">
        <h2 className="text-xl font-semibold text-gray-800">Weight</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#FF975B]">{displayValue || ""}</p>
          <span className="text-xl text-gray-500">{displayValue ? "kg" : ""}</span>
        </div>
        <p className="text-sm text-gray-500">{displayTime || ""}</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            barCategoryGap="20%"
            onMouseLeave={handleBarMouseLeave}
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
              domain={[0, 100]}
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
              fill="#FF975B" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
              shape={(props: any) => (
                <CustomBar 
                  {...props} 
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
