'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 118 },
  { day: 'Wed', value: 122 },
  { day: 'Thu', value: 115 },
  { day: 'Fri', value: 119 },
  { day: 'Sat', value: 121 },
  { day: 'Sun', value: 117 },
]

export function BloodPressureChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Blood Pressure</h3>
        <span className="text-xs text-gray-500">Week</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">120</div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis hide />
            <Bar 
              dataKey="value" 
              fill="#ec4899" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
