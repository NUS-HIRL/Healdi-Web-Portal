'use client'

import { useState } from 'react'
import { Home, Users, FileText, Calendar, Settings, LogOut } from 'lucide-react'

// TODO: Replace with actual paths to your icons
export function Sidebar() {
  const [selectedTab, setSelectedTab] = useState('users')

  const navigationItems = [
    { id: 'home', icon: Home, href: '#' },
    { id: 'users', icon: Users, href: '#' },
    { id: 'reports', icon: FileText, href: '#' },
    { id: 'calendar', icon: Calendar, href: '#' },
    { id: 'settings', icon: Settings, href: '#' },
  ]
  return (
    <div className="w-20 bg-[#FFD792] border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isSelected = selectedTab === item.id
            
            return (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  onClick={() => setSelectedTab(item.id)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isSelected 
                      ? 'bg-[#B58A4126] font-medium' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
