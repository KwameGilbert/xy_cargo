import React, { useState, useEffect } from "react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";
import { Send, Bell, Paperclip } from "lucide-react";
import axios from "axios";

const WarehouseBulkUpdatePage = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "all",
    userIds: "",
    file: null,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    // Fetch recent updates
    const fetchRecentUpdates = async () => {
      try {
        const res = await axios.get("/data/notifications.json");
        setRecentUpdates(res.data || []);
      } catch (error) {
        console.error("Error fetching recent updates:", error);
      }
    };

    fetchRecentUpdates();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ title: "", message: "", audience: "all", userIds: "", file: null });
    }, 1200);
  };

  return (
    <WarehouseLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">
              Bulk Updates & Notifications
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Send Update</h2>
            {sent && (
              <div className="bg-green-50 border border-green-200 rounded p-4 text-green-700 mb-4">
                Update sent successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter update title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Write your update or notification here"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audience
                </label>
                <select
                  name="audience"
                  value={form.audience}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Users</option>
                  <option value="clients">Clients Only</option>
                  <option value="warehouse">Warehouse Staff Only</option>
                  <option value="custom">Specific Users</option>
                </select>
              </div>
              {form.audience === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="userIds"
                    value={form.userIds}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter user IDs (e.g., 123, 456, 789)"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (optional)
                </label>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <Paperclip className="w-4 h-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600">Attach file</span>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  {form.file && (
                    <span className="ml-3 text-xs text-gray-500">
                      {form.file.name}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Sending..." : "Send Update"}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Updates</h2>
            {recentUpdates.length === 0 ? (
              <div className="text-gray-500 text-sm">No recent updates found.</div>
            ) : (
              <ul className="space-y-4">
                {recentUpdates.map((update, idx) => (
                  <li key={idx} className="border-b pb-4">
                    <div className="font-medium text-gray-900">{update.title}</div>
                    <div className="text-sm text-gray-600">{update.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{update.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseBulkUpdatePage;