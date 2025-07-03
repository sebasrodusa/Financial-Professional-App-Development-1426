import React, { useState } from 'react';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSave, FiEye, FiCalendar, FiClock, FiUpload, FiEyeOff, FiGlobe } = FiIcons;

const PublishingControlPanel = ({ 
  onPublish, 
  onSaveDraft, 
  onSchedule, 
  onPreview,
  isEditing = false, 
  currentStatus = 'draft',
  lastSaved = 'Never' 
}) => {
  const [publishAction, setPublishAction] = useState('publish');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handlePublish = () => {
    const publishData = {
      action: publishAction,
      visibility,
      scheduledAt: publishAction === 'schedule' && scheduleDate && scheduleTime 
        ? new Date(`${scheduleDate}T${scheduleTime}`) 
        : null
    };

    switch (publishAction) {
      case 'schedule':
        if (scheduleDate && scheduleTime) {
          onSchedule(publishData);
        }
        break;
      case 'draft':
        onSaveDraft(publishData);
        break;
      default:
        onPublish(publishData);
    }
  };

  const getActionButtonText = () => {
    switch (publishAction) {
      case 'draft':
        return isEditing ? 'Update Draft' : 'Save as Draft';
      case 'schedule':
        return isEditing ? 'Reschedule Post' : 'Schedule Post';
      default:
        return isEditing ? 'Update Post' : 'Publish Now';
    }
  };

  const getActionButtonIcon = () => {
    switch (publishAction) {
      case 'draft':
        return FiSave;
      case 'schedule':
        return FiCalendar;
      default:
        return FiUpload;
    }
  };

  const isValidSchedule = publishAction !== 'schedule' || (scheduleDate && scheduleTime);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
          Publish Settings
        </h3>
        {currentStatus && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              currentStatus === 'published' ? 'bg-green-100 text-green-800' :
              currentStatus === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {currentStatus === 'published' ? 'Published' :
               currentStatus === 'scheduled' ? 'Scheduled' :
               'Draft'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Visibility Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Visibility
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) => setVisibility(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <SafeIcon icon={FiGlobe} className="w-4 h-4 ml-2 mr-1 text-gray-500" />
              <span className="text-sm text-gray-700">Public - Visible to everyone</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <SafeIcon icon={FiEyeOff} className="w-4 h-4 ml-2 mr-1 text-gray-500" />
              <span className="text-sm text-gray-700">Private - Only visible to you</span>
            </label>
          </div>
        </div>

        {/* Publishing Action */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publishing Action
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="publishAction"
                value="publish"
                checked={publishAction === 'publish'}
                onChange={(e) => setPublishAction(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                {isEditing ? 'Update immediately' : 'Publish immediately'}
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="publishAction"
                value="draft"
                checked={publishAction === 'draft'}
                onChange={(e) => setPublishAction(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Save as draft</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="publishAction"
                value="schedule"
                checked={publishAction === 'schedule'}
                onChange={(e) => setPublishAction(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Schedule for later</span>
            </label>
          </div>
        </div>

        {/* Schedule Settings */}
        {publishAction === 'schedule' && (
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 inline mr-1" />
              Schedule Date & Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            {scheduleDate && scheduleTime && (
              <p className="text-xs text-gray-500 mt-2">
                Will be published on {format(new Date(`${scheduleDate}T${scheduleTime}`), 'PPP p')}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t pt-4 space-y-3">
          {/* Main Action Button */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={!isValidSchedule}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
              isValidSchedule
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <SafeIcon icon={getActionButtonIcon()} className="w-5 h-5" />
            <span>{getActionButtonText()}</span>
          </button>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSaveDraft({ action: 'draft', visibility })}
              className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            
            <button
              type="button"
              onClick={onPreview}
              className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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

export default PublishingControlPanel;