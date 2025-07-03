import React, { useState } from 'react';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSave, FiEye, FiCalendar, FiClock, FiUpload } = FiIcons;

const PublishingPanel = ({ onPublish, onSaveDraft, onSchedule, isEditing = false, lastSaved = 'Never' }) => {
  const [publishType, setPublishType] = useState('publish');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);

  const handlePublish = () => {
    if (publishType === 'schedule' && scheduleDate && scheduleTime) {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      onSchedule(scheduledDateTime);
    } else if (publishType === 'draft') {
      onSaveDraft();
    } else {
      onPublish();
    }
  };

  const getButtonText = () => {
    switch (publishType) {
      case 'draft':
        return isEditing ? 'Save Draft' : 'Save as Draft';
      case 'schedule':
        return 'Schedule Post';
      default:
        return isEditing ? 'Update Post' : 'Publish Now';
    }
  };

  const getButtonIcon = () => {
    switch (publishType) {
      case 'draft':
        return FiSave;
      case 'schedule':
        return FiCalendar;
      default:
        return FiUpload;
    }
  };

  const isScheduleValid = publishType !== 'schedule' || (scheduleDate && scheduleTime);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
        Publishing Options
      </h3>

      <div className="space-y-4">
        {/* Publishing Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publishing Action
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="publishType"
                value="publish"
                checked={publishType === 'publish'}
                onChange={(e) => {
                  setPublishType(e.target.value);
                  setShowSchedule(false);
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                {isEditing ? 'Update immediately' : 'Publish immediately'}
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="publishType"
                value="draft"
                checked={publishType === 'draft'}
                onChange={(e) => {
                  setPublishType(e.target.value);
                  setShowSchedule(false);
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Save as draft</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="publishType"
                value="schedule"
                checked={publishType === 'schedule'}
                onChange={(e) => {
                  setPublishType(e.target.value);
                  setShowSchedule(true);
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Schedule for later</span>
            </label>
          </div>
        </div>

        {/* Schedule Date/Time */}
        {showSchedule && (
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 inline mr-1" />
              Schedule Date & Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            {scheduleDate && scheduleTime && (
              <p className="text-xs text-gray-500 mt-2">
                Will be published on {format(new Date(`${scheduleDate}T${scheduleTime}`), 'PPP p')}
              </p>
            )}
          </div>
        )}

        {/* Publish Button */}
        <div className="border-t pt-4">
          <button
            type="button"
            onClick={handlePublish}
            disabled={!isScheduleValid}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
              isScheduleValid
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <SafeIcon icon={getButtonIcon()} className="w-5 h-5" />
            <span>{getButtonText()}</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onSaveDraft}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            
            <button
              type="button"
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <SafeIcon icon={FiEye} className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Auto-save Status */}
        <div className="border-t pt-4">
          <div className="flex items-center text-xs text-gray-500">
            <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
            <span>Last saved: {lastSaved}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingPanel;