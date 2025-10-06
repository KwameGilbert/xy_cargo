import React, { useEffect, useState } from "react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";
import { Bell } from "lucide-react";
import axios from "axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/data/notifications.json");
        setNotifications(res.data || []);
      } catch (error) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <WarehouseLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">No notifications found.</div>
            ) : (
              notifications.map((note, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Bell className="w-5 h-5 text-red-500 mt-1" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">{note.title}</div>
                      <div className="text-sm text-gray-600">{note.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{note.date}</div>
                    </div>
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