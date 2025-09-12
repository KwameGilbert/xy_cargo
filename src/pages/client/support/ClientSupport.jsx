import React, { useState } from 'react';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import { Phone, Mail, MessageCircle, AlertTriangle } from 'lucide-react';

const supportStats = [
  { label: 'Active Tickets', value: 1 },
  { label: 'Resolved This Month', value: 2 },
  { label: 'Avg Response Time', value: '2.5 hrs', highlight: true },
  { label: 'Satisfaction Rate', value: '98%', highlight: true },
];

const tickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Package delivery delay inquiry',
    category: 'Shipping',
    created: '2024-01-15',
    updated: '2024-01-16',
    replies: 3,
    status: 'IN PROGRESS',
    priority: 'HIGH',
  },
  {
    id: 'TKT-2024-002',
    subject: 'Billing discrepancy for invoice INV-2024-001',
    category: 'Billing',
    created: '2024-01-12',
    updated: '2024-01-14',
    replies: 5,
    status: 'RESOLVED',
    priority: 'MEDIUM',
  },
];

const faqs = [
  { q: 'How long does shipping typically take?', a: '', category: 'Shipping' },
  { q: 'How can I track my package?', a: '', category: 'Shipping' },
  { q: 'What is package consolidation?', a: '', category: 'Services' },
  { q: 'How do I update my billing information?', a: '', category: 'Billing' },
  { q: 'What should I do if my package is damaged?', a: '', category: 'Claims' },
];

const ClientSupport = () => {
  const [tab, setTab] = useState('tickets');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <ClientLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
          <p className="text-gray-600 mb-6">Get help with your shipments, billing, or account questions.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {supportStats.map((stat, i) => (
              <div key={i} className={`bg-white rounded-lg shadow-sm p-4 text-center ${stat.highlight ? 'text-red-600 font-bold' : ''}`}>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-6">
            {['tickets', 'create', 'faq', 'contact'].map(tabName => (
              <button
                key={tabName}
                className={`px-4 py-2 rounded-md border ${tab === tabName ? 'bg-red-50 text-red-600 border-red-100' : 'text-gray-600 border-gray-200'}`}
                onClick={() => { setTab(tabName); setShowCreate(false); }}
              >
                {tabName === 'tickets' ? 'My Tickets' :
                 tabName === 'create' ? 'Create Ticket' :
                 tabName === 'faq' ? 'FAQ' : 'Contact Info'}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          {tab === 'tickets' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Support Tickets</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => setTab('create')}>+ New Ticket</button>
              </div>
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-gray-900">{ticket.subject}</div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : ticket.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{ticket.status}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{ticket.priority}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-gray-500 mb-2">
                      <div>Category<br /><span className="font-medium text-gray-700">{ticket.category}</span></div>
                      <div>Created<br /><span className="font-medium text-gray-700">{ticket.created}</span></div>
                      <div>Last Updated<br /><span className="font-medium text-gray-700">{ticket.updated}</span></div>
                      <div>Messages<br /><span className="font-medium text-gray-700">{ticket.replies} replies</span></div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm">View Conversation</button>
                      {ticket.status !== 'RESOLVED' && <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">Close Ticket</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'create' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Create Support Ticket</h2>
              <form className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Brief description of your issue" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>General Inquiry</option>
                      <option>Shipping</option>
                      <option>Billing</option>
                      <option>Claims</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Medium</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Related Shipment ID (Optional)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. LS2024001 or TR001234567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-md px-3 py-2" rows={4} placeholder="Please provide detailed information about your issue..." />
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">Submit Ticket</button>
                  <button type="button" className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md">Cancel</button>
                </div>
              </form>
            </div>
          )}
          {tab === 'faq' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 py-3">
                    <div className="font-medium text-gray-900 flex items-center justify-between cursor-pointer">
                      {faq.q}
                      <span className="text-xs text-gray-400">{faq.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4" /> <span>+1 (800) 555-0123</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4" /> <span>support@logisticspro.com</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><MessageCircle className="w-4 h-4" /> <span>Live Chat <span className="text-xs text-green-600 ml-1">Available 24/7</span></span></div>
                  <button className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm mt-2">Start Chat</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-red-700 font-semibold"><AlertTriangle className="w-4 h-4" /> Urgent Issues</div>
                  <div className="text-sm text-red-700 mt-1">For critical shipment issues, damaged packages, or security concerns:</div>
                  <div className="text-sm text-red-700 mt-1">Emergency Hotline: +1 (800) 555-HELP</div>
                  <div className="text-xs text-red-500 mt-1">Available 24/7 for urgent matters</div>
                </div>
                <div className="text-sm text-gray-700 mb-2 font-semibold">Business Hours</div>
                <div className="text-xs text-gray-500">
                  <div>Monday - Friday: 8:00 AM - 8:00 PM EST</div>
                  <div>Saturday: 9:00 AM - 5:00 PM EST</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientSupport;
