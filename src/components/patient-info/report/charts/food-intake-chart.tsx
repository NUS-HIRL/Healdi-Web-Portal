'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', value: 1800 },
  { day: 'Tue', value: 2100 },
  { day: 'Wed', value: 1950 },
  { day: 'Thu', value: 2200 },
  { day: 'Fri', value: 1750 },
  { day: 'Sat', value: 2000 },
  { day: 'Sun', value: 1900 },
]

export function FoodIntakeChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-48">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Food Intake</h3>
        <span className="text-xs text-gray-500">Kcal</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">1900</div>
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
