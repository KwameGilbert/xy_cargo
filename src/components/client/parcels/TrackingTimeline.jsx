import React from 'react';
import { 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  Truck, 
  Package, 
  AlertTriangle,
  XCircle
} from 'lucide-react';

const TrackingTimeline = ({ trackingHistory }) => {
  const getStatusIcon = (status) => {
    const statusMap = {
      'Picked Up': Package,
      'Processing': Clock,
      'In Transit': Truck,
      'Delivered': CheckCircle,
      'Delayed': AlertTriangle,
      'Customs': XCircle
    };
    
    const Icon = statusMap[status] || Clock;
    return Icon;
  };

  const getStatusColor = (status, isActive) => {
    if (isActive) {
      return 'text-red-600 bg-red-100';
    }
    
    const colorMap = {
      'Picked Up': 'text-blue-600 bg-blue-100',
      'Processing': 'text-yellow-600 bg-yellow-100',
      'In Transit': 'text-blue-600 bg-blue-100',
      'Delivered': 'text-green-600 bg-green-100',
      'Delayed': 'text-red-600 bg-red-100',
      'Customs': 'text-purple-600 bg-purple-100'
    };
    
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  };

  if (!trackingHistory || trackingHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tracking information available yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Tracking updates will appear here once your parcel is in transit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
      
      <div className="space-y-6">
        {trackingHistory.map((event, index) => {
          const Icon = getStatusIcon(event.status);
          const isLast = index === trackingHistory.length - 1;
          
          return (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-6 top-8 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className="flex items-start">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(event.status, event.active)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Event Details */}
                <div className="ml-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${
                        event.active ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {event.status}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      
                      {/* Location */}
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{event.location}</span>
                      </div>
                      
                      {/* Handler */}
                      {event.handler && (
                        <div className="flex items-center mt-1">
                          <User className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{event.handler}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Date */}
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Current Status Summary */}
      {trackingHistory.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-3 h-3 rounded-full ${
                trackingHistory[0].active ? 'bg-red-500' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Current Status: {trackingHistory[0].status}
              </p>
              <p className="text-sm text-gray-600">
                Last updated: {trackingHistory[0].date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingTimeline;