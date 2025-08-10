import Image from 'next/image'

export function Footer() {
  return (
          <>
        {/* Download App Section */}
        <div className="bg-white">
          <div className="flex mt-3 mb-3 bg-gray-100 rounded-lg p-6 border border-gray-200 mx-6">
            <div className="flex-1 items-center justify-center">
              <h2 className="text-xl font-bold text-gray-900">
                Download Healdi App
              </h2>
              <p className="text-gray-600">
                Harness the power of the Healdi app to enhance your health
                tracking journey.
              </p>
            </div>
            <div className="flex mt-3 mb-3 space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition-colors text-sm border border-gray-300">
                <Image
                  src="/common/apple-logo.svg"
                  alt="Healdi logo"
                  width={15}
                  height={15}
                />
                <span>App Store</span>
              </button>
              <button className="flex items-center space-x-2 bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition-colors text-sm border border-gray-300">
                <Image
                  src="/common/google-logo.svg"
                  alt="Healdi logo"
                  width={15}
                  height={15}
                />
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/common/logo-healdi.svg"
              alt="Healdi logo"
              width={30}
              height={30}
            />
            <Image
              src="/common/Healdi.svg"
              alt="Healdi logo"
              width={60}
              height={60}
            />
          </div>
          <div className="text-sm text-gray-500">
            © Healdi. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  )
} 