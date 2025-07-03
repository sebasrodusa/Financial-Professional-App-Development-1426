import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiTrendingDown, FiHome, FiCar, FiCreditCard, FiShield, FiFileText, FiTarget } = FiIcons;

const FinancialDataForm = ({ clientData, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('cashflow');
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: clientData?.financialData || {}
  });

  const onSubmit = (data) => {
    // Calculate derived values
    const calculations = {
      netIncome: (data.totalIncome || 0) - (data.totalExpenses || 0),
      netAssets: (data.totalAssets || 0) - (data.totalLiabilities || 0),
      savingsRate: data.totalIncome > 0 ? ((data.totalIncome - data.totalExpenses) / data.totalIncome * 100) : 0,
      debtToIncomeRatio: data.totalIncome > 0 ? (data.totalLiabilities / data.totalIncome * 100) : 0
    };

    onSave({
      ...data,
      calculations,
      lastUpdated: new Date().toISOString()
    });
  };

  const tabs = [
    { id: 'cashflow', label: 'Cash Flow', icon: FiTrendingUp },
    { id: 'balance', label: 'Balance Sheet', icon: FiDollarSign },
    { id: 'plans', label: 'Financial Plans', icon: FiTarget },
    { id: 'goals', label: 'Goals', icon: FiShield }
  ];

  const renderCashFlowTab = () => (
    <div className="space-y-6">
      {/* Income Section */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 mr-2" />
          Monthly Income
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary/Wages</label>
            <input
              {...register('salary', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Income</label>
            <input
              {...register('businessIncome', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Income</label>
            <input
              {...register('investmentIncome', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
            <input
              {...register('otherIncome', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="text-sm font-medium text-green-800">
            Total Monthly Income: $
            {((watch('salary') || 0) + (watch('businessIncome') || 0) + (watch('investmentIncome') || 0) + (watch('otherIncome') || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
          <SafeIcon icon={FiTrendingDown} className="w-5 h-5 mr-2" />
          Monthly Expenses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Housing</label>
            <input
              {...register('housing', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transportation</label>
            <input
              {...register('transportation', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food & Dining</label>
            <input
              {...register('food', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
            <input
              {...register('utilities', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
            <input
              {...register('insurance', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment</label>
            <input
              {...register('entertainment', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Healthcare</label>
            <input
              {...register('healthcare', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Miscellaneous</label>
            <input
              {...register('miscellaneous', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded">
          <p className="text-sm font-medium text-red-800">
            Total Monthly Expenses: $
            {((watch('housing') || 0) + (watch('transportation') || 0) + (watch('food') || 0) + 
              (watch('utilities') || 0) + (watch('insurance') || 0) + (watch('entertainment') || 0) + 
              (watch('healthcare') || 0) + (watch('miscellaneous') || 0)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  const renderBalanceSheetTab = () => (
    <div className="space-y-6">
      {/* Assets Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <SafeIcon icon={FiHome} className="w-5 h-5 mr-2" />
          Assets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cash & Savings</label>
            <input
              {...register('cashSavings', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Checking Account</label>
            <input
              {...register('checking', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Accounts</label>
            <input
              {...register('investments', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Accounts</label>
            <input
              {...register('retirement', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Real Estate</label>
            <input
              {...register('realEstate', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicles</label>
            <input
              {...register('vehicles', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Property</label>
            <input
              {...register('personalProperty', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Assets</label>
            <input
              {...register('otherAssets', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-100 rounded">
          <p className="text-sm font-medium text-blue-800">
            Total Assets: $
            {((watch('cashSavings') || 0) + (watch('checking') || 0) + (watch('investments') || 0) + 
              (watch('retirement') || 0) + (watch('realEstate') || 0) + (watch('vehicles') || 0) + 
              (watch('personalProperty') || 0) + (watch('otherAssets') || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Liabilities Section */}
      <div className="bg-orange-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
          <SafeIcon icon={FiCreditCard} className="w-5 h-5 mr-2" />
          Liabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mortgage</label>
            <input
              {...register('mortgage', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto Loans</label>
            <input
              {...register('autoLoans', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Cards</label>
            <input
              {...register('creditCards', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Loans</label>
            <input
              {...register('studentLoans', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Loans</label>
            <input
              {...register('personalLoans', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Debts</label>
            <input
              {...register('otherDebts', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mt-4 p-3 bg-orange-100 rounded">
          <p className="text-sm font-medium text-orange-800">
            Total Liabilities: $
            {((watch('mortgage') || 0) + (watch('autoLoans') || 0) + (watch('creditCards') || 0) + 
              (watch('studentLoans') || 0) + (watch('personalLoans') || 0) + (watch('otherDebts') || 0)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  const renderFinancialPlansTab = () => (
    <div className="space-y-6">
      {/* Insurance Policies */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
          <SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />
          Life Insurance Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term Life Coverage</label>
            <input
              {...register('termLifeCoverage', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term Life Premium</label>
            <input
              {...register('termLifePremium', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Whole Life Coverage</label>
            <input
              {...register('wholeLifeCoverage', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Whole Life Premium</label>
            <input
              {...register('wholeLifePremium', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <SafeIcon icon={FiFileText} className="w-5 h-5 mr-2" />
          Legal Financial Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              {...register('hasWill')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Will</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('hasTrust')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Trust</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('hasPowerOfAttorney')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Power of Attorney</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('hasHealthcareDirective')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Healthcare Directive</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('hasBeneficiaryDesignations')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Beneficiary Designations</label>
          </div>
          <div className="flex items-center">
            <input
              {...register('hasEstateplan')}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Estate Plan</label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
          <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2" />
          Financial Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Goal</label>
            <input
              {...register('retirementGoal', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Retirement Age</label>
            <input
              {...register('retirementAge', { valueAsNumber: true })}
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="65"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Fund Goal</label>
            <input
              {...register('emergencyFundGoal', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education Savings Goal</label>
            <input
              {...register('educationGoal', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Purchase Goal</label>
            <input
              {...register('homeGoal', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vacation/Travel Goal</label>
            <input
              {...register('vacationGoal', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
          <select
            {...register('riskTolerance')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Risk Tolerance</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Timeline</label>
          <select
            {...register('investmentTimeline')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Timeline</option>
            <option value="short">Short Term (1-3 years)</option>
            <option value="medium">Medium Term (3-7 years)</option>
            <option value="long">Long Term (7+ years)</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Financial Data Input</h2>
        <p className="text-gray-600 mt-1">Complete financial analysis for comprehensive reporting</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'cashflow' && renderCashFlowTab()}
          {activeTab === 'balance' && renderBalanceSheetTab()}
          {activeTab === 'plans' && renderFinancialPlansTab()}
          {activeTab === 'goals' && renderGoalsTab()}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Save Financial Data
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FinancialDataForm;