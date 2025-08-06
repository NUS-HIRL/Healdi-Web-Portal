'use client'

import { useState } from 'react'
import { Calendar, Clock, BarChart3 } from 'lucide-react'
import { DropdownButton } from '../../common/dropdown-button'
import { BloodPressureChart } from './charts/blood-pressure-chart'
import { HeartRateChart } from './charts/heart-rate-chart'
import { BloodGlucoseChart } from './charts/blood-glucose-chart'
import { FoodIntakeChart } from './charts/food-intake-chart'
import { StepsChart } from './charts/steps-chart'
import { ActiveMinutesChart } from './charts/active-minutes-chart'
import { CaloriesBurnedChart } from './charts/calories-burned-chart'
import { WeightChart } from './charts/weight-chart'

export function ReportTab() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')

  const periodOptions = [
    {
      label: 'Daily',
      value: 'daily',
      icon: "Filter by:"
    },
    {
      label: 'Weekly',
      value: 'weekly',
      icon: "Filter by:"
    },
    {
      label: 'Monthly',
      value: 'monthly',
      icon: "Filter by:"
    },
  ]

  return (
    <div className="p-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
        <div className="flex items-center space-x-2">
          <DropdownButton
            options={periodOptions}
            value={selectedPeriod}
            onSelect={(option) => setSelectedPeriod(option.value)}
            variant="primary"
            size="xs"
            className="min-w-[100px]"
          />
        </div>
      </div>
      
      <div className="w-full h-0.5 bg-gray-200"></div>

      {/* First row - Blood Pressure and Heart Rate */}
      <div className="grid grid-cols-2 gap-4">
        <BloodPressureChart />
        <HeartRateChart />
      </div>

      {/* Second row - Blood Glucose and Food Intake */}
      <div className="grid grid-cols-2 gap-4">
        <BloodGlucoseChart />
        <FoodIntakeChart />
      </div>

      {/* Third row - Activity and Sleep Hours */}
      <div className="grid grid-cols-2 gap-4">
        <StepsChart />
        <ActiveMinutesChart />
      </div>

      {/* Fourth row - Stress Level and Hydration */}
      <div className="grid grid-cols-2 gap-4">
        <CaloriesBurnedChart />
        <WeightChart />
      </div>
    </div>
  )
}
