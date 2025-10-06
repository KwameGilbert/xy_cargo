import React, { useState, useEffect } from "react";
import { Send, Bell, Paperclip, X, CheckCircle, Users, Building, User } from "lucide-react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";

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
  const [recentUpdates, setRecentUpdates] = useState([
    { title: "System Maintenance", message: "Scheduled maintenance on Sunday 2AM-4AM", date: "Oct 5, 2025", audience: "all" },
    { title: "New Inventory Process", message: "Updated procedures for stock checking", date: "Oct 3, 2025", audience: "warehouse" },
    { title: "Holiday Schedule", message: "Office closed on October 20th", date: "Oct 1, 2025", audience: "all" }
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, file: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ title: "", message: "", audience: "all", userIds: "", file: null });
      
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const getAudienceIcon = (audience) => {
    switch(audience) {
      case "all": return <Users className="w-4 h-4" />;
      case "warehouse": return <Building className="w-4 h-4" />;
      case "clients": return <User className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getAudienceBadge = (audience) => {
    const badges = {
      all: "bg-blue-100 text-blue-700",
      warehouse: "bg-purple-100 text-purple-700",
      clients: "bg-green-100 text-green-700"
    };  
    return badges[audience] || badges.all;
  };

  return (
    <WarehouseLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Bulk Updates & Notifications
              </h1>
            </div>
            <p className="text-gray-600 ml-14">Send updates and announcements to users</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200">
                  <h2 className="text-lg font-semibold text-gray-900">Compose Update</h2>
                </div>
                
                <div className="p-6">
                  {sent && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">Update sent successfully!</p>
                        <p className="text-sm text-green-700 mt-1">Your notification has been delivered to the selected audience.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter update title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        placeholder="Write your update or notification here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Audience
                      </label>
                      <select
                        name="audience"
                        value={form.audience}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="all">All Users</option>
                        <option value="clients">Clients Only</option>
                        <option value="warehouse">Warehouse Staff Only</option>
                        <option value="custom">Specific Users</option>
                      </select>
                    </div>

                    {form.audience === "custom" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          User IDs (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="userIds"
                          value={form.userIds}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          placeholder="e.g., 123, 456, 789"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attachment (optional)
                      </label>
                      {form.file ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{form.file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-red-50 transition-all group">
                          <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                          <span className="text-sm text-gray-600 group-hover:text-red-600 transition-colors">
                            Click to attach file
                          </span>
                          <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={sending}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md font-medium"
                      >
                        <Send className="w-5 h-5" />
                        {sending ? "Sending..." : "Send Update"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
                </div>
                
                <div className="p-4 max-h-96 overflow-y-auto">
                  {recentUpdates.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No recent updates</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {recentUpdates.map((update, idx) => (
                        <li 
                          key={idx} 
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-red-200 transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors flex-1">
                              {update.title}
                            </h3>
                            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getAudienceBadge(update.audience)}`}>
                              {getAudienceIcon(update.audience)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {update.message}
                          </p>
                          <p className="text-xs text-gray-400">{update.date}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseBulkUpdatePage;