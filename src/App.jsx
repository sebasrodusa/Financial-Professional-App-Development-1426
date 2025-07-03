import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { questConfig } from './config/questConfig';
import ProtectedRoute from './components/auth/ProtectedRoute';

import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import ProDirectory from './pages/public/ProDirectory';
import ProProfile from './pages/public/ProProfile';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Events from './pages/public/Events';
import EventDetail from './pages/public/EventDetail';
import Testimonials from './pages/public/Testimonials';

// Auth Pages - Quest SDK + Traditional
import QuestLogin from './pages/auth/QuestLogin';
import Login from './pages/auth/Login'; // Traditional login fallback
import QuestOnboarding from './pages/auth/QuestOnboarding';
import Register from './pages/auth/Register';

// Professional Dashboard
import Dashboard from './pages/dashboard/Dashboard';
import ClientManagement from './pages/dashboard/ClientManagement';
import ClientDetail from './pages/dashboard/ClientDetail';
import Reports from './pages/dashboard/Reports';
import MyEvents from './pages/dashboard/MyEvents';
import MyBlog from './pages/dashboard/MyBlog';
import BlogEditor from './pages/dashboard/BlogEditor';
import Profile from './pages/dashboard/Profile';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ContentManagement from './pages/admin/ContentManagement';
import Analytics from './pages/admin/Analytics';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType={questConfig.API_TYPE}
    >
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="professionals" element={<ProDirectory />} />
                  <Route path="professionals/:id" element={<ProProfile />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:id" element={<BlogPost />} />
                  <Route path="events" element={<Events />} />
                  <Route path="events/:id" element={<EventDetail />} />
                  <Route path="testimonials" element={<Testimonials />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<QuestLogin />} />
                <Route path="/login/traditional" element={<Login />} />
                <Route path="/onboarding" element={<QuestOnboarding />} />
                <Route path="/register" element={<Register />} />

                {/* Professional Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="clients" element={<ClientManagement />} />
                  <Route path="clients/:id" element={<ClientDetail />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="events" element={<MyEvents />} />
                  <Route path="blog" element={<MyBlog />} />
                  <Route path="blog/new" element={<BlogEditor />} />
                  <Route path="blog/edit/:id" element={<BlogEditor />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Admin Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="content" element={<ContentManagement />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;