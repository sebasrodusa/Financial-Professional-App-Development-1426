import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiArrowLeft, FiMapPin, FiStar, FiMail, FiPhone, FiCalendar, FiAward, FiBriefcase } = FiIcons;

const ProProfile = () => {
  const { id } = useParams();
  const { professionals, testimonials } = useData();
  
  const professional = professionals.find(p => p.id === id);
  const professionalTestimonials = testimonials.filter(t => t.professionalId === id);

  if (!professional) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Professional Not Found</h1>
            <p className="text-gray-600 mb-8">The professional you're looking for doesn't exist.</p>
            <Link
              to="/professionals"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/professionals"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Directory</span>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-32 h-32 rounded-full mx-auto md:mx-0 mb-6 md:mb-0"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{professional.name}</h1>
              <p className="text-xl text-gray-600 mb-2">{professional.title}</p>
              <p className="text-lg text-primary-600 mb-4">{professional.company}</p>
              
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{professional.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      className={`w-4 h-4 ${
                        i < Math.floor(professional.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {professional.rating} ({professional.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="w-full md:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                Contact Professional
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{professional.bio}</p>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {professional.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            {professionalTestimonials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Testimonials</h2>
                <div className="space-y-6">
                  {professionalTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-l-4 border-primary-600 pl-4">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon
                            key={i}
                            icon={FiStar}
                            className={`w-4 h-4 ${
                              i < testimonial.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-2 italic">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{professional.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{professional.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{professional.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credentials</h3>
              <div className="space-y-3">
                {professional.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-600">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiBriefcase} className="w-5 h-5 text-primary-600" />
                <span className="text-gray-600">{professional.experience} years of experience</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-primary-600 text-white rounded-lg p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
              <p className="text-primary-100 mb-4">
                Schedule a consultation with {professional.name.split(' ')[0]} today.
              </p>
              <button className="w-full bg-white text-primary-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                Schedule Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProProfile;