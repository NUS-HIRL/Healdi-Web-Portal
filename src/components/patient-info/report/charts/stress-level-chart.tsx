'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', value: 3 },
  { day: 'Tue', value: 4 },
  { day: 'Wed', value: 2 },
  { day: 'Thu', value: 5 },
  { day: 'Fri', value: 3 },
  { day: 'Sat', value: 2 },
  { day: 'Sun', value: 1 },
]

export function StressLevelChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Stress Level</h3>
        <span className="text-xs text-gray-500">Level</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">3</div>
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
              fill="#f97316" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
