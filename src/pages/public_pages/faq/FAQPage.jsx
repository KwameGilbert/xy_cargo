import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle, Phone, Mail } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is XY Cargo Zambia?",
          answer: "XY Cargo Zambia is a leading logistics and cargo transportation company in Zambia, providing comprehensive shipping solutions for individuals and businesses across the country and internationally."
        },
        {
          question: "What services do you offer?",
          answer: "We offer a wide range of services including parcel delivery, freight transportation, warehousing, customs clearance, express delivery, and logistics consulting. We handle both domestic and international shipments."
        },
        {
          question: "How do I get started?",
          answer: "Getting started is easy! Simply create an account on our website, choose your shipping needs, and we'll guide you through the process. You can also contact our customer service team for personalized assistance."
        }
      ]
    },
    {
      category: "Shipping & Tracking",
      questions: [
        {
          question: "How can I track my package?",
          answer: "You can track your package by entering your tracking number on our website's tracking page. You'll receive real-time updates on your shipment's status, location, and estimated delivery time."
        },
        {
          question: "What if my package is delayed?",
          answer: "If your package is delayed, please check the tracking information for updates. For significant delays, contact our customer service team with your tracking number, and we'll investigate and provide assistance."
        },
        {
          question: "Can I change the delivery address after shipping?",
          answer: "Address changes are possible but depend on the shipment's current status. Contact our customer service immediately if you need to change the delivery address. Changes may incur additional fees."
        },
        {
          question: "What items cannot be shipped?",
          answer: "We cannot ship hazardous materials, illegal substances, perishable items, live animals, firearms, or any items prohibited by law. Please check our prohibited items list or contact us for clarification."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          question: "How is shipping cost calculated?",
          answer: "Shipping costs are calculated based on package weight, dimensions, destination, service type, and any additional services required. Use our shipping calculator on the website for an instant quote."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards, bank transfers, mobile money (Airtel Money, MTN Money), and cash on delivery for eligible shipments."
        },
        {
          question: "Do you offer insurance for shipments?",
          answer: "Yes, we offer shipment insurance for additional protection. Insurance costs vary based on the declared value of your package. Contact us for insurance options and pricing."
        },
        {
          question: "Are there any hidden fees?",
          answer: "We strive for transparency in our pricing. All applicable fees including taxes, duties, and service charges are clearly displayed before you confirm your shipment."
        }
      ]
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Sign Up' button on our website. Provide your basic information, verify your email, and you'll have access to all our services."
        },
        {
          question: "How do I reset my password?",
          answer: "Click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
        },
        {
          question: "What should I do if I have a complaint?",
          answer: "We take customer satisfaction seriously. Contact our customer service team through our website, email, or phone. We'll investigate your concern and work to resolve it promptly."
        },
        {
          question: "How can I contact customer service?",
          answer: "You can reach our customer service team through multiple channels: phone (+260-XXX-XXXX), email (info@xycargozm.com), live chat on our website, or by visiting any of our offices."
        }
      ]
    },
    {
      category: "International Shipping",
      questions: [
        {
          question: "Do you handle international shipments?",
          answer: "Yes, we provide international shipping services to various countries. International shipments may require additional documentation and may be subject to customs regulations."
        },
        {
          question: "What documents are needed for international shipping?",
          answer: "For international shipments, you may need commercial invoices, customs declarations, certificates of origin, and other documents depending on the destination country and package contents."
        },
        {
          question: "How long does international shipping take?",
          answer: "International shipping times vary depending on the destination, service type, and any customs processing requirements. We provide estimated delivery times when you book your shipment."
        },
        {
          question: "Do you handle customs clearance?",
          answer: "Yes, we provide customs clearance services for international shipments. Our team handles all necessary documentation and ensures compliance with customs regulations."
        }
      ]
    }
  ];

  const filteredFaqData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-16"
    >
      {/* Header */}
      <motion.div variants={sectionVariants} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our services. Can't find what you're looking for?
          Contact our support team for personalized assistance.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={sectionVariants} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4">
        {filteredFaqData.length === 0 ? (
          <motion.div variants={sectionVariants} className="text-center py-12">
            <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or contact our support team.</p>
          </motion.div>
        ) : (
          filteredFaqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={sectionVariants}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}`;
                  const isExpanded = expandedItems.has(globalIndex);

                  return (
                    <motion.div
                      key={faqIndex}
                      variants={itemVariants}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="text-gray-500" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-500" size={20} />
                        )}
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Contact Support Section */}
      <motion.div variants={sectionVariants} className="mt-16 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-8">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0211220012"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <Phone className="mr-2" size={18} />
              Call Support
            </a>
            <a
              href="mailto:info@xycargozm.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              <Mail className="mr-2" size={18} />
              Email Support
            </a>
            <a
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              <MessageCircle className="mr-2" size={18} />
              Live Chat
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQPage;