import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CoachDashboard from './components/dashboard/CoachDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ClientList from './components/clients/ClientList';
import ClientProfile from './components/clients/ClientProfile';
import SessionList from './components/sessions/SessionList';
import CreateSession from './components/sessions/CreateSession';
import TaskList from './components/tasks/TaskList';
import CreateTask from './components/tasks/CreateTask';
import TaskDetail from './components/tasks/TaskDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<CoachDashboard />} />
              <Route path="client-dashboard" element={<ClientDashboard />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="clients/:id" element={<ClientProfile />} />
              <Route path="sessions" element={<SessionList />} />
              <Route path="sessions/new" element={<CreateSession />} />
              <Route path="group-sessions" element={<div className="text-center py-12">Group Sessions page coming soon...</div>} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="tasks/new" element={<CreateTask />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="analytics" element={<div className="text-center py-12">Analytics page coming soon...</div>} />
              <Route path="settings" element={<div className="text-center py-12">Settings page coming soon...</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;