import React from 'react';
import { Clock, CheckCircle, MapPin } from 'lucide-react';

const ShipmentStatusTimeline = ({ statusHistory = [] }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {statusHistory.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== statusHistory.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white 
                    ${event.type === 'status' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                    {event.type === 'status' ? (
                      <Clock className="h-4 w-4 text-white" />
                    ) : event.type === 'location' ? (
                      <MapPin className="h-4 w-4 text-white" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-800">{event.description}</p>
                    {event.location && (
                      <p className="text-sm text-gray-500">{event.location}</p>
                    )}
                    {event.notes && (
                      <p className="mt-1 text-sm text-gray-500">{event.notes}</p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.timestamp}>
                      {new Date(event.timestamp).toLocaleString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentStatusTimeline;