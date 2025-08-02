// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/admin');
    } else {
      setError('Email atau password salah');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          
          {/* ICON & JUDUL */}
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-orange-700">Login Admin</h2>
            <p className="text-orange-500 mt-2 text-sm">Masuk ke dashboard admin</p>
          </div>

          {/* PESAN ERROR */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-orange-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-orange-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:scale-105 transition-all"
            >
              {isLoading ? 'Memuat...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
