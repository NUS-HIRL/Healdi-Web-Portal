'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { time: '6AM', value: 98.2 },
  { time: '8AM', value: 98.4 },
  { time: '10AM', value: 98.6 },
  { time: '12PM', value: 99.0 },
  { time: '2PM', value: 98.9 },
  { time: '4PM', value: 98.8 },
  { time: '6PM', value: 98.4 },
  { time: '8PM', value: 98.3 },
  { time: '10PM', value: 98.2 },
]

export function TemperatureChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Temperature Trend</h3>
        <div className="text-sm text-gray-500">Today</div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">98.6°F</div>
        <div className="text-sm text-green-600">Normal Range</div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
