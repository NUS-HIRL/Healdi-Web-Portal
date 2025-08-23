import { Search, Bell } from 'lucide-react'

interface PatientHeaderProps {
  patientId: string
}

// TODO: Replace with the actual figma design
export const PatientHeader = ({ patientId }: PatientHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Patient info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">L</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Landon Smith</h1>
            <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
          </div>
        </div>

        {/* Right side - Search and notifications */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  )
}
