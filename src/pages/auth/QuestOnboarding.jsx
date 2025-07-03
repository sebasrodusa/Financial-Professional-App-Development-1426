import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../../contexts/AuthContext';
import { questConfig, getUserId, getUserToken } from '../../config/questConfig';
import toast from 'react-hot-toast';

const QuestOnboardingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if not a new user (already onboarded)
  if (!user.isNewUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleOnboardingComplete = () => {
    setLoading(true);
    try {
      // Update user to mark onboarding as complete
      const updatedUser = { ...user, isNewUser: false };
      localStorage.setItem('financeApp_user', JSON.stringify(updatedUser));
      
      toast.success('Welcome to FinancePro! Your account is now set up.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding completion error:', error);
      toast.error('There was an issue completing onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6">
              <span className="text-primary-600 font-bold text-2xl">F</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Let's Get Started!</h1>
            <p className="text-xl text-primary-100 mb-8">
              We're setting up your personalized financial management experience.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Profile Setup</h3>
                <p className="text-primary-100 text-sm">Tell us about your professional background</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Preferences</h3>
                <p className="text-primary-100 text-sm">Customize your dashboard and workflow</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ready to Go</h3>
                <p className="text-primary-100 text-sm">Start managing your clients and growing your practice</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-primary-700 rounded-xl">
            <h3 className="font-semibold mb-2">Welcome, {user.name}!</h3>
            <p className="text-primary-100 text-sm">
              You're just a few steps away from accessing your complete financial management platform.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started!</h2>
            <p className="text-gray-600">Setting up your account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Quest Onboarding Component */}
            <div className="quest-onboarding-container p-8">
              <OnBoarding
                userId={getUserId()}
                token={getUserToken()}
                questId={questConfig.ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={handleOnboardingComplete}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
                apiKey={questConfig.APIKEY}
                entityId={questConfig.ENTITYID}
                apiType={questConfig.API_TYPE}
                loading={loading}
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>

          {/* Skip Option */}
          <div className="mt-6 text-center">
            <button 
              onClick={handleOnboardingComplete}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip onboarding for now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;