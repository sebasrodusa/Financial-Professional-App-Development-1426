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
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogTags, setBlogTags] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Initialize blog categories
    const mockCategories = [
      {
        id: '1',
        name: 'Financial Planning',
        slug: 'financial-planning',
        color: '#3B82F6',
        postCount: 5
      },
      {
        id: '2',
        name: 'Investment Strategy',
        slug: 'investment-strategy',
        color: '#10B981',
        postCount: 3
      },
      {
        id: '3',
        name: 'Retirement Planning',
        slug: 'retirement-planning',
        color: '#F59E0B',
        postCount: 4
      },
      {
        id: '4',
        name: 'Tax Strategy',
        slug: 'tax-strategy',
        color: '#8B5CF6',
        postCount: 2
      }
    ];

    // Initialize blog tags
    const mockTags = [
      { id: '1', name: 'Beginner', slug: 'beginner', postCount: 6 },
      { id: '2', name: 'Advanced', slug: 'advanced', postCount: 4 },
      { id: '3', name: 'Portfolio', slug: 'portfolio', postCount: 5 },
      { id: '4', name: '401k', slug: '401k', postCount: 3 },
      { id: '5', name: 'Stocks', slug: 'stocks', postCount: 4 },
      { id: '6', name: 'Bonds', slug: 'bonds', postCount: 2 },
      { id: '7', name: 'Real Estate', slug: 'real-estate', postCount: 3 },
      { id: '8', name: 'Savings', slug: 'savings', postCount: 5 }
    ];

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
        bio: 'Experienced financial advisor specializing in retirement planning and investment strategies. With over 12 years in the industry, Sarah has helped hundreds of clients achieve their financial goals.',
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
        bio: 'Helping clients build wealth through strategic investment planning and portfolio management. Michael specializes in modern portfolio theory and alternative investments.',
        specialties: ['Portfolio Management', 'Estate Planning', 'Risk Management'],
        certifications: ['CFA', 'CFP'],
        experience: 8,
        rating: 4.8,
        reviewCount: 89
      }
    ];

    // Enhanced mock blog posts with categories and tags
    const mockBlogPosts = [
      {
        id: '1',
        title: '10 Essential Financial Planning Tips for 2024',
        slug: '10-essential-financial-planning-tips-2024',
        excerpt: 'Discover the key strategies to secure your financial future in the coming year with these expert-recommended tips.',
        content: `
          <h2>Introduction</h2>
          <p>Financial planning is more important than ever in 2024. With economic uncertainty and changing market conditions, having a solid financial plan can make the difference between financial stress and financial freedom.</p>
          
          <h2>1. Build an Emergency Fund</h2>
          <p>Start by building an emergency fund that covers 3-6 months of living expenses. This fund should be easily accessible and kept in a high-yield savings account.</p>
          
          <h2>2. Maximize Retirement Contributions</h2>
          <p>Take advantage of tax-advantaged retirement accounts like 401(k)s and IRAs. For 2024, the contribution limits have increased, so make sure you're contributing as much as possible.</p>
          
          <h2>3. Review and Rebalance Your Portfolio</h2>
          <p>Regular portfolio rebalancing ensures your investment allocation aligns with your risk tolerance and financial goals.</p>
          
          <h2>Conclusion</h2>
          <p>Implementing these strategies early in the year will set you up for financial success. Remember, the best time to start is now!</p>
        `,
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
        author: 'Sarah Johnson',
        authorId: '1',
        publishedAt: new Date().toISOString(),
        categories: [mockCategories[0]],
        tags: [mockTags[0], mockTags[7], mockTags[3]],
        readTime: 5,
        featured: true,
        status: 'published',
        visibility: 'public',
        metaTitle: '10 Essential Financial Planning Tips for 2024 | Expert Advice',
        metaDescription: 'Discover expert-recommended financial planning strategies for 2024. Learn how to build emergency funds, maximize retirement contributions, and secure your financial future.',
        focusKeyword: 'financial planning 2024',
        ogImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop'
      },
      {
        id: '2',
        title: 'Understanding Market Volatility: A Guide for Investors',
        slug: 'understanding-market-volatility-guide-investors',
        excerpt: 'Learn how to navigate market fluctuations and protect your investments during volatile periods.',
        content: `
          <h2>What is Market Volatility?</h2>
          <p>Market volatility refers to the degree of price fluctuation in financial markets. While it can be intimidating for investors, understanding volatility is key to successful long-term investing.</p>
          
          <h2>Causes of Market Volatility</h2>
          <p>Several factors contribute to market volatility including economic indicators, geopolitical events, corporate earnings, and investor sentiment.</p>
          
          <h2>How to Manage Volatility</h2>
          <p>Diversification, dollar-cost averaging, and maintaining a long-term perspective are essential strategies for managing volatility in your portfolio.</p>
          
          <blockquote>
            <p>"The stock market is a voting machine in the short run, but a weighing machine in the long run." - Benjamin Graham</p>
          </blockquote>
          
          <h2>Building a Resilient Portfolio</h2>
          <p>Focus on quality investments, maintain adequate liquidity, and avoid emotional decision-making during volatile periods.</p>
        `,
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
        author: 'Michael Chen',
        authorId: '2',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        categories: [mockCategories[1]],
        tags: [mockTags[1], mockTags[2], mockTags[4]],
        readTime: 7,
        featured: false,
        status: 'published',
        visibility: 'public',
        metaTitle: 'Understanding Market Volatility: Complete Investor Guide',
        metaDescription: 'Learn how to navigate market volatility with expert strategies. Discover how to protect your investments and build a resilient portfolio during uncertain times.',
        focusKeyword: 'market volatility',
        ogImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop'
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

    setBlogCategories(mockCategories);
    setBlogTags(mockTags);
    setProfessionals(mockProfessionals);
    setClients(mockClients);
    setBlogPosts(mockBlogPosts);
    setEvents(mockEvents);
    setTestimonials(mockTestimonials);
  };

  // Blog category management
  const addBlogCategory = (category) => {
    setBlogCategories(prev => [...prev, category]);
  };

  const deleteBlogCategory = (categoryId) => {
    setBlogCategories(prev => prev.filter(cat => cat.id !== categoryId));
    // Remove category from all posts
    setBlogPosts(prev => prev.map(post => ({
      ...post,
      categories: post.categories?.filter(cat => cat.id !== categoryId) || []
    })));
  };

  // Blog tag management
  const addBlogTag = (tag) => {
    setBlogTags(prev => [...prev, tag]);
  };

  const deleteBlogTag = (tagId) => {
    setBlogTags(prev => prev.filter(tag => tag.id !== tagId));
    // Remove tag from all posts
    setBlogPosts(prev => prev.map(post => ({
      ...post,
      tags: post.tags?.filter(tag => tag.id !== tagId) || []
    })));
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
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
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
      createdAt: new Date().toISOString()
    };
    
    if (!newPost.slug && newPost.title) {
      newPost.slug = newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    setBlogPosts(prev => [...prev, newPost]);
    
    // Update category and tag post counts
    postData.categories?.forEach(category => {
      setBlogCategories(prev => prev.map(cat => 
        cat.id === category.id ? { ...cat, postCount: (cat.postCount || 0) + 1 } : cat
      ));
    });
    
    postData.tags?.forEach(tag => {
      setBlogTags(prev => prev.map(t => 
        t.id === tag.id ? { ...t, postCount: (t.postCount || 0) + 1 } : t
      ));
    });
    
    return newPost;
  };

  const updateBlogPost = (id, updates) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const deleteBlogPost = (id) => {
    const post = blogPosts.find(p => p.id === id);
    
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    
    // Update category and tag post counts
    if (post) {
      post.categories?.forEach(category => {
        setBlogCategories(prev => prev.map(cat => 
          cat.id === category.id ? { ...cat, postCount: Math.max(0, (cat.postCount || 0) - 1) } : cat
        ));
      });
      
      post.tags?.forEach(tag => {
        setBlogTags(prev => prev.map(t => 
          t.id === tag.id ? { ...t, postCount: Math.max(0, (t.postCount || 0) - 1) } : t
        ));
      });
    }
  };

  const value = {
    // Data
    clients,
    reports,
    events,
    blogPosts,
    blogCategories,
    blogTags,
    testimonials,
    professionals,

    // Client methods
    addClient,
    updateClient,
    deleteClient,

    // Report methods
    addReport,

    // Event methods
    addEvent,

    // Blog methods
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    // Blog category methods
    addBlogCategory,
    deleteBlogCategory,

    // Blog tag methods
    addBlogTag,
    deleteBlogTag
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};