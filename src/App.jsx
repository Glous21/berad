// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import AdminDashboard from './components/AdminDashboard';
import Benefit from './components/Benefit';

function App() {
  return (
    <div className="font-sans">
      <Router>
        <Routes>
          {/* Halaman Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Halaman Logout */}
          <Route path="/logout" element={<LogoutPage />} />

          {/* Halaman Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <div>
                <AdminDashboard />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;