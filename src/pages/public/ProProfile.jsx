import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiArrowLeft, FiMapPin, FiStar, FiMail, FiPhone, FiCalendar, FiAward, FiBriefcase, FiExternalLink, FiGlobe } = FiIcons;

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

  const handleContactProfessional = () => {
    const subject = encodeURIComponent(`Consultation Request - ${professional.name}`);
    const body = encodeURIComponent(`Hello ${professional.name},\n\nI would like to schedule a consultation to discuss my financial planning needs.\n\nBest regards,`);
    window.location.href = `mailto:${professional.email}?subject=${subject}&body=${body}`;
  };

  const handleScheduleConsultation = () => {
    if (professional.calendarLink) {
      window.open(professional.calendarLink, '_blank');
    } else {
      // Fallback to email
      handleContactProfessional();
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg';
      case 'instagram':
        return 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg';
      case 'facebook':
        return 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg';
      default:
        return null;
    }
  };

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

              {/* Professional Networks */}
              {professional.socialLinks && (
                <div className="flex justify-center md:justify-start space-x-4 mt-4">
                  {Object.entries(professional.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                        title={`${professional.name} on ${platform}`}
                      >
                        {platform === 'linkedin' && (
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {platform === 'instagram' && (
                          <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                        {platform === 'facebook' && (
                          <svg className="w-4 h-4 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col space-y-3">
              <button
                onClick={handleContactProfessional}
                className="w-full md:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>Contact Professional</span>
              </button>
              
              {professional.calendarLink && (
                <button
                  onClick={handleScheduleConsultation}
                  className="w-full md:w-auto border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
              )}
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

            {/* Education */}
            {professional.education && professional.education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
                <div className="space-y-3">
                  {professional.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-primary-600 pl-4">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

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
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                {professional.hourlyRate && (
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Rate: {professional.hourlyRate}/hour</span>
                  </div>
                )}
                {professional.languages && (
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Languages: {professional.languages.join(', ')}</span>
                  </div>
                )}
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
              {professional.availability && (
                <div className="mt-3 flex items-center space-x-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-600">{professional.availability}</span>
                </div>
              )}
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
              <button
                onClick={handleScheduleConsultation}
                className="w-full bg-white text-primary-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
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