import React, { useEffect, useState } from "react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";
import { Bell, Clock, Dot } from "lucide-react"; // Import Dot for a visual unread indicator
import axios from "axios";

// Helper function to format the date/time for a modern look
const formatNotificationDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // A simple way to show 'X hours ago' or a full date
  const diffInHours = Math.abs(now - date) / 36e5;
  if (diffInHours < 24) {
    return `${Math.round(diffInHours)} hours ago`;
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Mocking 'read' status for enhanced UI ---
  // In a real app, this would come from the API
  const [markedNotifications, setMarkedNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mock data to include an 'isRead' status for visual enhancement
        const mockData = [
          { id: 1, title: "Urgent: Low Stock on Item A", message: "Item A is below the reorder point. Immediate action required.", date: "2025-10-06T10:00:00Z", type: "urgent", isRead: false },
          { id: 2, title: "New Shipment Arrived", message: "Shipment #SHP-4521 has been successfully received and is ready for putaway.", date: "2025-10-06T09:30:00Z", type: "success", isRead: false },
          { id: 3, title: "System Update Complete", message: "Warehouse management system update finished. New features are available.", date: "2025-10-05T16:45:00Z", type: "info", isRead: true },
          { id: 4, title: "Zone B Power Outage", message: "Temporary power failure in Zone B. All automated processes are paused.", date: "2025-10-04T11:20:00Z", type: "warning", isRead: true },
        ];
        // The real API call would look like this:
        // const res = await axios.get("/data/notifications.json");
        // setNotifications(res.data || []);
        
        setNotifications(mockData);
        setMarkedNotifications(mockData.map(n => ({...n, date: formatNotificationDate(n.date)})));

      } catch (error) {
        setNotifications([]);
        setMarkedNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Handler to simulate marking a notification as read
  const markAsRead = (id) => {
    setMarkedNotifications(prev => 
      prev.map(note => note.id === id ? { ...note, isRead: true } : note)
    );
  };

  // --- Component logic for a 'Mark All Read' button ---
  const unreadCount = markedNotifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setMarkedNotifications(prev => prev.map(note => ({ ...note, isRead: true })));
  };


  // --- Helper to get icon/color based on notification type for better visual parsing ---
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <Bell className="w-5 h-5 text-red-600" />;
      case 'success':
        return <Dot className="w-5 h-5 text-green-500 fill-current" />; // Dot icon or Check
      case 'warning':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <WarehouseLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300">
            <div className="flex items-center">
              <Bell className="w-7 h-7 text-red-600 mr-3" /> {/* Larger icon */}
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {unreadCount} New
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150"
              >
                Mark All as Read
              </button>
            )}
          </div>
          {/* End Header */}

          <div className="bg-white rounded-xl shadow-xl divide-y divide-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-lg text-gray-500">
                <Clock className="w-6 h-6 animate-spin inline-block mr-2" />
                Loading notifications...
              </div>
            ) : markedNotifications.length === 0 ? (
              <div className="p-10 text-center text-lg text-gray-500">
                No notifications found. You're all caught up!
              </div>
            ) : (
              markedNotifications.map((note) => (
                <div
                  // Added a conditional class for unread status and better hover effect
                  key={note.id}
                  onClick={() => markAsRead(note.id)} 
                  className={`
                    p-5 flex items-start space-x-4 cursor-pointer transition duration-200 ease-in-out
                    ${note.isRead ? 'bg-white hover:bg-gray-50' : 'bg-red-50 hover:bg-red-100 border-l-4 border-red-500'}
                  `}
                >
                  {/* Left-side Icon for Type */}
                  <div className="flex-shrink-0 pt-1">
                    {getNotificationIcon(note.type)}
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-base font-semibold ${note.isRead ? 'text-gray-900' : 'text-red-700'}`}>
                      {note.title}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {note.message}
                    </p>
                  </div>

                  {/* Right-side Time/Date */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {note.date}
                    </div>
                    {/* Visual indicator for unread */}
                    {!note.isRead && (
                       <div className="mt-2 text-xs font-semibold text-red-600">NEW</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default NotificationPage;