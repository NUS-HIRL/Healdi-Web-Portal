'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', glasses: 6 },
  { day: 'Tue', glasses: 8 },
  { day: 'Wed', glasses: 7 },
  { day: 'Thu', glasses: 9 },
  { day: 'Fri', glasses: 6 },
  { day: 'Sat', glasses: 8 },
  { day: 'Sun', glasses: 7 },
]

export function WaterIntakeChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Water Intake</h3>
        <div className="text-sm text-gray-500">This week</div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">6 glasses</div>
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
              domain={[0, 12]}
            />
            <Bar dataKey="glasses" fill="#06b6d4" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
