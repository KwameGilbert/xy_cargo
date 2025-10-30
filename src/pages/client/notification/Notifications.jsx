import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import { getAuthHeader, getApiBaseUrl } from "../../../services/client/authService";
import { useToast } from "../../../contexts/ToastContext";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmColor = "red" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                confirmColor === 'red'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, notification: null });
  const { success, error: showError } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setError(null);
        setLoading(true);

        const baseUrl = getApiBaseUrl();
        const response = await axios.get(`${baseUrl}/clients/notifications/data`, {
          headers: getAuthHeader()
        });

        const data = response.data?.data || {};
        setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
        setUnreadCount(data.unread_count || 0);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const baseUrl = getApiBaseUrl();
      await axios.patch(`${baseUrl}/clients/notifications/${notificationId}/read`, {}, {
        headers: getAuthHeader()
      });

      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.notification_id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      success("Notification marked as read");
    } catch (err) {
      console.error('Error marking notification as read:', err);
      showError("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const baseUrl = getApiBaseUrl();
      await axios.patch(`${baseUrl}/clients/notifications/mark-all-read`, {}, {
        headers: getAuthHeader()
      });

      // Update local state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true }))
      );
      setUnreadCount(0);
      success("All notifications marked as read");
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      showError("Failed to mark all notifications as read");
    }
  };

  const handleDelete = (notification) => {
    setDeleteModal({ isOpen: true, notification });
  };

  const confirmDelete = async () => {
    if (!deleteModal.notification) return;

    try {
      const baseUrl = getApiBaseUrl();
      await axios.delete(`${baseUrl}/clients/notifications/${deleteModal.notification.notification_id}`, {
        headers: getAuthHeader()
      });

      // Update local state
      setNotifications(prev =>
        prev.filter(notification => notification.notification_id !== deleteModal.notification.notification_id)
      );

      // Update unread count if the deleted notification was unread
      if (!deleteModal.notification.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }

      success("Notification deleted successfully");
      setDeleteModal({ isOpen: false, notification: null });
    } catch (err) {
      console.error('Error deleting notification:', err);
      showError("Failed to delete notification");
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  if (error) {
    return (
      <ClientLayout>
        <div className="p-4 bg-gray-50 min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Mark all unread notifications as read"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mark All Read
          </button>
        </div>
        
        <div className="flex space-x-4 mt-6 mb-6">
          <button className="px-4 py-2 bg-white rounded-md shadow-sm font-semibold" title="Show all notifications">
            All ({notifications.length})
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-600" title="Show only unread notifications">
            Unread ({unreadCount})
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-600" title="Show high priority notifications (urgent/alert)">
            High Priority ({notifications.filter(n => n.type === 'urgent' || n.type === 'alert').length})
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.notification_id} className="relative border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${notification.type === 'urgent' || notification.type === 'alert' ? 'bg-red-500' : notification.type === 'warning' ? 'bg-yellow-500' : ''}`}></div>
              <div className="p-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 rounded-full p-2 ${notification.icon === 'package' ? 'bg-blue-100' : 
                                notification.icon === 'dollar' ? 'bg-green-100' : 
                                notification.icon === 'check' ? 'bg-green-100' : 
                                notification.icon === 'alert' ? 'bg-red-100' : 'bg-gray-100'} mr-4`}>
                    {notification.icon === 'package' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                      </svg>
                    )}
                    {notification.icon === 'dollar' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {notification.icon === 'check' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {notification.icon === 'alert' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {(!notification.icon || notification.icon === 'bell') && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.558 4.558c.592-.592 1.522-.592 2.114 0l10.77 10.77c.592.592.592 1.522 0 2.114-.592.592-1.522.592-2.114 0L4.558 6.672c-.592-.592-.592-1.522 0-2.114z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">{notification.title || notification.type}</h2>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        notification.type === 'urgent' || notification.type === 'alert' ? 'bg-red-100 text-red-800' : 
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-400 mt-2">{new Date(notification.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleMarkAsRead(notification.notification_id)}
                    disabled={notification.is_read}
                    className="p-1 text-gray-400 hover:text-gray-600 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={notification.is_read ? "Already read" : "Mark as read"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(notification)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Delete notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, notification: null })}
        onConfirm={confirmDelete}
        title="Delete Notification"
        message={`Are you sure you want to delete this notification? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
      />
    </ClientLayout>
  );
};

export default Notifications;