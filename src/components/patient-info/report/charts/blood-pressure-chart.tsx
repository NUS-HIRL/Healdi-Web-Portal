'use client'

import { ComposedChart, Line, Scatter, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts'
import { useState } from 'react'
import { CustomDot } from '@/components/common/chart'

const data = [
  { time: '12AM', systolic: 150, diastolic: 80, index: 0 },
  { time: '4AM', systolic: 190, diastolic: 120, index: 1 },
  { time: '8AM', systolic: 160, diastolic: 90, index: 2 },
  { time: '12PM', systolic: 175, diastolic: 110, index: 3 },
  { time: '4PM', systolic: 155, diastolic: 85, index: 4 },
  { time: '8PM', systolic: 160, diastolic: 95, index: 5 },
]

export function BloodPressureChart() {
  const [hoveredData, setHoveredData] = useState<typeof data[0] | null>(null)

  const handleDotMouseEnter = (payload: any) => {
    setHoveredData(payload)
  }

  const handleDotMouseLeave = () => {
    setHoveredData(null)
  }

  const displayValue = hoveredData ? `${hoveredData.systolic}/${hoveredData.diastolic}` : null
  const displayTime = hoveredData ? hoveredData.time : null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6 h-[100px]">
        <h2 className="text-xl font-semibold text-gray-800">Blood Pressure</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-pink-500">{displayValue || ""}</p>
          <span className="text-xl text-gray-500">{displayValue ? 'mmHg' : ""}</span>
        </div>
        <p className="text-sm text-gray-500">{displayTime || ""}</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              domain={[0, 300]}
              ticks={[0, 100, 200, 300]}
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
            <Scatter 
              dataKey="systolic" 
              shape={(props: any) => (
                <CustomDot 
                  {...props} 
                  onMouseEnter={handleDotMouseEnter}
                  onMouseLeave={handleDotMouseLeave}
                />
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
