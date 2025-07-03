import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import FinancialDataForm from '../../components/client/FinancialDataForm';
import FinancialReport from '../../components/client/FinancialReport';

const { FiArrowLeft, FiEdit2, FiSave, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiTrendingUp, FiTarget, FiFileText, FiBarChart3 } = FiIcons;

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, updateClient } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [showFinancialForm, setShowFinancialForm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const client = clients.find(c => c.id === id);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: client
  });

  if (!client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/clients')}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Not Found</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">The client you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      updateClient(id, data);
      setIsEditing(false);
      toast.success('Client updated successfully');
    } catch (error) {
      toast.error('Failed to update client');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(client);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(client);
  };

  const handleSaveFinancialData = (financialData) => {
    updateClient(id, { 
      ...client, 
      financialData,
      lastFinancialUpdate: new Date().toISOString()
    });
    setShowFinancialForm(false);
    toast.success('Financial data saved successfully');
  };

  const handleShowReport = () => {
    if (!client.financialData) {
      toast.error('Please complete financial data first');
      return;
    }
    setShowReport(true);
  };

  // Calculate basic financial metrics if data exists
  const financialSummary = client.financialData ? (() => {
    const data = client.financialData;
    const totalIncome = (data.salary || 0) + (data.businessIncome || 0) + (data.investmentIncome || 0) + (data.otherIncome || 0);
    const totalExpenses = (data.housing || 0) + (data.transportation || 0) + (data.food || 0) + (data.utilities || 0) + 
                         (data.insurance || 0) + (data.entertainment || 0) + (data.healthcare || 0) + (data.miscellaneous || 0);
    const totalAssets = (data.cashSavings || 0) + (data.checking || 0) + (data.investments || 0) + (data.retirement || 0) + 
                       (data.realEstate || 0) + (data.vehicles || 0) + (data.personalProperty || 0) + (data.otherAssets || 0);
    const totalLiabilities = (data.mortgage || 0) + (data.autoLoans || 0) + (data.creditCards || 0) + 
                            (data.studentLoans || 0) + (data.personalLoans || 0) + (data.otherDebts || 0);
    
    return {
      totalIncome,
      totalExpenses,
      totalAssets,
      totalLiabilities,
      netIncome: totalIncome - totalExpenses,
      netWorth: totalAssets - totalLiabilities,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0
    };
  })() : null;

  if (showFinancialForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFinancialForm(false)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Data - {client.name}</h1>
            <p className="text-gray-600 mt-1">Complete comprehensive financial analysis</p>
          </div>
        </div>
        
        <FinancialDataForm
          clientData={client}
          onSave={handleSaveFinancialData}
          onCancel={() => setShowFinancialForm(false)}
        />
      </div>
    );
  }

  if (showReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowReport(false)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Report - {client.name}</h1>
            <p className="text-gray-600 mt-1">Comprehensive financial analysis and recommendations</p>
          </div>
        </div>
        
        <FinancialReport
          client={client}
          financialData={client.financialData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/clients')}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
            <p className="text-gray-600 mt-1">Manage client information and financial data</p>
          </div>
        </div>
        {!isEditing ? (
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFinancialForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
              <span>Financial Data</span>
            </button>
            <button
              onClick={handleShowReport}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiBarChart3} className="w-4 h-4" />
              <span>View Report</span>
            </button>
            <button
              onClick={handleEdit}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiEdit2} className="w-4 h-4" />
              <span>Edit Client</span>
            </button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              form="client-form"
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Client Information</h2>
            
            {isEditing ? (
              <form id="client-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      {...register('dateOfBirth', { required: 'Date of birth is required' })}
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    {...register('address', { required: 'Address is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-gray-600">Client ID: {client.id.slice(0, 8)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMail} className="w-4 h-4 mr-3" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 mr-3" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-3" />
                    {client.dateOfBirth}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-3" />
                    {client.address}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Financial Summary */}
          {financialSummary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 mt-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Financial Overview</h2>
                <span className="text-xs text-gray-500">
                  Last updated: {new Date(client.lastFinancialUpdate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    ${financialSummary.netWorth.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Net Worth</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    ${financialSummary.netIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Net Income</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <SafeIcon icon={FiTarget} className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {financialSummary.savingsRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Savings Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Total Assets:</span>
                  <span className="font-medium">${financialSummary.totalAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Liabilities:</span>
                  <span className="font-medium">${financialSummary.totalLiabilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Income:</span>
                  <span className="font-medium">${financialSummary.totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Expenses:</span>
                  <span className="font-medium">${financialSummary.totalExpenses.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowFinancialForm(true)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900">Update Financial Data</div>
                <div className="text-sm text-gray-600">Input comprehensive financial information</div>
              </button>
              <button 
                onClick={handleShowReport}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900">Generate Report</div>
                <div className="text-sm text-gray-600">Create comprehensive financial analysis</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all">
                <div className="font-medium text-gray-900">Schedule Meeting</div>
                <div className="text-sm text-gray-600">Book consultation appointment</div>
              </button>
            </div>
          </motion.div>

          {/* Financial Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Financial Data</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  client.financialData ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {client.financialData ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Report</span>
                <span className="text-xs text-gray-500">
                  {client.lastFinancialUpdate ? new Date(client.lastFinancialUpdate).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Client Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={6}
              placeholder="Add notes about this client..."
              defaultValue={client.notes || ''}
            />
            <button className="mt-3 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              Save Notes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;