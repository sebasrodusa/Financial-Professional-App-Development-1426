import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const { FiDownload, FiPrinter, FiDollarSign, FiTrendingUp, FiTrendingDown, FiTarget, FiShield } = FiIcons;

const FinancialReport = ({ client, financialData }) => {
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Financial Report - ${client.name}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        .no-print { display: none !important; }
        .print-break { page-break-before: always; }
      }
    `
  });

  const handleDownloadPDF = () => {
    window.print();
  };

  // Calculate financial metrics
  const totalIncome = (financialData.salary || 0) + (financialData.businessIncome || 0) + 
                     (financialData.investmentIncome || 0) + (financialData.otherIncome || 0);

  const totalExpenses = (financialData.housing || 0) + (financialData.transportation || 0) + 
                       (financialData.food || 0) + (financialData.utilities || 0) + 
                       (financialData.insurance || 0) + (financialData.entertainment || 0) + 
                       (financialData.healthcare || 0) + (financialData.miscellaneous || 0);

  const totalAssets = (financialData.cashSavings || 0) + (financialData.checking || 0) + 
                     (financialData.investments || 0) + (financialData.retirement || 0) + 
                     (financialData.realEstate || 0) + (financialData.vehicles || 0) + 
                     (financialData.personalProperty || 0) + (financialData.otherAssets || 0);

  const totalLiabilities = (financialData.mortgage || 0) + (financialData.autoLoans || 0) + 
                          (financialData.creditCards || 0) + (financialData.studentLoans || 0) + 
                          (financialData.personalLoans || 0) + (financialData.otherDebts || 0);

  const netIncome = totalIncome - totalExpenses;
  const netWorth = totalAssets - totalLiabilities;
  const savingsRate = totalIncome > 0 ? ((netIncome / totalIncome) * 100) : 0;
  const debtToIncomeRatio = totalIncome > 0 ? ((totalLiabilities / totalIncome) * 100) : 0;

  // Chart data
  const incomeData = [
    { name: 'Salary', value: financialData.salary || 0, color: '#3B82F6' },
    { name: 'Business', value: financialData.businessIncome || 0, color: '#10B981' },
    { name: 'Investment', value: financialData.investmentIncome || 0, color: '#F59E0B' },
    { name: 'Other', value: financialData.otherIncome || 0, color: '#8B5CF6' }
  ].filter(item => item.value > 0);

  const expenseData = [
    { name: 'Housing', value: financialData.housing || 0, color: '#EF4444' },
    { name: 'Transportation', value: financialData.transportation || 0, color: '#F97316' },
    { name: 'Food', value: financialData.food || 0, color: '#EAB308' },
    { name: 'Utilities', value: financialData.utilities || 0, color: '#22C55E' },
    { name: 'Insurance', value: financialData.insurance || 0, color: '#3B82F6' },
    { name: 'Entertainment', value: financialData.entertainment || 0, color: '#A855F7' },
    { name: 'Healthcare', value: financialData.healthcare || 0, color: '#EC4899' },
    { name: 'Miscellaneous', value: financialData.miscellaneous || 0, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const assetData = [
    { name: 'Cash & Savings', value: financialData.cashSavings || 0, color: '#10B981' },
    { name: 'Checking', value: financialData.checking || 0, color: '#3B82F6' },
    { name: 'Investments', value: financialData.investments || 0, color: '#F59E0B' },
    { name: 'Retirement', value: financialData.retirement || 0, color: '#8B5CF6' },
    { name: 'Real Estate', value: financialData.realEstate || 0, color: '#EF4444' },
    { name: 'Vehicles', value: financialData.vehicles || 0, color: '#F97316' },
    { name: 'Personal Property', value: financialData.personalProperty || 0, color: '#22C55E' },
    { name: 'Other Assets', value: financialData.otherAssets || 0, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const liabilityData = [
    { name: 'Mortgage', value: financialData.mortgage || 0, color: '#EF4444' },
    { name: 'Auto Loans', value: financialData.autoLoans || 0, color: '#F97316' },
    { name: 'Credit Cards', value: financialData.creditCards || 0, color: '#EAB308' },
    { name: 'Student Loans', value: financialData.studentLoans || 0, color: '#3B82F6' },
    { name: 'Personal Loans', value: financialData.personalLoans || 0, color: '#A855F7' },
    { name: 'Other Debts', value: financialData.otherDebts || 0, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const cashFlowData = [
    { name: 'Monthly Income', income: totalIncome, expenses: 0, net: totalIncome },
    { name: 'Monthly Expenses', income: 0, expenses: totalExpenses, net: -totalExpenses },
    { name: 'Net Cash Flow', income: 0, expenses: 0, net: netIncome }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 no-print">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <SafeIcon icon={FiPrinter} className="w-4 h-4" />
          <span>Print Report</span>
        </button>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="bg-white">
        {/* Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Analysis Report</h1>
              <p className="text-lg text-gray-600 mt-2">Comprehensive Financial Assessment</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Report Date</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {client.name}</p>
                <p><span className="font-medium">Email:</span> {client.email}</p>
                <p><span className="font-medium">Phone:</span> {client.phone}</p>
                <p><span className="font-medium">Address:</span> {client.address}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-800">Net Worth</p>
                  <p className="text-lg font-bold text-green-600">${netWorth.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-medium text-blue-800">Monthly Cash Flow</p>
                  <p className={`text-lg font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netIncome.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Financial Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Total Assets</p>
                  <p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
                </div>
                <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Total Liabilities</p>
                  <p className="text-2xl font-bold text-red-600">${totalLiabilities.toLocaleString()}</p>
                </div>
                <SafeIcon icon={FiTrendingDown} className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Savings Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{savingsRate.toFixed(1)}%</p>
                </div>
                <SafeIcon icon={FiTarget} className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">Debt-to-Income</p>
                  <p className="text-2xl font-bold text-orange-600">{debtToIncomeRatio.toFixed(1)}%</p>
                </div>
                <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Analysis */}
        <div className="p-8 border-b border-gray-200 print-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cash Flow Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="net" fill="#3B82F6" name="Net" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Balance Sheet Analysis */}
        <div className="p-8 border-b border-gray-200 print-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Balance Sheet Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Liability Breakdown</h3>
              {liabilityData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={liabilityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {liabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No liabilities recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Financial Goals & Insurance */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Planning Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals</h3>
              <div className="space-y-4">
                {financialData.retirementGoal && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium text-blue-800">Retirement Goal</span>
                    <span className="font-bold text-blue-600">${financialData.retirementGoal.toLocaleString()}</span>
                  </div>
                )}
                {financialData.emergencyFundGoal && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium text-green-800">Emergency Fund Goal</span>
                    <span className="font-bold text-green-600">${financialData.emergencyFundGoal.toLocaleString()}</span>
                  </div>
                )}
                {financialData.educationGoal && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium text-purple-800">Education Savings Goal</span>
                    <span className="font-bold text-purple-600">${financialData.educationGoal.toLocaleString()}</span>
                  </div>
                )}
                {financialData.homeGoal && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="font-medium text-orange-800">Home Purchase Goal</span>
                    <span className="font-bold text-orange-600">${financialData.homeGoal.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Coverage</h3>
              <div className="space-y-4">
                {financialData.termLifeCoverage && (
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                    <span className="font-medium text-indigo-800">Term Life Insurance</span>
                    <span className="font-bold text-indigo-600">${financialData.termLifeCoverage.toLocaleString()}</span>
                  </div>
                )}
                {financialData.wholeLifeCoverage && (
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                    <span className="font-medium text-indigo-800">Whole Life Insurance</span>
                    <span className="font-bold text-indigo-600">${financialData.wholeLifeCoverage.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <h4 className="text-md font-semibold text-gray-900 mt-6 mb-3">Legal Documents</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <SafeIcon 
                    icon={financialData.hasWill ? FiShield : FiTrendingDown} 
                    className={`w-4 h-4 mr-2 ${financialData.hasWill ? 'text-green-600' : 'text-red-600'}`} 
                  />
                  <span>Will</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon 
                    icon={financialData.hasTrust ? FiShield : FiTrendingDown} 
                    className={`w-4 h-4 mr-2 ${financialData.hasTrust ? 'text-green-600' : 'text-red-600'}`} 
                  />
                  <span>Trust</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon 
                    icon={financialData.hasPowerOfAttorney ? FiShield : FiTrendingDown} 
                    className={`w-4 h-4 mr-2 ${financialData.hasPowerOfAttorney ? 'text-green-600' : 'text-red-600'}`} 
                  />
                  <span>Power of Attorney</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon 
                    icon={financialData.hasHealthcareDirective ? FiShield : FiTrendingDown} 
                    className={`w-4 h-4 mr-2 ${financialData.hasHealthcareDirective ? 'text-green-600' : 'text-red-600'}`} 
                  />
                  <span>Healthcare Directive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Recommendations</h2>
          <div className="space-y-4">
            {savingsRate < 10 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800">Improve Savings Rate</h4>
                <p className="text-sm text-red-700">Your current savings rate is {savingsRate.toFixed(1)}%. Consider increasing to at least 10-15% for financial security.</p>
              </div>
            )}
            
            {debtToIncomeRatio > 36 && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800">Debt Management</h4>
                <p className="text-sm text-orange-700">Your debt-to-income ratio is {debtToIncomeRatio.toFixed(1)}%. Consider debt reduction strategies to improve financial health.</p>
              </div>
            )}
            
            {!financialData.hasWill && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800">Estate Planning</h4>
                <p className="text-sm text-yellow-700">Consider establishing a will and other essential estate planning documents.</p>
              </div>
            )}
            
            {financialData.cashSavings < (totalExpenses * 3) && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800">Emergency Fund</h4>
                <p className="text-sm text-blue-700">Build an emergency fund covering 3-6 months of expenses for financial security.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;