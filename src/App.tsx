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
import CreateClient from './components/clients/CreateClient';
import SessionList from './components/sessions/SessionList';
import CreateSession from './components/sessions/CreateSession';
import EditSession from './components/sessions/EditSession';
import TaskList from './components/tasks/TaskList';
import CreateTask from './components/tasks/CreateTask';
import TaskDetail from './components/tasks/TaskDetail';
import EditTask from './components/tasks/EditTask'; // Add this import

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
              <Route path="clients/new" element={<CreateClient />} />
              <Route path="clients/:id" element={<ClientProfile />} />
              <Route path="clients/:id/edit" element={<div className="text-center py-12">Edit Client page coming soon...</div>} />
              <Route path="sessions" element={<SessionList />} />
              <Route path="sessions/new" element={<CreateSession />} />
              <Route path="sessions/:id/edit" element={<EditSession />} />
              <Route path="sessions/:id" element={<div className="text-center py-12">Session Detail page coming soon...</div>} />
              <Route path="group-sessions" element={<div className="text-center py-12">Group Sessions page coming soon...</div>} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="tasks/new" element={<CreateTask />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="tasks/:id/edit" element={<EditTask />} /> {/* Add this route */}
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