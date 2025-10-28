import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample blog posts - replace with actual content
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Logistics in Zambia: Trends to Watch",
      excerpt: "Explore the emerging trends shaping the logistics industry in Zambia and how XY Cargo is adapting to meet the evolving needs of our customers.",
      content: "The logistics industry in Zambia is undergoing rapid transformation...",
      author: "John Banda",
      date: "2025-10-15",
      category: "Industry Trends",
      readTime: "5 min read",
      image: "/images/blog/logistics-trends.jpg",
      tags: ["Logistics", "Technology", "Zambia"]
    },
    {
      id: 2,
      title: "How to Choose the Right Shipping Service for Your Business",
      excerpt: "A comprehensive guide to help businesses select the most suitable shipping service based on their specific needs and requirements.",
      content: "Selecting the right shipping service is crucial for business success...",
      author: "Mary Phiri",
      date: "2025-10-10",
      category: "Business Guide",
      readTime: "7 min read",
      image: "/images/blog/shipping-guide.jpg",
      tags: ["Business", "Shipping", "Guide"]
    },
    {
      id: 3,
      title: "Sustainable Logistics: Our Commitment to Environmental Responsibility",
      excerpt: "Learn about XY Cargo's initiatives to reduce our environmental impact and promote sustainable logistics practices across Zambia.",
      content: "At XY Cargo, we believe in doing our part for the environment...",
      author: "David Mwanza",
      date: "2025-10-05",
      category: "Sustainability",
      readTime: "4 min read",
      image: "/images/blog/sustainability.jpg",
      tags: ["Sustainability", "Environment", "Green Logistics"]
    },
    {
      id: 4,
      title: "International Shipping Made Simple: A Complete Guide",
      excerpt: "Everything you need to know about shipping internationally, from documentation to customs clearance and delivery timelines.",
      content: "International shipping can seem complex, but with the right knowledge...",
      author: "Sarah Zulu",
      date: "2025-09-28",
      category: "International Shipping",
      readTime: "8 min read",
      image: "/images/blog/international-shipping.jpg",
      tags: ["International", "Customs", "Documentation"]
    },
    {
      id: 5,
      title: "The Impact of E-commerce on Logistics in Zambia",
      excerpt: "How the growth of e-commerce is reshaping logistics operations and creating new opportunities for businesses in Zambia.",
      content: "The e-commerce revolution is transforming how Zambians shop and do business...",
      author: "Michael Chileshe",
      date: "2025-09-20",
      category: "E-commerce",
      readTime: "6 min read",
      image: "/images/blog/ecommerce-logistics.jpg",
      tags: ["E-commerce", "Digital Transformation", "Online Business"]
    },
    {
      id: 6,
      title: "Warehouse Management Best Practices",
      excerpt: "Essential tips and strategies for effective warehouse management to improve efficiency and reduce operational costs.",
      content: "Efficient warehouse management is the backbone of successful logistics operations...",
      author: "Grace Nkandu",
      date: "2025-09-15",
      category: "Operations",
      readTime: "5 min read",
      image: "/images/blog/warehouse-management.jpg",
      tags: ["Warehouse", "Operations", "Efficiency"]
    }
  ];

  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const cardVariants = {
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">XY Cargo Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest insights, trends, and updates from the world of logistics
          and shipping in Zambia and beyond.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={sectionVariants} className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {filteredPosts.length === 0 ? (
          <motion.div variants={sectionVariants} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Featured Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/images/blog-placeholder.jpg";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User size={16} className="mr-1" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      {/* Newsletter Signup */}
      <motion.div variants={sectionVariants} className="mt-16 bg-red-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-red-100 mb-8">
            Subscribe to our newsletter for the latest logistics insights, industry news, and exclusive updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="bg-white text-red-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div variants={sectionVariants} className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-8">
            Our team of logistics experts is here to help. Reach out for personalized advice
            or to discuss your shipping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogPage;