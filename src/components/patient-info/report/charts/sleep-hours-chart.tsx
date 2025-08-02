'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', value: 7.5 },
  { day: 'Tue', value: 8.0 },
  { day: 'Wed', value: 6.5 },
  { day: 'Thu', value: 7.8 },
  { day: 'Fri', value: 7.2 },
  { day: 'Sat', value: 8.5 },
  { day: 'Sun', value: 8.0 },
]

export function SleepHoursChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Sleep Hours</h3>
        <span className="text-xs text-gray-500">Hours</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">7.2</div>
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
              fill="#22c55e" 
              radius={[2, 2, 0, 0]} 
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
