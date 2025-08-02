'use client'

import { useState } from 'react'
import { Calendar, Clock, BarChart3 } from 'lucide-react'
import { DropdownButton } from '../../common/dropdown-button'
import { BloodPressureChart } from './charts/blood-pressure-chart'
import { HeartRateChart } from './charts/heart-rate-chart'
import { BloodGlucoseChart } from './charts/blood-glucose-chart'
import { FoodIntakeChart } from './charts/food-intake-chart'
import { ActivityChart } from './charts/activity-chart'
import { SleepHoursChart } from './charts/sleep-hours-chart'
import { StressLevelChart } from './charts/stress-level-chart'
import { HydrationChart } from './charts/hydration-chart'

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

      {/* Second row - Blood Glucose, Food Intake, Activity, Sleep Hours */}
      <div className="grid grid-cols-4 gap-4">
        <BloodGlucoseChart />
        <FoodIntakeChart />
        <ActivityChart />
        <SleepHoursChart />
      </div>

      {/* Third row - Stress Level, Hydration and tables */}
      <div className="grid grid-cols-4 gap-4">
        <StressLevelChart />
        <HydrationChart />
      </div>
    </div>
  )
}
