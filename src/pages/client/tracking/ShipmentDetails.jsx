import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import axios from 'axios';
import { ArrowLeft, Package, MapPin, Truck, Check, Clock, Calendar, Plane, Ship, Zap } from 'lucide-react';

// Status color mapping based on status text
const getStatusColor = (status) => {
  const statusMap = {
    'delivered': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-600' },
    'in transit': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-600' },
    'processing': { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-600' },
    'picked up': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-600' },
    'delayed': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-600' },
    'customs': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-600' },
    'pending': { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-600' },
  };
  
  const key = status?.toLowerCase() || 'pending';
  return statusMap[key] || statusMap.pending;
};

// Get shipping type icon and color
const getShippingTypeInfo = (type) => {
  const typeMap = {
    'air express': { icon: Zap, color: 'text-red-500', bg: 'bg-red-50' },
    'air': { icon: Plane, color: 'text-blue-500', bg: 'bg-blue-50' },
    'sea': { icon: Ship, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  };
  
  const key = type?.toLowerCase() || 'air';
  return typeMap[key] || typeMap.air;
};

const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await axios.get('/data/shipments.json');
        const data = res.data || [];
        const found = data.find(s => s.id === id || s.trackingNumber === id);
        setShipment(found || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShipment();
  }, [id]);

  if (!shipment) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading shipment details...</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  const totalItems = shipment.items.reduce((acc, it) => acc + it.qty, 0);
  const totalWeight = shipment.items.reduce((acc, it) => {
    const w = parseFloat((it.weight || '').replace(/[a-zA-Z\s]/g, '')) || 0;
    return acc + w;
  }, 0);

  const statusColor = getStatusColor(shipment.status);
  const shippingInfo = getShippingTypeInfo(shipment.shippingType);
  const ShippingIcon = shippingInfo.icon;
  
  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> 
                <span className="hidden sm:inline">Back</span>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Shipment Details</h1>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Package className="w-3.5 h-3.5" /> 
                  <span>{shipment.trackingNumber}</span>
                </div>
              </div>
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${statusColor.bg} ${statusColor.text} font-medium`}>
              {shipment.status === "Delivered" ? <Check className="w-4 h-4 mr-2" /> : 
               shipment.status === "In Transit" ? <Truck className="w-4 h-4 mr-2" /> :
               <Clock className="w-4 h-4 mr-2" />}
              {shipment.status}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Origin</div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="font-medium">{shipment.origin}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Destination</div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-medium">{shipment.destination}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Shipping Type</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${shippingInfo.bg} ${shippingInfo.color} font-medium text-sm`}>
                      <ShippingIcon className="w-4 h-4" />
                      {shipment.shippingType || 'Air'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Est. Delivery</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{shipment.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-red-500" />
                  Package Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Weight</div>
                    <div className="font-semibold">{shipment.packageDetails.weight}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Dimensions</div>
                    <div className="font-semibold text-sm">{shipment.packageDetails.dimensions}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Items</div>
                    <div className="font-semibold">{totalItems} pieces</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Shipping Cost</div>
                    <div className="font-semibold text-green-600">${shipment.shippingCost?.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Items ({totalItems})
                </h3>
                <div className="space-y-3">
                  {shipment.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="bg-white p-2 rounded-lg border">
                          <Package className={`w-6 h-6 ${i % 2 === 0 ? 'text-red-500' : 'text-orange-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{item.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-3">
                            <span>Qty: {item.qty}</span>
                            <span>Weight: {item.weight}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">each</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Tracking Timeline
                </h3>
                <div className="space-y-4">
                  {shipment.history.map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${event.active ? statusColor.dot : 'bg-gray-300'}`}></div>
                        {idx < shipment.history.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${event.active ? statusColor.dot : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className={`font-medium ${event.active ? statusColor.text : 'text-gray-700'}`}>
                            {event.status}
                          </div>
                          <div className="text-sm text-gray-500">{event.date}</div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {event.location}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Summary */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tracking</span>
                    <span className="font-medium text-sm bg-gray-100 px-2 py-1 rounded">{shipment.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Items</span>
                    <span className="font-medium">{totalItems}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium">{totalWeight.toFixed(2)} lbs</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-gray-500">Total Cost</span>
                    <span className="font-semibold text-green-600">${shipment.shippingCost?.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  Track Live
                </button>
              </div>

              {/* Support */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-500 mb-4">Contact our support team</p>
                <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2.5 px-4 rounded-lg transition-colors">
                  Contact Support
                </button>
                <div className="text-xs text-gray-400 mt-2">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ShipmentDetails;