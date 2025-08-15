import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, AlertCircle, Edit, Clock } from 'lucide-react';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import type { Task, Client } from '../../types';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      if (!id || !currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        const taskDoc = await getDoc(doc(db, 'tasks', id));
        if (taskDoc.exists()) {
          const taskData = {
            id: taskDoc.id,
            ...taskDoc.data(),
            createdAt: taskDoc.data().createdAt?.toDate?.()?.toISOString() || taskDoc.data().createdAt,
          } as Task;
          
          // Check if current user is authorized to view this task
          if (taskData.assignedBy !== currentUser.uid) {
            setError("You are not authorized to view this task");
            setLoading(false);
            return;
          }
          
          setTask(taskData);
          
          // Fetch associated client
          if (taskData.clientId) {
            const clientDoc = await getDoc(doc(db, 'clients', taskData.clientId));
            if (clientDoc.exists()) {
              setClient({ id: clientDoc.id, ...clientDoc.data() } as Client);
            }
          }
        } else {
          setError("Task not found");
        }
              } catch (err: any) {
        console.error("Error fetching task:", err);
        setError("Failed to load task data");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, currentUser]);

  const handleStatusUpdate = async (newStatus: 'pending' | 'in-progress' | 'completed') => {
    if (!task || !currentUser) return;
    
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // Update local state
      setTask(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (err: any) {
      console.error("Error updating task status:", err);
      setError("Failed to update task status");
    } finally {
      setIsUpdating(false);
    }
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

  const isOverdue = task && task.status !== 'completed' && new Date(task.dueDate) < new Date();

  if (!currentUser) {
    return <div className="text-red-600 p-6">Please sign in to view task details</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading task...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || "Task not found"}</p>
        <button
          onClick={() => navigate('/tasks')}
          className="text-blue-600 hover:text-blue-700"
        >
          Back to tasks
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

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
              {(['pending', 'in-progress', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
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
          {client && (
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
          )}

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
              {client && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;