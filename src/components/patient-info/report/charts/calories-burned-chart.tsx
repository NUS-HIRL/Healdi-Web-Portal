'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: '12AM', value: 300 },
  { day: '4AM', value: 400 },
  { day: '8AM', value: 200 },
  { day: '12PM', value: 500 },
  { day: '4PM', value: 300 },
  { day: '8PM', value: 200 },
]

export function CaloriesBurnedChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Calories Burned</h2>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#FF975B]">320</p>
          <span className="text-xl text-gray-500">calories burned</span>
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
              domain={[0, 10]}
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
