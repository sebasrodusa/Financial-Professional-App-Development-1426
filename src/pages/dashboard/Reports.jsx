import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiPlus, FiDownload, FiEye, FiEdit2, FiTrash2, FiFileText, FiCalendar, FiUser } = FiIcons;

const Reports = () => {
  const { reports, addReport, clients } = useData();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      addReport({
        ...data,
        status: 'Generated',
        generatedAt: new Date().toISOString()
      });
      toast.success('Report generated successfully');
      setShowModal(false);
      reset();
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  const reportTypes = [
    { value: 'financial-analysis', label: 'Financial Analysis' },
    { value: 'cash-flow', label: 'Cash Flow Report' },
    { value: 'net-worth', label: 'Net Worth Statement' },
    { value: 'investment-review', label: 'Investment Review' },
    { value: 'retirement-planning', label: 'Retirement Planning' },
    { value: 'tax-planning', label: 'Tax Planning Report' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage client financial analysis reports</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiFileText} className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">{report.type}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {report.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                {report.clientName}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                {new Date(report.generatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-50 text-primary-600 py-2 px-3 rounded-lg hover:bg-primary-100 transition-colors text-sm flex items-center justify-center space-x-1">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center justify-center space-x-1">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No reports generated yet</p>
          <p className="text-gray-400">Create your first financial analysis report</p>
        </div>
      )}

      {/* Generate Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Generate New Report</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Title
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter report title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  {...register('type', { required: 'Report type is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select report type</option>
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select
                  {...register('clientName', { required: 'Client is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.clientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Period
                </label>
                <select
                  {...register('period', { required: 'Period is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select period</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                  <option value="custom">Custom Range</option>
                </select>
                {errors.period && (
                  <p className="mt-1 text-sm text-red-600">{errors.period.message}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Reports;