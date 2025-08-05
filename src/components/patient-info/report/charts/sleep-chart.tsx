'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 8.0 },
  { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 7.8 },
  { day: 'Fri', hours: 7.2 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 8.0 },
]

export function SleepChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Sleep Hours</h3>
        <div className="text-sm text-gray-500">This week</div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">7.2h</div>
        <div className="text-sm text-blue-600">Last night</div>
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
              domain={[0, 10]}
            />
            <Bar dataKey="hours" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
