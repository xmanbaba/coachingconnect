import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, AlertCircle, Edit, Clock } from 'lucide-react';
import { mockTasks, mockClients } from '../../data/mockData';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const task = mockTasks.find(t => t.id === id);
  const client = task ? mockClients.find(c => c.id === task.clientId) : null;

  if (!task || !client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate('/tasks')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to tasks
        </button>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus: 'pending' | 'in-progress' | 'completed') => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      // In real app, this would update the task status
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/tasks')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <p className="text-gray-600">Task details and progress tracking</p>
        </div>
        <button
          onClick={() => navigate(`/tasks/${task.id}/edit`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Edit size={20} />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  task.status === 'completed' ? 'bg-green-500' :
                  task.status === 'in-progress' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`} />
                <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
                {isOverdue && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    Overdue
                  </span>
                )}
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{task.description}</p>
            </div>

            {/* Task Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400" size={16} />
                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-gray-400" size={16} />
                <div>
                  <p className="text-xs text-gray-500">Priority</p>
                  <p className={`text-sm font-medium capitalize ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-400" size={16} />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-3">
              {['pending', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status as any)}
                  disabled={isUpdating || task.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    task.status === status
                      ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } disabled:opacity-50`}
                >
                  {isUpdating ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    status.replace('-', ' ')
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned To</h3>
            <div 
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate(`/clients/${client.id}`)}
            >
              <img
                src={client.avatar}
                alt={client.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-600">{client.industry}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Edit task details
              </button>
              <button
                onClick={() => navigate(`/clients/${client.id}`)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                View client profile
              </button>
              <button
                onClick={() => navigate(`/tasks/new?clientId=${client.id}`)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Create related task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;