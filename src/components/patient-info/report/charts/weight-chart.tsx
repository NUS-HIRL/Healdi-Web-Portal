'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { week: 'W1', weight: 167 },
  { week: 'W2', weight: 166 },
  { week: 'W3', weight: 165 },
  { week: 'W4', weight: 164 },
  { week: 'W5', weight: 165 },
  { week: 'W6', weight: 165 },
]

export function WeightChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Weight</h3>
        <div className="text-sm text-gray-500">6 weeks</div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">165 lbs</div>
        <div className="text-sm text-green-600">-2 lbs this month</div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Bar dataKey="weight" fill="#f97316" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
