'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', steps: 8500 },
  { day: 'Tue', steps: 9200 },
  { day: 'Wed', steps: 7800 },
  { day: 'Thu', steps: 10500 },
  { day: 'Fri', steps: 8900 },
  { day: 'Sat', steps: 12000 },
  { day: 'Sun', steps: 6500 },
]

export function StepsChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Steps</h3>
        <div className="text-sm text-gray-500">This week</div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">8,900</div>
        <div className="text-sm text-blue-600">Today</div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Bar dataKey="steps" fill="#22c55e" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
