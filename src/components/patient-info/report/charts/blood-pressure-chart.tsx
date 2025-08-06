'use client'

import { ComposedChart, Line, Scatter, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts'

const data = [
  { time: '12AM', systolic: 150, diastolic: 80, index: 0 },
  { time: '4AM', systolic: 190, diastolic: 120, index: 1 },
  { time: '8AM', systolic: 160, diastolic: 90, index: 2 },
  { time: '12PM', systolic: 175, diastolic: 110, index: 3 },
  { time: '4PM', systolic: 155, diastolic: 85, index: 4 },
  { time: '8PM', systolic: 160, diastolic: 95, index: 5 },
]

// Custom dot component to render the range lines
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props
  if (!payload) return null
  
  const rangeHeight = ((payload.systolic - payload.diastolic) / 300) * 240 // Approximate height scaling
  const lineColor = payload.highlighted ? '#374151' : '#f9a8d4' // gray-700 or pink-300
  const lineWidth = payload.highlighted ? 3 : 2
  
  return (
    <g>
      {/* Vertical range line */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy + rangeHeight}
        stroke={lineColor}
        strokeWidth={lineWidth}
        strokeLinecap="round"
      />
      {/* High point (systolic) */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#ec4899"
        stroke="white"
        strokeWidth={1}
      />
      {/* Low point (diastolic) */}
      <circle
        cx={cx}
        cy={cy + rangeHeight}
        r={4}
        fill="#ec4899"
        stroke="white"
        strokeWidth={1}
      />
    </g>
  )
}

export function BloodPressureChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Blood Pressure</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-pink-500">120/78</p>
          <span className="text-xl text-gray-500">mmHg</span>
        </div>
        <p className="text-sm text-gray-500">4:00PM - 5:00PM</p>
      </div>

      {/* Chart Section */}
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[0, 300]}
              ticks={[0, 100, 200, 300]}
              width={40}
              orientation="right"
            />
            <Scatter 
              dataKey="systolic" 
              shape={<CustomDot />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
