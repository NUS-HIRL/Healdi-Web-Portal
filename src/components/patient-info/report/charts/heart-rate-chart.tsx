'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { time: '6', value: 65 },
  { time: '9', value: 72 },
  { time: '12', value: 78 },
  { time: '15', value: 75 },
  { time: '18', value: 70 },
  { time: '21', value: 68 },
]

export function HeartRateChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Heart Rate</h3>
        <span className="text-xs text-gray-500">BPM</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">72</div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
