import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Mock professionals
    const mockProfessionals = [
      {
        id: '1',
        name: 'Sarah Johnson',
        title: 'Senior Financial Advisor',
        company: 'WealthMax Financial',
        email: 'sarah@wealthmax.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        bio: 'Experienced financial advisor specializing in retirement planning and investment strategies.',
        specialties: ['Retirement Planning', 'Investment Strategy', 'Tax Planning'],
        certifications: ['CFP', 'CPA'],
        experience: 12,
        rating: 4.9,
        reviewCount: 127
      },
      {
        id: '2',
        name: 'Michael Chen',
        title: 'Investment Specialist',
        company: 'Future Finance Group',
        email: 'michael@futurefinance.com',
        phone: '+1 (555) 987-6543',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        bio: 'Helping clients build wealth through strategic investment planning and portfolio management.',
        specialties: ['Portfolio Management', 'Estate Planning', 'Risk Management'],
        certifications: ['CFA', 'CFP'],
        experience: 8,
        rating: 4.8,
        reviewCount: 89
      }
    ];

    // Mock clients with sample financial data
    const mockClients = [
      {
        id: uuidv4(),
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 111-2222',
        address: '123 Main St, New York, NY 10001',
        dateOfBirth: '1985-06-15',
        createdAt: new Date().toISOString(),
        financialData: {
          // Cash Flow
          salary: 8500,
          businessIncome: 2000,
          investmentIncome: 500,
          otherIncome: 0,
          housing: 2800,
          transportation: 800,
          food: 600,
          utilities: 300,
          insurance: 400,
          entertainment: 500,
          healthcare: 300,
          miscellaneous: 400,
          // Balance Sheet
          cashSavings: 25000,
          checking: 5000,
          investments: 45000,
          retirement: 85000,
          realEstate: 350000,
          vehicles: 25000,
          personalProperty: 15000,
          otherAssets: 5000,
          mortgage: 280000,
          autoLoans: 15000,
          creditCards: 8000,
          studentLoans: 25000,
          personalLoans: 0,
          otherDebts: 2000,
          // Goals & Insurance
          retirementGoal: 1500000,
          retirementAge: 65,
          emergencyFundGoal: 50000,
          educationGoal: 100000,
          homeGoal: 0,
          vacationGoal: 10000,
          termLifeCoverage: 500000,
          termLifePremium: 150,
          wholeLifeCoverage: 0,
          wholeLifePremium: 0,
          hasWill: true,
          hasTrust: false,
          hasPowerOfAttorney: true,
          hasHealthcareDirective: true,
          hasBeneficiaryDesignations: true,
          hasEstateplan: false,
          riskTolerance: 'moderate',
          investmentTimeline: 'long'
        },
        lastFinancialUpdate: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1 (555) 333-4444',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        dateOfBirth: '1990-03-22',
        createdAt: new Date().toISOString()
      }
    ];

    // Mock blog posts
    const mockBlogPosts = [
      {
        id: '1',
        title: '10 Essential Financial Planning Tips for 2024',
        slug: '10-essential-financial-planning-tips-2024',
        excerpt: 'Discover the key strategies to secure your financial future in the coming year.',
        content: '<p>Financial planning is more important than ever in 2024...</p>',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
        author: 'Sarah Johnson',
        authorId: '1',
        publishedAt: new Date().toISOString(),
        tags: ['Financial Planning', 'Investment', 'Savings'],
        readTime: 5,
        featured: true
      },
      {
        id: '2',
        title: 'Understanding Market Volatility: A Guide for Investors',
        slug: 'understanding-market-volatility-guide-investors',
        excerpt: 'Learn how to navigate market fluctuations and protect your investments.',
        content: '<p>Market volatility can be intimidating for investors...</p>',
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
        author: 'Michael Chen',
        authorId: '2',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['Investment', 'Market Analysis', 'Risk Management'],
        readTime: 7,
        featured: false
      }
    ];

    // Mock events
    const mockEvents = [
      {
        id: '1',
        title: 'Financial Planning Workshop',
        description: 'Learn the fundamentals of financial planning in this comprehensive workshop.',
        date: new Date(Date.now() + 7 * 86400000).toISOString(),
        time: '2:00 PM - 4:00 PM',
        location: 'Online Event',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
        organizer: 'Sarah Johnson',
        organizerId: '1',
        capacity: 100,
        registered: 45
      },
      {
        id: '2',
        title: 'Investment Strategies Seminar',
        description: 'Explore advanced investment strategies for building long-term wealth.',
        date: new Date(Date.now() + 14 * 86400000).toISOString(),
        time: '10:00 AM - 12:00 PM',
        location: 'San Francisco, CA',
        price: '$99',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        organizer: 'Michael Chen',
        organizerId: '2',
        capacity: 50,
        registered: 23
      }
    ];

    // Mock testimonials
    const mockTestimonials = [
      {
        id: '1',
        name: 'Jennifer Williams',
        title: 'Small Business Owner',
        content: 'Sarah helped me restructure my business finances and plan for retirement. Her expertise saved me thousands in taxes!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        professionalId: '1'
      },
      {
        id: '2',
        name: 'Robert Davis',
        title: 'Retired Engineer',
        content: 'Michael\'s investment strategies helped me grow my portfolio by 25% last year. Highly recommend his services!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        professionalId: '2'
      }
    ];

    setProfessionals(mockProfessionals);
    setClients(mockClients);
    setBlogPosts(mockBlogPosts);
    setEvents(mockEvents);
    setTestimonials(mockTestimonials);
  };

  // Client management
  const addClient = (clientData) => {
    const newClient = {
      id: uuidv4(),
      ...clientData,
      createdAt: new Date().toISOString()
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updateClient = (id, updates) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    );
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  // Report management
  const addReport = (reportData) => {
    const newReport = {
      id: uuidv4(),
      ...reportData,
      createdAt: new Date().toISOString()
    };
    setReports(prev => [...prev, newReport]);
    return newReport;
  };

  // Event management
  const addEvent = (eventData) => {
    const newEvent = {
      id: uuidv4(),
      ...eventData,
      createdAt: new Date().toISOString()
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  // Blog management
  const addBlogPost = (postData) => {
    const newPost = {
      id: uuidv4(),
      ...postData,
      publishedAt: new Date().toISOString()
    };
    setBlogPosts(prev => [...prev, newPost]);
    return newPost;
  };

  const updateBlogPost = (id, updates) => {
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === id ? { ...post, ...updates } : post
      )
    );
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const value = {
    clients,
    reports,
    events,
    blogPosts,
    testimonials,
    professionals,
    addClient,
    updateClient,
    deleteClient,
    addReport,
    addEvent,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};