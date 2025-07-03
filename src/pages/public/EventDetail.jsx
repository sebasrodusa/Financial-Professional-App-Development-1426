import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUser, FiDollarSign, FiUsers, FiCheck } = FiIcons;

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useData();
  
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
            <Link
              to="/events"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isUpcoming = new Date(event.date) >= new Date();
  const canRegister = isUpcoming && event.registered < event.capacity;

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
            to="/events"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Events</span>
          </Link>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Event Image */}
          <div className="aspect-video relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isUpcoming
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-lg font-semibold">
                {event.price}
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Event Header */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-gray-600">
                {event.description}
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Date</p>
                    <p className="text-gray-600">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Time</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Organizer</p>
                    <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Price</p>
                    <p className="text-gray-600">{event.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">Registration</p>
                    <p className="text-gray-600">{event.registered} of {event.capacity} registered</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-4">
                  This comprehensive workshop will cover essential financial planning strategies and techniques 
                  that every professional should know. Whether you're just starting your career or looking to 
                  enhance your existing knowledge, this event is designed to provide valuable insights and 
                  practical tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Fundamental principles of financial planning</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Risk assessment and management strategies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Investment portfolio optimization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Tax planning and optimization techniques</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Client communication and relationship building</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {canRegister ? 'Register Now' : 'Registration Status'}
                  </h3>
                  <p className="text-gray-600">
                    {canRegister 
                      ? 'Secure your spot in this valuable workshop'
                      : !isUpcoming 
                      ? 'This event has already passed'
                      : 'This event is currently full'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  {canRegister && (
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                      Register Now
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Events</h2>
          <div className="text-center py-8">
            <p className="text-gray-500">Check out more upcoming events and workshops</p>
            <Link
              to="/events"
              className="mt-4 inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;