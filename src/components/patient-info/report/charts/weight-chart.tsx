'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: '12AM', value: 80 },
  { day: '4AM', value: 80 },
  { day: '8AM', value: 81 },
  { day: '12PM', value: 80 },
  { day: '4PM', value: 79 },
  { day: '8PM', value: 80 },
]

export function WeightChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weight</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#FF975B]">7</p>
          <span className="text-xl text-gray-500">kg</span>
        </div>
        <p className="text-sm text-gray-500">4:00PM - 5:00PM</p>
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
              domain={[0, 100]}
              width={40}
              orientation="right"
            />
            <Bar 
              dataKey="value" 
              fill="#FF975B" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
