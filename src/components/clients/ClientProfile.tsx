import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Target, 
  Edit, 
  Plus,
  CheckSquare,
  Clock,
  User
} from 'lucide-react';
import { mockClients, mockSessions, mockTasks } from '../../data/mockData';

const ClientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'tasks' | 'timeline'>('overview');

  const client = mockClients.find(c => c.id === id);
  
  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Client not found</p>
        <button
          onClick={() => navigate('/clients')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to clients
        </button>
      </div>
    );
  }

  const clientSessions = mockSessions.filter(session => 
    session.clientIds.includes(client.id)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const clientTasks = mockTasks.filter(task => task.clientId === client.id);
  const completedTasks = clientTasks.filter(task => task.status === 'completed');
  const pendingTasks = clientTasks.filter(task => task.status !== 'completed');

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'sessions', label: 'Sessions', count: clientSessions.length },
    { id: 'tasks', label: 'Tasks', count: clientTasks.length },
    { id: 'timeline', label: 'Timeline', count: null }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/clients')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-gray-600">{client.industry} • Client since {new Date(client.joinedAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={() => navigate(`/clients/${client.id}/edit`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Edit size={20} />
          <span>Edit</span>
        </button>
      </div>

      {/* Client Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
          />
          <div className="flex-1 mt-4 md:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-medium text-gray-900 mt-1">{client.email}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-medium text-gray-900 mt-1">{client.phone}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">Total Sessions</span>
                </div>
                <p className="font-medium text-gray-900 mt-1">{client.totalSessions}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                  <CheckSquare size={16} />
                  <span className="text-sm">Status</span>
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{completedTasks.length}</p>
            </div>
            <CheckSquare className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingTasks.length}</p>
            </div>
            <Clock className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Session</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {client.nextSessionDate ? new Date(client.nextSessionDate).toLocaleDateString() : 'Not scheduled'}
              </p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.businessGoals.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Target className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                      <p className="text-sm text-gray-700">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {clientSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="text-blue-500" size={20} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{session.title}</p>
                        <p className="text-sm text-gray-600">{new Date(session.date).toLocaleDateString()} • {session.duration} minutes</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        session.status === 'completed' ? 'bg-green-100 text-green-800' :
                        session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">All Sessions</h3>
                <button
                  onClick={() => navigate(`/sessions/new?clientId=${client.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus size={20} />
                  <span>Schedule Session</span>
                </button>
              </div>
              {clientSessions.map((session) => (
                <div 
                  key={session.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/sessions/${session.id}`)}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      session.type === 'group' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      {session.type === 'group' ? (
                        <User className={session.type === 'group' ? 'text-purple-600' : 'text-blue-600'} size={20} />
                      ) : (
                        <Calendar className="text-blue-600" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{session.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString()} at {session.time} • {session.duration} minutes
                    </p>
                    {session.type === 'group' && (
                      <p className="text-sm text-purple-600">Group Session</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    session.status === 'completed' ? 'bg-green-100 text-green-800' :
                    session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">All Tasks</h3>
                <button
                  onClick={() => navigate(`/tasks/new?clientId=${client.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus size={20} />
                  <span>Assign Task</span>
                </button>
              </div>
              {clientTasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'in-progress' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()} • 
                      <span className="capitalize"> {task.priority} priority</span>
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Client Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {/* Combine sessions and tasks, sort by date */}
                  {[...clientSessions, ...clientTasks]
                    .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
                    .slice(0, 10)
                    .map((item, index) => {
                      const isSession = 'clientIds' in item;
                      return (
                        <div key={`${isSession ? 'session' : 'task'}-${item.id}`} className="relative flex items-start">
                          <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-white ${
                            isSession 
                              ? (item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500')
                              : (item.status === 'completed' ? 'bg-green-500' : 
                                 item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400')
                          }`}></div>
                          <div className="ml-10 bg-white border border-gray-200 rounded-lg p-4 w-full">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                {isSession ? (item as any).title : (item as any).title}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {new Date(isSession ? (item as any).date : (item as any).createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {isSession 
                                ? `${(item as any).type} session • ${(item as any).duration} minutes`
                                : `Task • ${(item as any).priority} priority`
                              }
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status.replace('-', ' ')}
                              </span>
                              <button
                                onClick={() => navigate(isSession ? `/sessions/${item.id}` : `/tasks/${item.id}`)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                View details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;