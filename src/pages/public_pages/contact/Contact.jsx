import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from "lucide-react";
// import SEO from "../../../components/public_pages/common/SEO/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      content: "+260 96 7379139",
      subtitle: "Zambia Office",
      action: "Call Now",
      href: "tel:+260967379139"
    },
    {
      icon: Phone,
      title: "WhatsApp Support",
      content: "+260 769 481 203",
      subtitle: "Quick Response",
      action: "Call Now",
      href: "tel:+260769481203"
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "support@xycargozm.com",
      subtitle: "Response within 2 hours",
      action: "Send Email",
      href: "mailto:support@xycargozm.com?subject=Support Request - XY Cargo Zambia"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      content: "Available 24/7",
      subtitle: "Instant assistance",
      action: "Start Chat"
    },
    {
      icon: MapPin,
      title: "Head Office",
      content: "Shop # 94 Carousel Mall, Lusaka, Zambia",
      subtitle: "Visit our main office",
      action: "Get Directions",
      href: "https://maps.google.com/?q=Carousel+Mall,+Lusaka,+Zambia"
    }
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "tracking", label: "Package Tracking" },
    { value: "pricing", label: "Pricing & Quotes" },
    { value: "claims", label: "Claims & Insurance" },
    { value: "billing", label: "Billing & Payments" },
    { value: "technical", label: "Technical Support" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center py-16"
      >
        {/* <SEO 
          title="Contact Us - Message Sent"
          description="Thank you for contacting XY Cargo Zambia. We'll get back to you within 2 business hours."
          keywords="contact XY Cargo, shipping support, message sent, contact confirmation"
          canonical="https://xycargozm.com/contact"
        /> */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Send className="text-green-500" size={32} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 2 business hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Send Another Message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-16"
    >
      <SEO 
        title="Contact Us"
        description="Get in touch with XY Cargo Zambia. Contact our team for shipping inquiries, quotes, and support via phone, email, or the contact form."
        keywords="contact XY Cargo, shipping support, customer service, contact form, shipping inquiries"
        canonical="https://xycargozm.com/contact"
      />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={sectionVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for support, quotes, or any questions about our shipping services.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-lg p-6 text-center shadow-md"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-red-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
                <p className="font-medium text-gray-700 mb-1">{info.content}</p>
                <p className="text-sm text-gray-500 mb-4">{info.subtitle}</p>
                {info.href ? (
                  <a href={info.href} className="text-red-500 hover:text-red-600 font-medium text-sm">
                    {info.action}
                  </a>
                ) : (
                  <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                    {info.action}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div variants={sectionVariants} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Quick Links & FAQ */}
          <motion.div variants={sectionVariants} className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-red-500 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">Operating Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium">8:00 AM - 12:00 PM</span>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  "Track Your Package",
                  "Shipping Calculator",
                  "File a Claim",
                  "Schedule Pickup",
                  "Account Login",
                  "Service Areas"
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ x: 5 }}
                    className="block text-sm text-gray-600 hover:text-red-500 transition-colors"
                  >
                    → {link}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-red-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <HelpCircle className="text-red-500 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">Need Quick Answers?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Check our FAQ section for instant answers to common questions.
              </p>
              <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                View FAQ →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
