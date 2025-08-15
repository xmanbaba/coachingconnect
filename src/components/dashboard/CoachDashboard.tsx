import React from 'react';
import { Calendar, Users, CheckSquare, Clock, AlertTriangle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockDashboardStats, mockClients, mockSessions, mockTasks } from '../../data/mockData';

const CoachDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const upcomingSessions = mockSessions
    .filter(session => session.status === 'scheduled' && new Date(session.date) >= new Date())
    .slice(0, 3);

  const recentTasks = mockTasks
    .filter(task => task.status !== 'completed')
    .slice(0, 4);

  const overdueTasks = mockTasks.filter(task => 
    task.status !== 'completed' && new Date(task.dueDate) < new Date()
  );

  const statCards = [
    {
      title: 'Total Clients',
      value: mockDashboardStats.totalClients,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Sessions This Month',
      value: mockDashboardStats.sessionsThisMonth,
      icon: Calendar,
      color: 'bg-emerald-500',
      change: '+8%'
    },
    {
      title: 'Completed Tasks',
      value: mockDashboardStats.completedTasks,
      icon: CheckSquare,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Upcoming Sessions',
      value: mockDashboardStats.upcomingSessions,
      icon: Clock,
      color: 'bg-orange-500',
      change: '2 today'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your coaching practice.</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => navigate('/sessions/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
            <button 
              onClick={() => navigate('/sessions')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session) => {
              const client = mockClients.find(c => c.id === session.clientIds[0]);
              return (
                <div 
                  key={session.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/sessions/${session.id}`)}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={client?.avatar}
                      alt={client?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{session.title}</p>
                    <p className="text-sm text-gray-500">
                      {session.type === 'group' ? 'Group Session' : `with ${client?.name}`}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                    <p className="text-xs text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Overdue Tasks Alert */}
          {overdueTasks.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-500" size={20} />
                <h4 className="text-sm font-medium text-red-800">Overdue Tasks</h4>
              </div>
              <p className="text-sm text-red-700 mt-1">
                You have {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} that need attention.
              </p>
              <button 
                onClick={() => navigate('/tasks')}
                className="text-sm text-red-600 hover:text-red-500 font-medium mt-2"
              >
                Review tasks →
              </button>
            </div>
          )}

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
              <button 
                onClick={() => navigate('/tasks')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {recentTasks.map((task) => {
                const client = mockClients.find(c => c.id === task.clientId);
                return (
                  <div 
                    key={task.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500">{client?.name}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;