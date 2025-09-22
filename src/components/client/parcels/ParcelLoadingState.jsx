import React from 'react';

const ParcelLoadingState = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Table Header Skeleton */}
      <div className="px-4 py-2.5 bg-gray-50 border-b">
        <div className="grid grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-3.5 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Table Rows Skeleton */}
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="grid grid-cols-7 gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2.5 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3.5 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3.5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-7 w-14 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelLoadingState;