import { User, Client, Session, Task, Notification, DashboardStats } from '../types';

export const mockCoach: User = {
  id: 'coach-1',
  name: 'Sarah Johnson',
  email: 'sarah@coachpro.com',
  role: 'coach',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  phone: '+1 (555) 123-4567',
  joinedAt: '2024-01-15'
};

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 234-5678',
    joinedAt: '2024-02-01',
    businessGoals: ['Increase sales by 20%', 'Expand team leadership skills', 'Improve work-life balance'],
    industry: 'Technology',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 12,
    nextSessionDate: '2025-01-20'
  },
  {
    id: 'client-2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 345-6789',
    joinedAt: '2024-01-20',
    businessGoals: ['Develop public speaking skills', 'Launch new product line', 'Build strategic partnerships'],
    industry: 'Marketing',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 8,
    nextSessionDate: '2025-01-18'
  },
  {
    id: 'client-3',
    name: 'Emily Chen',
    email: 'emily@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 456-7890',
    joinedAt: '2024-03-10',
    businessGoals: ['Transition to executive role', 'Improve team communication', 'Develop strategic thinking'],
    industry: 'Finance',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 15,
    nextSessionDate: '2025-01-22'
  },
  {
    id: 'client-4',
    name: 'Michael Rodriguez',
    email: 'michael@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 567-8901',
    joinedAt: '2024-02-15',
    businessGoals: ['Scale startup operations', 'Secure Series A funding', 'Build company culture'],
    industry: 'Startup',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 6,
    nextSessionDate: '2025-01-25'
  },
  {
    id: 'client-5',
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 678-9012',
    joinedAt: '2024-01-30',
    businessGoals: ['Career transition to consulting', 'Build personal brand', 'Develop client acquisition skills'],
    industry: 'Consulting',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 10,
    nextSessionDate: '2025-01-21'
  },
  {
    id: 'client-6',
    name: 'David Park',
    email: 'david@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 789-0123',
    joinedAt: '2024-03-05',
    businessGoals: ['Improve team productivity', 'Develop leadership presence', 'Streamline operations'],
    industry: 'Operations',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 7,
    nextSessionDate: '2025-01-23'
  },
  {
    id: 'client-7',
    name: 'Rachel Green',
    email: 'rachel@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1 (555) 890-1234',
    joinedAt: '2024-02-28',
    businessGoals: ['Build high-performing team', 'Enhance communication skills', 'Drive innovation'],
    industry: 'Product Management',
    coachId: 'coach-1',
    status: 'active',
    totalSessions: 9,
    nextSessionDate: '2025-01-24'
  }
];

export const mockSessions: Session[] = [
  // One-on-one sessions
  {
    id: 'session-1',
    title: 'Sales Strategy Deep Dive',
    description: 'Comprehensive review of current sales processes and optimization strategies',
    date: '2025-01-20',
    time: '10:00',
    duration: 60,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-1'],
    agenda: ['Review Q4 performance', 'Identify growth opportunities', 'Create action plan'],
    notes: 'Focus on lead qualification process improvements'
  },
  {
    id: 'session-2',
    title: 'Product Launch Planning',
    description: 'Strategic planning for upcoming product launch',
    date: '2025-01-18',
    time: '09:00',
    duration: 45,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-2'],
    agenda: ['Market research review', 'Go-to-market strategy', 'Timeline development'],
    notes: 'Prepare competitive analysis document'
  },
  {
    id: 'session-3',
    title: 'Executive Presence Workshop',
    description: 'Building confidence and executive presence for career advancement',
    date: '2025-01-15',
    time: '11:00',
    duration: 60,
    type: 'one-on-one',
    status: 'completed',
    coachId: 'coach-1',
    clientIds: ['client-3'],
    agenda: ['Communication style assessment', 'Executive presence techniques', 'Practice sessions'],
    notes: 'Great progress on public speaking confidence. Continue practicing elevator pitch.'
  },
  {
    id: 'session-4',
    title: 'Startup Scaling Strategies',
    description: 'Discussing growth strategies and operational scaling for startup',
    date: '2025-01-25',
    time: '14:00',
    duration: 75,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-4'],
    agenda: ['Current challenges review', 'Scaling framework', 'Team structure planning', 'Funding preparation'],
    notes: 'Prepare Series A pitch deck review'
  },
  {
    id: 'session-5',
    title: 'Personal Branding Strategy',
    description: 'Developing personal brand for consulting career transition',
    date: '2025-01-21',
    time: '13:00',
    duration: 60,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-5'],
    agenda: ['Brand positioning', 'Content strategy', 'Network building', 'Client acquisition plan'],
    notes: 'Focus on LinkedIn optimization and thought leadership content'
  },
  {
    id: 'session-6',
    title: 'Operations Excellence Review',
    description: 'Quarterly review of operational improvements and team productivity',
    date: '2025-01-23',
    time: '15:30',
    duration: 90,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-6'],
    agenda: ['KPI review', 'Process optimization', 'Team feedback analysis', 'Q1 planning'],
    notes: 'Bring latest productivity metrics and team survey results'
  },
  {
    id: 'session-7',
    title: 'Product Innovation Workshop',
    description: 'Exploring innovation frameworks and product development strategies',
    date: '2025-01-24',
    time: '10:30',
    duration: 60,
    type: 'one-on-one',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-7'],
    agenda: ['Innovation audit', 'Design thinking workshop', 'Roadmap prioritization', 'Team alignment'],
    notes: 'Prepare current product roadmap and user feedback summary'
  },
  {
    id: 'session-8',
    title: 'Quarterly Business Review',
    description: 'Comprehensive review of business performance and goal setting',
    date: '2025-01-12',
    time: '16:00',
    duration: 90,
    type: 'one-on-one',
    status: 'completed',
    coachId: 'coach-1',
    clientIds: ['client-1'],
    agenda: ['Q4 results analysis', 'Goal achievement review', 'Q1 objectives setting', 'Resource planning'],
    notes: 'Exceeded sales targets by 15%. Focus on team expansion for Q1.'
  },
  {
    id: 'session-9',
    title: 'Communication Skills Assessment',
    description: 'Evaluating and improving communication effectiveness',
    date: '2025-01-10',
    time: '14:30',
    duration: 45,
    type: 'one-on-one',
    status: 'completed',
    coachId: 'coach-1',
    clientIds: ['client-2'],
    agenda: ['Communication style assessment', 'Feedback techniques', 'Presentation skills', 'Action plan'],
    notes: 'Strong analytical communication. Work on storytelling and emotional connection.'
  },
  {
    id: 'session-10',
    title: 'Career Transition Planning',
    description: 'Strategic planning for executive role transition',
    date: '2025-01-08',
    time: '11:30',
    duration: 75,
    type: 'one-on-one',
    status: 'completed',
    coachId: 'coach-1',
    clientIds: ['client-3'],
    agenda: ['Skills gap analysis', 'Executive readiness assessment', 'Transition timeline', 'Stakeholder mapping'],
    notes: 'Ready for VP role. Schedule follow-up with leadership team introductions.'
  },

  // Group sessions
  {
    id: 'session-11',
    title: 'Leadership Excellence Masterclass',
    description: 'Comprehensive group session on advanced leadership techniques and team management strategies',
    date: '2025-01-22',
    time: '14:00',
    duration: 120,
    type: 'group',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-2', 'client-3', 'client-5', 'client-6'],
    agenda: [
      'Leadership styles assessment and discussion',
      'Team communication strategies workshop',
      'Conflict resolution techniques and role-play',
      'Building high-performance teams',
      'Emotional intelligence in leadership',
      'Action planning and peer accountability'
    ],
    notes: 'Interactive workshop with breakout sessions and peer learning. Prepare leadership assessment tools and case studies.'
  },
  {
    id: 'session-12',
    title: 'Entrepreneurship & Innovation Summit',
    description: 'Group coaching session focused on entrepreneurial mindset, innovation, and business growth strategies',
    date: '2025-01-26',
    time: '09:00',
    duration: 150,
    type: 'group',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-1', 'client-4', 'client-5', 'client-7'],
    agenda: [
      'Entrepreneurial mindset and opportunity recognition',
      'Innovation frameworks and design thinking',
      'Business model canvas workshop',
      'Funding strategies and investor readiness',
      'Scaling operations and team building',
      'Peer mastermind and networking session'
    ],
    notes: 'Bring business model templates and pitch deck examples. Include time for peer feedback and collaboration opportunities.'
  },
  {
    id: 'session-13',
    title: 'Women in Leadership Circle',
    description: 'Monthly group session for female leaders focusing on career advancement and leadership challenges',
    date: '2025-01-17',
    time: '18:00',
    duration: 90,
    type: 'group',
    status: 'completed',
    coachId: 'coach-1',
    clientIds: ['client-3', 'client-5', 'client-7'],
    agenda: [
      'Navigating workplace dynamics',
      'Building executive presence',
      'Negotiation strategies and salary discussions',
      'Work-life integration strategies',
      'Peer support and accountability check-in'
    ],
    notes: 'Excellent engagement and peer support. Schedule follow-up individual sessions for salary negotiation prep.'
  },
  {
    id: 'session-14',
    title: 'Strategic Planning Workshop',
    description: 'Quarterly group session for strategic thinking and business planning',
    date: '2025-01-29',
    time: '13:00',
    duration: 180,
    type: 'group',
    status: 'scheduled',
    coachId: 'coach-1',
    clientIds: ['client-1', 'client-2', 'client-4', 'client-6'],
    agenda: [
      'Strategic thinking frameworks',
      'SWOT analysis workshop',
      'Goal setting and OKR methodology',
      'Resource allocation and prioritization',
      'Risk assessment and mitigation planning',
      'Quarterly planning and accountability partnerships'
    ],
    notes: 'Half-day intensive workshop. Prepare strategic planning templates and industry case studies.'
  }
];

export const mockTasks: Task[] = [
  // Client 1 - Jane Doe (Technology)
  {
    id: 'task-1',
    title: 'Complete Market Research Analysis',
    description: 'Analyze competitor pricing and market positioning for new product line. Include SWOT analysis and competitive landscape mapping.',
    dueDate: '2025-01-25',
    status: 'in-progress',
    priority: 'high',
    clientId: 'client-1',
    sessionId: 'session-1',
    assignedBy: 'coach-1',
    createdAt: '2025-01-10'
  },
  {
    id: 'task-2',
    title: 'Sales Process Documentation',
    description: 'Document current sales process and identify bottlenecks. Create flowchart and improvement recommendations.',
    dueDate: '2025-01-28',
    status: 'pending',
    priority: 'high',
    clientId: 'client-1',
    sessionId: 'session-1',
    assignedBy: 'coach-1',
    createdAt: '2025-01-14'
  },
  {
    id: 'task-3',
    title: 'Team Performance Review',
    description: 'Conduct quarterly performance reviews with sales team members and compile feedback summary.',
    dueDate: '2025-01-30',
    status: 'completed',
    priority: 'medium',
    clientId: 'client-1',
    assignedBy: 'coach-1',
    createdAt: '2025-01-05'
  },

  // Client 2 - John Smith (Marketing)
  {
    id: 'task-4',
    title: 'Product Launch Timeline',
    description: 'Create detailed project timeline for product launch including milestones, dependencies, and resource allocation.',
    dueDate: '2025-01-22',
    status: 'in-progress',
    priority: 'high',
    clientId: 'client-2',
    sessionId: 'session-2',
    assignedBy: 'coach-1',
    createdAt: '2025-01-12'
  },
  {
    id: 'task-5',
    title: 'Competitive Analysis Report',
    description: 'Research top 5 competitors and analyze their marketing strategies, pricing, and positioning.',
    dueDate: '2025-01-26',
    status: 'pending',
    priority: 'medium',
    clientId: 'client-2',
    sessionId: 'session-2',
    assignedBy: 'coach-1',
    createdAt: '2025-01-15'
  },
  {
    id: 'task-6',
    title: 'Public Speaking Practice',
    description: 'Practice product pitch presentation and record for feedback. Focus on storytelling and audience engagement.',
    dueDate: '2025-01-24',
    status: 'completed',
    priority: 'medium',
    clientId: 'client-2',
    assignedBy: 'coach-1',
    createdAt: '2025-01-08'
  },

  // Client 3 - Emily Chen (Finance)
  {
    id: 'task-7',
    title: 'Executive Presence Assessment',
    description: 'Complete 360-degree feedback assessment and identify areas for executive presence improvement.',
    dueDate: '2025-01-20',
    status: 'completed',
    priority: 'medium',
    clientId: 'client-3',
    sessionId: 'session-3',
    assignedBy: 'coach-1',
    createdAt: '2025-01-08'
  },
  {
    id: 'task-8',
    title: 'Strategic Communication Plan',
    description: 'Develop communication strategy for executive transition announcement and stakeholder engagement.',
    dueDate: '2025-01-27',
    status: 'in-progress',
    priority: 'high',
    clientId: 'client-3',
    assignedBy: 'coach-1',
    createdAt: '2025-01-13'
  },
  {
    id: 'task-9',
    title: 'Leadership Skills Workshop Prep',
    description: 'Prepare materials and agenda for upcoming team leadership workshop. Include case studies and exercises.',
    dueDate: '2025-01-31',
    status: 'pending',
    priority: 'medium',
    clientId: 'client-3',
    assignedBy: 'coach-1',
    createdAt: '2025-01-16'
  },

  // Client 4 - Michael Rodriguez (Startup)
  {
    id: 'task-10',
    title: 'Series A Pitch Deck Review',
    description: 'Refine pitch deck for Series A funding round. Focus on market opportunity, traction, and financial projections.',
    dueDate: '2025-01-29',
    status: 'in-progress',
    priority: 'high',
    clientId: 'client-4',
    sessionId: 'session-4',
    assignedBy: 'coach-1',
    createdAt: '2025-01-11'
  },
  {
    id: 'task-11',
    title: 'Company Culture Framework',
    description: 'Define company values, culture principles, and implementation strategy for scaling team.',
    dueDate: '2025-02-05',
    status: 'pending',
    priority: 'medium',
    clientId: 'client-4',
    assignedBy: 'coach-1',
    createdAt: '2025-01-17'
  },
  {
    id: 'task-12',
    title: 'Operational Scaling Plan',
    description: 'Create detailed plan for scaling operations from 10 to 50 employees including processes and systems.',
    dueDate: '2025-02-10',
    status: 'pending',
    priority: 'high',
    clientId: 'client-4',
    assignedBy: 'coach-1',
    createdAt: '2025-01-18'
  },

  // Client 5 - Lisa Thompson (Consulting)
  {
    id: 'task-13',
    title: 'Personal Brand Audit',
    description: 'Conduct comprehensive audit of current personal brand across all platforms and identify improvement areas.',
    dueDate: '2025-01-23',
    status: 'completed',
    priority: 'medium',
    clientId: 'client-5',
    sessionId: 'session-5',
    assignedBy: 'coach-1',
    createdAt: '2025-01-09'
  },
  {
    id: 'task-14',
    title: 'LinkedIn Content Strategy',
    description: 'Develop 3-month LinkedIn content calendar focusing on thought leadership and industry insights.',
    dueDate: '2025-01-28',
    status: 'in-progress',
    priority: 'high',
    clientId: 'client-5',
    assignedBy: 'coach-1',
    createdAt: '2025-01-14'
  },
  {
    id: 'task-15',
    title: 'Client Acquisition Framework',
    description: 'Create systematic approach for identifying, approaching, and converting potential consulting clients.',
    dueDate: '2025-02-02',
    status: 'pending',
    priority: 'high',
    clientId: 'client-5',
    assignedBy: 'coach-1',
    createdAt: '2025-01-19'
  },

  // Client 6 - David Park (Operations)
  {
    id: 'task-16',
    title: 'Process Optimization Analysis',
    description: 'Map current operational processes and identify automation and efficiency opportunities.',
    dueDate: '2025-01-26',
    status: 'in-progress',
    priority: 'medium',
    clientId: 'client-6',
    sessionId: 'session-6',
    assignedBy: 'coach-1',
    createdAt: '2025-01-12'
  },
  {
    id: 'task-17',
    title: 'Team Productivity Metrics',
    description: 'Implement productivity tracking system and establish baseline metrics for team performance.',
    dueDate: '2025-01-30',
    status: 'pending',
    priority: 'medium',
    clientId: 'client-6',
    assignedBy: 'coach-1',
    createdAt: '2025-01-15'
  },

  // Client 7 - Rachel Green (Product Management)
  {
    id: 'task-18',
    title: 'Innovation Workshop Planning',
    description: 'Design and plan innovation workshop for product team including agenda, exercises, and expected outcomes.',
    dueDate: '2025-01-27',
    status: 'in-progress',
    priority: 'medium',
    clientId: 'client-7',
    sessionId: 'session-7',
    assignedBy: 'coach-1',
    createdAt: '2025-01-13'
  },
  {
    id: 'task-19',
    title: 'Product Roadmap Review',
    description: 'Conduct quarterly product roadmap review and prioritization based on user feedback and business goals.',
    dueDate: '2025-02-01',
    status: 'pending',
    priority: 'high',
    clientId: 'client-7',
    assignedBy: 'coach-1',
    createdAt: '2025-01-16'
  },
  {
    id: 'task-20',
    title: 'User Research Analysis',
    description: 'Analyze recent user research findings and create actionable insights for product development.',
    dueDate: '2025-01-25',
    status: 'completed',
    priority: 'medium',
    clientId: 'client-7',
    assignedBy: 'coach-1',
    createdAt: '2025-01-07'
  },

  // Additional overdue tasks for demonstration
  {
    id: 'task-21',
    title: 'Quarterly Goal Setting',
    description: 'Define and document Q1 objectives and key results (OKRs) with measurable outcomes.',
    dueDate: '2025-01-15',
    status: 'pending',
    priority: 'high',
    clientId: 'client-1',
    assignedBy: 'coach-1',
    createdAt: '2025-01-01'
  },
  {
    id: 'task-22',
    title: 'Team Feedback Survey',
    description: 'Conduct anonymous team feedback survey and compile results for leadership review.',
    dueDate: '2025-01-12',
    status: 'pending',
    priority: 'medium',
    clientId: 'client-6',
    assignedBy: 'coach-1',
    createdAt: '2025-01-02'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Session Reminder',
    message: 'You have a session with Jane Doe tomorrow at 10:00 AM',
    type: 'session',
    isRead: false,
    createdAt: '2025-01-19T09:00:00Z',
    userId: 'coach-1'
  },
  {
    id: 'notif-2',
    title: 'Task Completed',
    message: 'Emily Chen completed "Practice Elevator Pitch" task',
    type: 'task',
    isRead: false,
    createdAt: '2025-01-18T15:30:00Z',
    userId: 'coach-1'
  },
  {
    id: 'notif-3',
    title: 'New Group Session',
    message: 'Leadership Masterclass scheduled for January 22nd',
    type: 'session',
    isRead: true,
    createdAt: '2025-01-16T11:20:00Z',
    userId: 'coach-1'
  },
  {
    id: 'notif-4',
    title: 'Task Overdue',
    message: 'Quarterly Goal Setting task is overdue for Jane Doe',
    type: 'task',
    isRead: false,
    createdAt: '2025-01-16T08:00:00Z',
    userId: 'coach-1'
  },
  {
    id: 'notif-5',
    title: 'Group Session Reminder',
    message: 'Entrepreneurship Summit starts in 2 hours with 4 participants',
    type: 'session',
    isRead: false,
    createdAt: '2025-01-26T07:00:00Z',
    userId: 'coach-1'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalClients: 7,
  sessionsThisMonth: 18,
  completedTasks: 12,
  upcomingSessions: 8,
  overdueTasksCount: 2
};

export const currentUser = mockCoach;