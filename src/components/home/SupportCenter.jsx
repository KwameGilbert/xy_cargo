import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, Send, CheckCircle, Users, Headphones } from 'lucide-react';

const SupportCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: 'How do I track my package?',
      answer: 'You can track your package using your tracking number on our tracking page. You\'ll receive real-time updates via SMS and email.',
    },
    {
      question: 'What are your shipping rates?',
      answer: 'Our rates are based on weight, dimensions, destination, and service level. Use our shipping calculator for instant quotes.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Delivery times vary by destination and service level. Standard shipping takes 3-7 business days, while express shipping takes 1-3 business days.',
    },
    {
      question: 'What items can I ship?',
      answer: 'We ship most general merchandise. Prohibited items include hazardous materials, perishables, and illegal items. Check our prohibited items list for details.',
    },
    {
      question: 'Do you provide insurance?',
      answer: 'Yes, we offer comprehensive insurance coverage up to $10,000. Insurance rates start at just $2.99 per shipment.',
    },
    {
      question: 'How do I prepare my package?',
      answer: 'Use a sturdy box, wrap fragile items, fill empty spaces with padding, and seal securely. We offer free packaging consultation.',
    },
  ];

  const supportChannels = [
    {
      icon: Phone,
      title: 'Phone Support',
      subtitle: '24/7 Hotline',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'from-green-400 to-green-600',
      available: true,
      href: 'tel:+15551234567',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Instant Help',
      contact: 'Average wait: 30 seconds',
      action: 'Start Chat',
      color: 'from-blue-400 to-blue-600',
      available: false,
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'Detailed Help',
      contact: 'support@xycargozm.com',
      action: 'Send Email',
      color: 'from-purple-400 to-purple-600',
      available: true,
      href: 'mailto:support@xycargozm.com?subject=Support Request - XY Cargo Zambia',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-30"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <Headphones className="text-red-500 mx-auto" size={48} />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Support Center</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get help when you need it. Our expert support team is here 24/7 to assist you with any questions or concerns.
          </p>
        </motion.div>

        {/* Support Statistics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, number: "10K+", label: "Happy Customers", color: "text-blue-500" },
            { icon: Clock, number: "< 30s", label: "Average Response", color: "text-green-500" },
            { icon: CheckCircle, number: "99.9%", label: "Resolution Rate", color: "text-purple-500" },
            { icon: Headphones, number: "24/7", label: "Support Available", color: "text-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg"
            >
              <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
              <h3 className="text-2xl font-bold text-gray-800">{stat.number}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <HelpCircle className="text-red-500 mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h3>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    layout
                  >
                    <motion.button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          variants={faqVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Support Channels */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-6">Contact Our Support Team</h4>
                <div className="grid grid-cols-1 gap-4">
                  {supportChannels.map((channel, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`bg-gradient-to-r ${channel.color} rounded-lg p-4 text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <channel.icon size={24} className="mr-3" />
                          <div>
                            <h5 className="font-semibold">{channel.title}</h5>
                            <p className="text-sm opacity-90">{channel.subtitle}</p>
                            <p className="text-xs opacity-80">{channel.contact}</p>
                          </div>
                        </div>
                        {channel.available ? (
                          channel.href ? (
                            <motion.a
                              href={channel.href}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              {channel.action}
                            </motion.a>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed"
                              disabled
                            >
                              Coming Soon
                            </motion.button>
                          )
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed"
                            disabled
                          >
                            Coming Soon
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <Send className="text-red-500 mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-gray-800">Send us a Message</h3>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="text-green-500" size={32} />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">We'll get back to you within 2-4 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                    />
                    
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your inquiry in detail..."
                      rows={6}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300 resize-none"
                      whileFocus={{ scale: 1.02 }}
                    />
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </div>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send size={20} className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {!submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Clock className="text-blue-500 mr-2" size={16} />
                    <span className="text-blue-700 font-medium text-sm">Response Time:</span>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    We typically respond within 2-4 hours during business hours. For urgent matters, please use our 24/7 hotline.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SupportCenter;