import { PlusIcon, Search, FileText, MessageCircle } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
      <div className="p-4 flex flex-col space-y-3">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium flex justify-center items-center">
          <PlusIcon className="w-4 h-4 mr-2" />
          Create New Shipment
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-200 flex justify-center items-center">
          <Search className="w-4 h-4 mr-2" />
          Track Package
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-200 flex justify-center items-center">
          <FileText className="w-4 h-4 mr-2" />
          View Invoices
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-200 flex justify-center items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
