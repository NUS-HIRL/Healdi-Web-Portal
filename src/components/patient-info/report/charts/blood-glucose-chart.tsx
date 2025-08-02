'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', value: 85 },
  { day: 'Tue', value: 92 },
  { day: 'Wed', value: 88 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 90 },
  { day: 'Sat', value: 87 },
  { day: 'Sun', value: 93 },
]

export function BloodGlucoseChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Blood Glucose</h3>
        <span className="text-xs text-gray-500">mg/dL</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">95</div>
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
