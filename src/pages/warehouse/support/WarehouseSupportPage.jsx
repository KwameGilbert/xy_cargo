import React, { useState } from "react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";
import { Send, HelpCircle, Paperclip } from "lucide-react";

const faqs = [
  {
    question: "How do I update shipment status?",
    answer: "Go to the Shipments page, select a shipment, and use the 'Update Status' button."
  },
  {
    question: "How do I print a manifest?",
    answer: "Select the shipments you want to include and click 'Print Manifest' at the top of the table."
  },
  {
    question: "Who do I contact for urgent warehouse issues?",
    answer: "Use this support form or call the warehouse manager directly for urgent matters."
  }
];

const WarehouseSupportPage = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    file: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ subject: "", message: "", file: null });
    }, 1200);
  };

  return (
    <WarehouseLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <HelpCircle className="w-6 h-6 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Warehouse Support</h1>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Contact Support</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded p-4 text-green-700 mb-4">
                Your support request has been submitted!
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter subject"
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
                  placeholder="Describe your issue or question"
                />
              </div>
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
                    <span className="ml-3 text-xs text-gray-500">{form.file.name}</span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <ul className="space-y-4">
              {faqs.map((faq, idx) => (
                <li key={idx}>
                  <div className="font-medium text-gray-900">{faq.question}</div>
                  <div className="text-gray-600 text-sm">{faq.answer}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseSupportPage;    

