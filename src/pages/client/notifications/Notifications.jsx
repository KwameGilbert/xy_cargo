import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/data/notifications.json');
        console.log('Fetched notifications data:', response.data); // Log the data for debugging
        setNotifications(Array.isArray(response.data) ? response.data : []); // Ensure notifications is an array
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
        <div className="grid grid-cols-1 gap-4">
          {notifications.map((notification, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`icon-${notification.icon} text-lg mr-2`}></span>
                  <h2 className="text-lg font-semibold">{notification.type}</h2>
                </div>
                <span className={`priority-${notification.priority}`}>{notification.priority}</span>
              </div>
              <p className="text-gray-600 mt-2">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-1">{notification.date}</p>
            </div>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Notifications;