export interface User {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'client';
  avatar?: string;
  phone?: string;
  joinedAt: string;
}

export interface Client extends User {
  businessGoals: string[];
  industry: string;
  coachId: string;
  status: 'active' | 'inactive';
  totalSessions: number;
  nextSessionDate?: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'one-on-one' | 'group';
  status: 'scheduled' | 'completed' | 'cancelled';
  coachId: string;
  clientIds: string[];
  agenda: string[];
  notes?: string;
  attachments?: Attachment[];
  createdAt?: any; // Firestore Timestamp or ISO string
  updatedAt?: any; // Firestore Timestamp or ISO string
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  clientId: string;
  sessionId?: string | null;
  assignedBy: string;
  createdAt: string | any; // Can be Firestore Timestamp or ISO string
  updatedAt?: any; // Firestore Timestamp or ISO string
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'session' | 'task' | 'general';
  isRead: boolean;
  createdAt: string;
  userId: string;
}

export interface DashboardStats {
  totalClients: number;
  sessionsThisMonth: number;
  completedTasks: number;
  upcomingSessions: number;
  overdueTasksCount: number;
}