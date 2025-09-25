import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            ⚡ Solar Wire Map
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional solar installation wire mapping and configuration tool
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get Started
          </h2>
          <p className="text-gray-600 mb-6">
            Design your solar installation system with our comprehensive configurator tool.
            Generate detailed wire maps, calculate costs, and optimize your solar setup.
          </p>

          <Link
            href="/configurator"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Launch Configurator →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-medium text-gray-800">System Configuration</h3>
            <p className="text-gray-600">Configure panels, inverters, and storage</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-medium text-gray-800">Cost Estimation</h3>
            <p className="text-gray-600">Real-time cost calculations</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🗺️</div>
            <h3 className="font-medium text-gray-800">Wire Mapping</h3>
            <p className="text-gray-600">Generate detailed installation maps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
