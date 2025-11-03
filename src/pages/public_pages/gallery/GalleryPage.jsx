import { motion } from "framer-motion";
import { useState } from "react";
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample gallery images - replace with actual images
  const galleryImages = [
    {
      id: 1,
      src: "/images/XY-e1751100152489-1355x1536.jpg",
      alt: "Warehouse Operations",
      category: "Operations",
      title: "Modern Warehouse Facility"
    },
    {
      id: 2,
      src: "/images/william-william-NndKt2kF1L4-unsplash-1.jpg",
      alt: "Delivery Fleet",
      category: "Fleet",
      title: "Our Delivery Fleet"
    },
    {
      id: 3,
      src: "/images/63405.jpg",
      alt: "Package Sorting",
      category: "Operations",
      title: "Efficient Package Sorting"
    },
    {
      id: 4,
      src: "/images/gallery/podcast-1.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 5,
      src: "/images/gallery/podcast-2.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 6,
      src: "/images/gallery/podcast-3.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 7,
      src: "/images/gallery/podcast-4.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 8,
      src: "/images/gallery/podcast-5.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 9,
      src: "/images/gallery/podcast-6.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 10,
      src: "/images/gallery/podcast-7.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 11,
      src: "/images/gallery/podcast-8.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 12,
      src: "/images/gallery/podcast-9.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 13,
      src: "/images/gallery/podcast-10.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    },
    {
      id: 14,
      src: "/images/gallery/podcast-11.jpg",
      alt: "XY Cargo Podcasting",
      category: "Marketing",
      title: "XY Cargo Podcasting Studio"
    }
  ];

  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentFilteredIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentFilteredIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const currentFilteredIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentFilteredIndex === 0 ? filteredImages.length - 1 : currentFilteredIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take a look at our modern facilities, professional team, and the technology that powers
          our logistics operations across Zambia.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={sectionVariants} className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
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
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              layout
              className="group relative overflow-hidden rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/images/placeholder-gallery.jpg";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                <Image className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                <p className="text-gray-200 text-sm">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/20  text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
              <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
              <p className="text-sm text-gray-400 mt-2">
                {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Contact Section */}
      <motion.div variants={sectionVariants} className="mt-16 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Want to See More?</h3>
          <p className="text-gray-600 mb-8">
            Our facilities and operations are constantly evolving. Contact us to schedule a tour
            or learn more about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+260967379139"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Schedule a Tour
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryPage;