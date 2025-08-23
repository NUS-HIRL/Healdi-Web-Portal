'use client'

import { useState } from 'react'
import { Home, Users, FileText, Calendar, Settings, LogOut } from 'lucide-react'
import Image from 'next/image'

// TODO: Replace with actual paths to your icons
export const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState('users')

  const navigationItems = [
    { id: 'home', icon: Home, href: '#' },
    { id: 'users', icon: Users, href: '/patient-info' },
    { id: 'reports', icon: FileText, href: '#' },
    { id: 'calendar', icon: Calendar, href: '#' },
    { id: 'settings', icon: Settings, href: '#' },
  ]
  return (
    <div className="w-20 bg-[#FFD792] border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-4">
          <Image
            src="/common/logo-healdi.svg"
            alt="Healdi logo"
            width={50}
            height={50}
          />
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
