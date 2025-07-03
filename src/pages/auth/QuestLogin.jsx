import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../../contexts/AuthContext';
import { questConfig, getUserId } from '../../config/questConfig';
import toast from 'react-hot-toast';

const QuestLoginPage = () => {
  const { user, isAuthenticated, handleQuestLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginSuccess = async (loginData) => {
    setLoading(true);
    try {
      const { user: userData, newUser } = await handleQuestLogin(loginData);
      
      toast.success(`Welcome ${newUser ? '' : 'back'}, ${userData.name}!`);
      
      // Navigate based on user role and type
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (newUser) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Branding */}
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
            <h1 className="text-4xl font-bold mb-4">Welcome to FinancePro</h1>
            <p className="text-xl text-primary-100 mb-8">
              Your comprehensive platform for financial management and client relationships.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Client Management</h3>
                <p className="text-primary-100 text-sm">Streamlined tools for managing client relationships and data</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Financial Analysis</h3>
                <p className="text-primary-100 text-sm">Comprehensive reporting and analysis tools</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Platform</h3>
                <p className="text-primary-100 text-sm">Bank-level security for your sensitive data</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Authentication */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">FinancePro</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Access your financial management dashboard
              </p>
            </div>

            {/* Quest Login Component */}
            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLoginSuccess}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
                userId={getUserId()}
                apiKey={questConfig.APIKEY}
                entityId={questConfig.ENTITYID}
                apiType={questConfig.API_TYPE}
                loading={loading}
              />
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Demo Credentials:</strong><br />
                <span className="text-red-600 font-semibold">Admin:</span> admin@financepro.com<br />
                <span className="text-blue-600 font-semibold">Professional:</span> user@financepro.com<br />
                Or use any email to create a new account
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/register')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
              <p className="text-xs text-gray-500">
                <Link 
                  to="/login/traditional" 
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Use traditional login instead
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestLoginPage;