import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Calendar, Users, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '../../data/mockData';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Session, Client } from '../../types'; // Import types from index.ts

const SessionList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'one-on-one' | 'group'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [sessions, setSessions] = useState<Session[]>([]); // Use Session type

  useEffect(() => {
    const q = query(collection(db, 'sessions'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
      setSessions(data);
    });
    return unsub;
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || session.type === filterType;
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled').length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const groupSessions = sessions.filter(s => s.type === 'group').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-600 mt-1">Manage your coaching sessions and group workshops.</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => navigate('/sessions/new?type=group')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Users size={20} />
            <span>New Group Session</span>
          </button>
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{sessions.length}</p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{upcomingSessions}</p>
            </div>
            <Clock className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{completedSessions}</p>
            </div>
            <Calendar className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Group Sessions</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{groupSessions}</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search sessions by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="one-on-one">One-on-One</option>
                <option value="group">Group Sessions</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Sessions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSessions.map((session) => {
            const clients: Client[] = session.clientIds
              .map((id: string) => mockClients.find(c => c.id === id))
              .filter((client): client is Client => Boolean(client));

            return (
              <div
                key={session.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/sessions/${session.id}`)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    session.type === 'group' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    {session.type === 'group' ? (
                      <Users className={session.type === 'group' ? 'text-purple-600' : 'text-blue-600'} size={24} />
                    ) : (
                      <User className="text-blue-600" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{session.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{session.duration} minutes</span>
                          </div>
                          {session.type === 'group' && (
                            <div className="flex items-center space-x-2">
                              <Users size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{clients.length} participants</span>
                            </div>
                          )}
                        </div>

                        {/* Participants */}
                        <div className="mt-3">
                          {session.type === 'group' ? (
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Participants:</p>
                              <div className="flex flex-wrap gap-2">
                                {clients.map((client: Client) => (
                                  <div key={client.id} className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                                    <img
                                      src={client.avatar}
                                      alt={client.name}
                                      className="w-5 h-5 rounded-full object-cover"
                                    />
                                    <span className="text-xs text-gray-700">{client.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            clients[0] && (
                              <div className="flex items-center space-x-2">
                                <img
                                  src={clients[0].avatar}
                                  alt={clients[0].name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm text-gray-600">{clients[0].name}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          session.type === 'group' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {session.type === 'group' ? 'Group' : '1:1'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/sessions/${session.id}/edit`);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredSessions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by scheduling your first session.'}
          </p>
          {!searchTerm && (
            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => navigate('/sessions/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={20} />
                <span>Schedule Session</span>
              </button>
              <button
                onClick={() => navigate('/sessions/new?type=group')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Users size={20} />
                <span>Create Group Session</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionList;