import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  FileText,
  Clock,
  Users,
  Settings,
  Save,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';

// Mock data for notification settings
const mockNotificationSettings = {
  email: {
    enabled: true,
    templates: {
      shipmentCreated: true,
      shipmentUpdated: true,
      shipmentDelivered: true,
      paymentReceived: true,
      paymentFailed: false,
      supportTicket: true,
      systemAlerts: true
    },
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      username: 'noreply@xy-cargo.com',
      password: '••••••••'
    }
  },
  sms: {
    enabled: true,
    provider: 'Twilio',
    templates: {
      shipmentDelivered: true,
      paymentFailed: true,
      urgentAlerts: true
    },
    apiKey: '••••••••••••••••••••••••••••••••'
  },
  push: {
    enabled: true,
    platforms: {
      web: true,
      mobile: false,
      desktop: true
    },
    templates: {
      shipmentUpdates: true,
      systemAlerts: true,
      marketing: false
    }
  },
  schedules: {
    businessHours: {
      enabled: true,
      start: '08:00',
      end: '18:00',
      timezone: 'CAT'
    },
    weekends: {
      enabled: false,
      urgentOnly: true
    },
    holidays: {
      enabled: false,
      urgentOnly: true
    }
  },
  userPreferences: {
    allowMarketing: false,
    frequency: 'immediate', // immediate, daily, weekly
    categories: {
      shipments: true,
      payments: true,
      support: true,
      system: true
    }
  }
};

const AdminNotificationsSettingsPage = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleToggle = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleNestedToggle = (category, subCategory, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [key]: value
        }
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
    // TODO: Implement save functionality
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-red-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const NotificationCard = ({ icon: Icon, title, description, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-red-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
            <p className="text-gray-600 mt-1">Configure email, SMS, and push notification preferences</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Email Notifications</p>
                <p className="text-lg font-bold text-gray-900">{settings.email.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SMS Notifications</p>
                <p className="text-lg font-bold text-gray-900">{settings.sms.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Push Notifications</p>
                <p className="text-lg font-bold text-gray-900">{settings.push.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-lg font-bold text-gray-900">
                  {Object.values(settings.email.templates).filter(Boolean).length +
                   Object.values(settings.sms.templates).filter(Boolean).length +
                   Object.values(settings.push.templates).filter(Boolean).length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'email', label: 'Email Settings', icon: Mail },
                { id: 'sms', label: 'SMS Settings', icon: MessageSquare },
                { id: 'push', label: 'Push Notifications', icon: Smartphone },
                { id: 'schedule', label: 'Notification Schedule', icon: Clock },
                { id: 'preferences', label: 'User Preferences', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <NotificationCard
                  icon={Mail}
                  title="Email Notifications"
                  description="Configure email notification settings and templates"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable Email Notifications</h4>
                        <p className="text-sm text-gray-500">Send automated email notifications to users</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.email.enabled}
                        onChange={(value) => handleToggle('email', 'enabled', value)}
                      />
                    </div>

                    {settings.email.enabled && (
                      <>
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Templates</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(settings.email.templates).map(([key, enabled]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <ToggleSwitch
                                  enabled={enabled}
                                  onChange={(value) => handleNestedToggle('email', 'templates', key, value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">SMTP Configuration</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                              <input
                                type="text"
                                value={settings.email.smtp.host}
                                onChange={(e) => handleNestedToggle('email', 'smtp', 'host', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
                              <input
                                type="number"
                                value={settings.email.smtp.port}
                                onChange={(e) => handleNestedToggle('email', 'smtp', 'port', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                              <input
                                type="text"
                                value={settings.email.smtp.username}
                                onChange={(e) => handleNestedToggle('email', 'smtp', 'username', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={settings.email.smtp.password}
                                  onChange={(e) => handleNestedToggle('email', 'smtp', 'password', e.target.value)}
                                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </NotificationCard>
              </div>
            )}

            {/* SMS Settings */}
            {activeTab === 'sms' && (
              <div className="space-y-6">
                <NotificationCard
                  icon={MessageSquare}
                  title="SMS Notifications"
                  description="Configure SMS notification settings and provider"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable SMS Notifications</h4>
                        <p className="text-sm text-gray-500">Send SMS notifications for critical updates</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.sms.enabled}
                        onChange={(value) => handleToggle('sms', 'enabled', value)}
                      />
                    </div>

                    {settings.sms.enabled && (
                      <>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider</label>
                              <select
                                value={settings.sms.provider}
                                onChange={(e) => handleToggle('sms', 'provider', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              >
                                <option value="Twilio">Twilio</option>
                                <option value="AWS SNS">AWS SNS</option>
                                <option value="MessageBird">MessageBird</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                              <div className="relative">
                                <input
                                  type={showApiKey ? 'text' : 'password'}
                                  value={settings.sms.apiKey}
                                  onChange={(e) => handleToggle('sms', 'apiKey', e.target.value)}
                                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowApiKey(!showApiKey)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showApiKey ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">SMS Templates</h4>
                          <div className="space-y-3">
                            {Object.entries(settings.sms.templates).map(([key, enabled]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <ToggleSwitch
                                  enabled={enabled}
                                  onChange={(value) => handleNestedToggle('sms', 'templates', key, value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </NotificationCard>
              </div>
            )}

            {/* Push Notifications */}
            {activeTab === 'push' && (
              <div className="space-y-6">
                <NotificationCard
                  icon={Smartphone}
                  title="Push Notifications"
                  description="Configure push notification settings for web and mobile"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable Push Notifications</h4>
                        <p className="text-sm text-gray-500">Send push notifications to users' devices</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.push.enabled}
                        onChange={(value) => handleToggle('push', 'enabled', value)}
                      />
                    </div>

                    {settings.push.enabled && (
                      <>
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Platforms</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(settings.push.platforms).map(([platform, enabled]) => (
                              <div key={platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <span className="text-sm font-medium text-gray-700 capitalize">{platform}</span>
                                <ToggleSwitch
                                  enabled={enabled}
                                  onChange={(value) => handleNestedToggle('push', 'platforms', platform, value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Push Templates</h4>
                          <div className="space-y-3">
                            {Object.entries(settings.push.templates).map(([key, enabled]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <ToggleSwitch
                                  enabled={enabled}
                                  onChange={(value) => handleNestedToggle('push', 'templates', key, value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </NotificationCard>
              </div>
            )}

            {/* Notification Schedule */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <NotificationCard
                  icon={Clock}
                  title="Notification Schedule"
                  description="Configure when notifications should be sent"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Business Hours</h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-700">Enable business hours scheduling</span>
                        <ToggleSwitch
                          enabled={settings.schedules.businessHours.enabled}
                          onChange={(value) => handleNestedToggle('schedules', 'businessHours', 'enabled', value)}
                        />
                      </div>
                      {settings.schedules.businessHours.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                              type="time"
                              value={settings.schedules.businessHours.start}
                              onChange={(e) => handleNestedToggle('schedules', 'businessHours', 'start', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <input
                              type="time"
                              value={settings.schedules.businessHours.end}
                              onChange={(e) => handleNestedToggle('schedules', 'businessHours', 'end', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                            <select
                              value={settings.schedules.businessHours.timezone}
                              onChange={(e) => handleNestedToggle('schedules', 'businessHours', 'timezone', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                              <option value="CAT">CAT (UTC+2)</option>
                              <option value="EAT">EAT (UTC+3)</option>
                              <option value="WAT">WAT (UTC+1)</option>
                              <option value="SAST">SAST (UTC+2)</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Special Schedules</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'weekends', label: 'Weekend Notifications' },
                          { key: 'holidays', label: 'Holiday Notifications' }
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium text-gray-700">{label}</span>
                              <p className="text-xs text-gray-500">Send only urgent notifications</p>
                            </div>
                            <ToggleSwitch
                              enabled={settings.schedules[key].enabled}
                              onChange={(value) => handleNestedToggle('schedules', key, 'enabled', value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </NotificationCard>
              </div>
            )}

            {/* User Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <NotificationCard
                  icon={Users}
                  title="User Preferences"
                  description="Configure default notification preferences for users"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Marketing Communications</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700">Allow marketing notifications</span>
                          <p className="text-xs text-gray-500">Promotional emails and updates</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.userPreferences.allowMarketing}
                          onChange={(value) => handleNestedToggle('userPreferences', 'allowMarketing', value)}
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Frequency</h4>
                      <div className="space-y-2">
                        {[
                          { value: 'immediate', label: 'Immediate', desc: 'Send notifications as they happen' },
                          { value: 'daily', label: 'Daily Digest', desc: 'Group notifications into daily summaries' },
                          { value: 'weekly', label: 'Weekly Digest', desc: 'Group notifications into weekly summaries' }
                        ].map(({ value, label, desc }) => (
                          <div key={value} className="flex items-center">
                            <input
                              type="radio"
                              name="frequency"
                              value={value}
                              checked={settings.userPreferences.frequency === value}
                              onChange={(e) => handleNestedToggle('userPreferences', 'frequency', e.target.value)}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                            <div className="ml-3">
                              <span className="text-sm font-medium text-gray-700">{label}</span>
                              <p className="text-xs text-gray-500">{desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Categories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(settings.userPreferences.categories).map(([category, enabled]) => (
                          <div key={category} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                            <ToggleSwitch
                              enabled={enabled}
                              onChange={(value) => handleNestedToggle('userPreferences', 'categories', category, value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </NotificationCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsSettingsPage;