import React from 'react';
import { Calendar, CheckSquare, User, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockSessions, mockTasks, mockClients } from '../../data/mockData';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentClient = mockClients[0]; // Assume first client is logged in
  
  const clientSessions = mockSessions.filter(session => 
    session.clientIds.includes(currentClient.id)
  );
  
  const clientTasks = mockTasks.filter(task => task.clientId === currentClient.id);
  
  const upcomingSessions = clientSessions
    .filter(session => session.status === 'scheduled' && new Date(session.date) >= new Date())
    .slice(0, 3);

  const pendingTasks = clientTasks.filter(task => task.status !== 'completed');
  const completedTasksCount = clientTasks.filter(task => task.status === 'completed').length;

  const statCards = [
    {
      title: 'Total Sessions',
      value: currentClient.totalSessions,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Upcoming Sessions',
      value: upcomingSessions.length,
      icon: Calendar,
      color: 'bg-emerald-500'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.length,
      icon: CheckSquare,
      color: 'bg-orange-500'
    },
    {
      title: 'Completed Tasks',
      value: completedTasksCount,
      icon: Target,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentClient.name}</h1>
          <p className="text-gray-600 mt-1">Here's your coaching progress and upcoming activities.</p>
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
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div 
                  key={session.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/sessions/${session.id}`)}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {session.type === 'group' ? (
                        <User className="text-blue-600" size={20} />
                      ) : (
                        <Calendar className="text-blue-600" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{session.title}</p>
                    <p className="text-sm text-gray-500">
                      {session.type === 'group' ? 'Group Session' : 'One-on-One Session'}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                    <p className="text-xs text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming sessions</h3>
                <p className="mt-1 text-sm text-gray-500">Check back later for new sessions.</p>
              </div>
            )}
          </div>
        </div>

        {/* Goals & Tasks */}
        <div className="space-y-6">
          {/* Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h3>
            <div className="space-y-3">
              {currentClient.businessGoals.map((goal, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
              <button 
                onClick={() => navigate('/tasks')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {pendingTasks.slice(0, 4).map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{task.priority} priority</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <div className="text-center py-4">
                  <CheckSquare className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">All caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;