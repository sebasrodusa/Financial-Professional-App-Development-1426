import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiSave, FiCamera, FiEdit2, FiPlus, FiX, FiLink, FiGlobe, FiCalendar, FiAward } = FiIcons;

const ProfileManagement = () => {
  const { user, updateProfile } = useAuth();
  const { updateProfessional } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    defaultValues: user
  });

  const [specialties, setSpecialties] = useState(user?.specialties || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);
  const [education, setEducation] = useState(user?.education || []);
  const [languages, setLanguages] = useState(user?.languages || []);
  const [socialLinks, setSocialLinks] = useState(user?.socialLinks || {
    linkedin: '',
    instagram: '',
    facebook: ''
  });

  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        specialties,
        certifications,
        education,
        languages,
        socialLinks,
        updatedAt: new Date().toISOString()
      };

      updateProfile(updatedData);
      updateProfessional(user.id, updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(user);
    setSpecialties(user?.specialties || []);
    setCertifications(user?.certifications || []);
    setEducation(user?.education || []);
    setLanguages(user?.languages || []);
    setSocialLinks(user?.socialLinks || { linkedin: '', instagram: '', facebook: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(user);
    setSpecialties(user?.specialties || []);
    setCertifications(user?.certifications || []);
    setEducation(user?.education || []);
    setLanguages(user?.languages || []);
    setSocialLinks(user?.socialLinks || { linkedin: '', instagram: '', facebook: '' });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (index) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      setCertifications([...certifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim() && newEducation.year.trim()) {
      setEducation([...education, { ...newEducation }]);
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiUser },
    { id: 'professional', label: 'Professional', icon: FiBriefcase },
    { id: 'social', label: 'Social & Links', icon: FiLink },
    { id: 'credentials', label: 'Credentials', icon: FiAward }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and settings</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiEdit2} className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              form="profile-form"
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={watch('avatar') || user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors cursor-pointer">
                  <SafeIcon icon={FiCamera} className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {isEditing ? 'Click the camera icon to update your photo' : 'Professional profile photo'}
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
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

            <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        type="tel"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        {...register('location', { required: 'Location is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        {...register('company', { required: 'Company is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                      {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                    <textarea
                      {...register('bio')}
                      rows={4}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      placeholder="Tell clients about your experience and expertise..."
                    />
                  </div>
                </div>
              )}

              {/* Professional Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <input
                        {...register('experience', { valueAsNumber: true })}
                        type="number"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
                      <input
                        {...register('hourlyRate')}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                        placeholder="$250"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <input
                      {...register('availability')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      placeholder="Monday-Friday, 9 AM - 6 PM EST"
                    />
                  </div>

                  {/* Specialties */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{specialty}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeSpecialty(index)}
                              className="text-primary-600 hover:text-primary-800"
                            >
                              <SafeIcon icon={FiX} className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Add specialty"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                        />
                        <button
                          type="button"
                          onClick={addSpecialty}
                          className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{language}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeLanguage(index)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <SafeIcon icon={FiX} className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Add language"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                        />
                        <button
                          type="button"
                          onClick={addLanguage}
                          className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social & Links Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calendar Booking Link</label>
                    <input
                      {...register('calendarLink')}
                      type="url"
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      placeholder="https://calendly.com/yourname/consultation"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Link where clients can schedule consultations with you
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Profile</label>
                      <input
                        type="url"
                        value={socialLinks.instagram}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Profile</label>
                      <input
                        type="url"
                        value={socialLinks.facebook}
                        onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                        placeholder="https://facebook.com/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Credentials Tab */}
              {activeTab === 'credentials' && (
                <div className="space-y-6">
                  {/* Certifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{cert}</span>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeCertification(index)}
                              className="text-yellow-700 hover:text-yellow-900"
                            >
                              <SafeIcon icon={FiX} className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Add certification (e.g., CFP, CPA)"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                        />
                        <button
                          type="button"
                          onClick={addCertification}
                          className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <div className="space-y-3 mb-4">
                      {education.map((edu, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">{edu.year}</p>
                          </div>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <SafeIcon icon={FiX} className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Degree"
                          />
                          <input
                            type="text"
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={newEducation.year}
                            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Year"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addEducation}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                          <span>Add Education</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;