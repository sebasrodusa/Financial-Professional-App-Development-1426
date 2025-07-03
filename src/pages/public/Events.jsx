import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiCalendar, FiMapPin, FiClock, FiUser, FiDollarSign, FiUsers } = FiIcons;

const Events = () => {
  const { events } = useData();
  const [filter, setFilter] = useState('all');

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    switch (filter) {
      case 'upcoming':
        return eventDate >= today;
      case 'past':
        return eventDate < today;
      default:
        return true;
    }
  });

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our educational events and workshops to enhance your financial knowledge and connect with industry professionals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                filter === 'past'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    new Date(event.date) >= new Date()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past Event'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                    {event.organizer}
                  </div>
                </div>

                {/* Registration Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                    {event.registered}/{event.capacity} registered
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/events/${event.id}`}
                    className="flex-1 bg-primary-50 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  {new Date(event.date) >= new Date() && event.registered < event.capacity && (
                    <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Events */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No events found</p>
            <p className="text-gray-400">
              {filter === 'upcoming' 
                ? 'No upcoming events scheduled at the moment'
                : filter === 'past'
                ? 'No past events to display'
                : 'No events available'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;