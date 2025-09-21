import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, AlertTriangle, Clock, MapPin, Download, FileText, Phone, User, Home, Mail, X } from 'lucide-react';

const ParcelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch('/data/parcels.json');
        if (!res.ok) throw new Error('Failed to fetch parcel');
        const data = await res.json();
        const found = data.find(p => p.id === id);
        setParcel(found);
      } catch (err) {
        setError('Could not load parcel details.');
      } finally {
        setLoading(false);
      }
    };
    fetchParcel();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!parcel) return <div className="p-8 text-center text-gray-500">Parcel not found.</div>;

  const getStatusBadge = (status) => {
    const statusMap = {
      'AT_WAREHOUSE': { bg: 'bg-gray-100', text: 'text-gray-700', icon: Package },
      'IN_TRANSIT': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck },
      'DELIVERED': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'DELAYED': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
      'PROCESSING': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock }
    };
    const config = statusMap[status] || statusMap['AT_WAREHOUSE'];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-gray-700 flex items-center">
        <X className="h-5 w-5 mr-2" /> Back
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Parcel Details</h2>
          {getStatusBadge(parcel.status)}
        </div>
        <div className="mb-4">
          <div className="font-semibold">Waybill: {parcel.waybillNumber}</div>
          <div className="text-sm text-gray-500">{parcel.description}</div>
          <div className="text-sm text-gray-500">Origin: {parcel.origin}</div>
          <div className="text-sm text-gray-500">Destination: {parcel.destination}</div>
          <div className="text-sm text-gray-500">Weight: {parcel.weight} kg</div>
          <div className="text-sm text-gray-500">Cost: ${parcel.shippingCost.toFixed(2)}</div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Recipient</h4>
          <div className="flex flex-col gap-1">
            <span className="flex items-center text-sm"><User className="h-4 w-4 mr-2 text-gray-400" /> John Smith</span>
            <span className="flex items-center text-sm"><Phone className="h-4 w-4 mr-2 text-gray-400" /> +1 (555) 123-4567</span>
            <span className="flex items-center text-sm"><Mail className="h-4 w-4 mr-2 text-gray-400" /> john@example.com</span>
            <span className="flex items-center text-sm"><Home className="h-4 w-4 mr-2 text-gray-400" /> 123 Main St, New York, NY 10001</span>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Payment</h4>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${parcel.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {parcel.paymentStatus === 'PAID' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
            {parcel.paymentStatus}
          </span>
          {parcel.paymentStatus === 'UNPAID' && (
            <button className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">Pay Now</button>
          )}
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Tracking Timeline</h4>
          <div className="space-y-4">
            {parcel.trackingHistory && parcel.trackingHistory.length > 0 ? (
              parcel.trackingHistory.map((event, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${event.active ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    {idx < parcel.trackingHistory.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 ml-1.5"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm font-medium ${event.active ? 'text-red-700' : 'text-gray-700'}`}>{event.status}</p>
                        <p className="text-xs text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1"><MapPin className="h-3 w-3 mr-1" />{event.location}</p>
                      </div>
                      <div className="text-xs text-gray-500">{event.date}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No tracking information available yet.</div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"><Download className="h-4 w-4 mr-2" />Download Invoice</button>
          {parcel.status === 'DELAYED' && (<button className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 text-sm"><FileText className="h-4 w-4 mr-2" />Open Claim</button>)}
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"><Phone className="h-4 w-4 mr-2" />Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetailsPage;
