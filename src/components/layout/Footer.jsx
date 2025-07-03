import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FinancePro</span>
            </div>
            <p className="text-gray-400">
              Empowering financial professionals with cutting-edge tools and resources to serve their clients better.
            </p>
            <div className="flex space-x-4">
              <SafeIcon icon={FiFacebook} className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <SafeIcon icon={FiTwitter} className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <SafeIcon icon={FiLinkedin} className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/professionals" className="text-gray-400 hover:text-white">Find Professionals</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Financial Planning</span></li>
              <li><span className="text-gray-400">Investment Management</span></li>
              <li><span className="text-gray-400">Insurance Planning</span></li>
              <li><span className="text-gray-400">Tax Strategy</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">contact@financepro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FinancePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;