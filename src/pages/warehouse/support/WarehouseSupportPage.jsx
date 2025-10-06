import React, { useState } from "react";
import { Send, HelpCircle, Paperclip, X, CheckCircle, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";

const faqs = [
  {
    question: "How do I update shipment status?",
    answer: "Go to the Shipments page, select a shipment, and use the 'Update Status' button.",
    category: "Shipments"
  },
  {
    question: "How do I print a manifest?",
    answer: "Select the shipments you want to include and click 'Print Manifest' at the top of the table.",
    category: "Shipments"
  },
  {
    question: "Who do I contact for urgent warehouse issues?",
    answer: "Use this support form or call the warehouse manager directly for urgent matters.",
    category: "General"
  },
  {
    question: "How do I check inventory levels?",
    answer: "Navigate to the Inventory page where you can view real-time stock levels and filter by product categories.",
    category: "Inventory"
  },
  {
    question: "What are the warehouse operating hours?",
    answer: "The warehouse operates Monday-Friday 6AM-8PM, and Saturday 8AM-4PM. Closed on Sundays and public holidays.",
    category: "General"
  }
];

const WarehouseSupportPage = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
    file: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, file: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ subject: "", message: "", priority: "medium", file: null });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <WarehouseLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Warehouse Support
                </h1>
            </div>
            <p className="text-gray-600 ml-14">Get help with warehouse operations and technical issues</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">For urgent matters</p>
                <p className="text-lg font-semibold text-gray-900">+233 XX XXX XXXX</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">General inquiries</p>
                <p className="text-sm font-semibold text-gray-900">support@warehouse.com</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Response Time</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Average reply time</p>
                <p className="text-lg font-semibold text-gray-900">2-4 hours</p>
            </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200">
                    <h2 className="text-lg font-semibold text-gray-900">Submit Support Request</h2>
                </div>
                
                <div className="p-6">
                    {submitted && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                        <p className="font-medium text-green-900">Support request submitted!</p>
                        <p className="text-sm text-green-700 mt-1">Our team will respond within 2-4 hours.</p>
                        </div>
                    </div>
                    )}

                    <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                        </label>
                        <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Brief description of your issue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                        </label>
                        <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                        >
                        <option value="low">Low - General question</option>
                        <option value="medium">Medium - Issue affecting work</option>
                        <option value="high">High - Critical issue</option>
                        </select>
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
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        placeholder="Describe your issue or question in detail..."
                        />
                    </div>

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
                            Attach screenshot or file
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
                        disabled={submitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md font-medium"
                        >
                        <Send className="w-5 h-5" />
                        {submitting ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Help</h2>
                </div>
                
                <div className="p-4">
                    <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                        <div 
                        key={idx}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:border-red-200 transition-colors"
                        >
                        <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-1 pr-2">
                            <div className="text-xs font-medium text-red-600 mb-1">{faq.category}</div>
                            <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                            </div>
                            <ChevronDown 
                            className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                                expandedFaq === idx ? 'rotate-180' : ''
                            }`}
                            />
                        </button>
                        {expandedFaq === idx && (
                            <div className="px-4 pb-4 pt-0 text-sm text-gray-600 border-t border-gray-100 bg-gray-50">
                            <p className="pt-3">{faq.answer}</p>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium mb-1">Need more help?</p>
                    <p className="text-xs text-blue-700">Check our full documentation or contact support directly.</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </WarehouseLayout>
  );
};

export default WarehouseSupportPage;