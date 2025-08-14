import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import CoachDashboard from './components/dashboard/CoachDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ClientList from './components/clients/ClientList';
import ClientProfile from './components/clients/ClientProfile';
import SessionList from './components/sessions/SessionList';
import TaskList from './components/tasks/TaskList';
import CreateTask from './components/tasks/CreateTask';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<CoachDashboard />} />
            <Route path="client-dashboard" element={<ClientDashboard />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="clients/:id" element={<ClientProfile />} />
            <Route path="sessions" element={<SessionList />} />
            <Route path="group-sessions" element={<div className="text-center py-12">Group Sessions page coming soon...</div>} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/new" element={<CreateTask />} />
            <Route path="analytics" element={<div className="text-center py-12">Analytics page coming soon...</div>} />
            <Route path="settings" element={<div className="text-center py-12">Settings page coming soon...</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;