"use client"

export const SecurityTab = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Security</h2>
        <p className="text-gray-600 mb-8">
          View and manage your account security information.
        </p>

        <div className="divide-y divide-gray-200 space-y-0">
          <div className="grid grid-cols-3 items-center py-6 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Security Questions</h3>
                <p className="text-sm text-gray-500">Manage your security questions for enhanced account protection.</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-900">Last updated 14 Sep 2020</span>
            </div>
            <div className="text-right">
              <button className="bg-white text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Manage
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center py-6 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Log In Password</h3>
                <p className="text-sm text-gray-500">Manage your login password to safeguard your account.</p>
              </div>
            </div>
            <div className="text-center">
              {/* Placeholder value to maintain layout */}
              <span className="text-gray-900"></span>
            </div>
            <div className="text-right">
              <button className="bg-white text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Change
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center py-6 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Email Verification</h3>
                <p className="text-sm text-gray-500">Protect your account with email codes.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-900">an*****@domain.com</span>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="bg-white text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Change
              </button>
              <button className="bg-white text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-50 text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
