import React, { useState } from 'react';
import { Search, Plus, Filter, User, Mail, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '../../data/mockData';

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your coaching clients and their progress.</p>
        </div>
        <button
          onClick={() => navigate('/clients/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors mt-4 sm:mt-0"
        >
          <Plus size={20} />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search clients by name, email, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={client.avatar}
                alt={client.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{client.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{client.industry}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={16} />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{client.totalSessions} sessions</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-600">Next Session:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {client.nextSessionDate ? new Date(client.nextSessionDate).toLocaleDateString() : 'Not scheduled'}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/sessions/new?clientId=${client.id}`);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Schedule
                </button>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-600">Primary Goal:</p>
              <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">
                {client.businessGoals[0]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/clients/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors mx-auto"
              >
                <Plus size={20} />
                <span>Add First Client</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientList;