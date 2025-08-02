// src/pages/LogoutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi proses logout
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-600 text-lg font-medium">Sedang logout...</p>
    </div>
  );
};

export default LogoutPage;