import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === '123456') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials! Demo username: admin | Password: 123456');
    }
  };

  const handleDemoAdmin = () => {
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto text-2xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Portal Authentication</h1>
          <p className="text-xs text-slate-500">
            Sign in to access Pharmacist Admin Inventory Management
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          
          <div>
            <label htmlFor="user" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Username
            </label>
            <input
              type="text"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Sign In to Admin
          </Button>

        </form>

        {/* Quick Demo Credentials Box */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-900">🔑 Demo Credentials:</p>
            <p>Username: <code className="text-emerald-600 font-bold">admin</code></p>
            <p>Password: <code className="text-emerald-600 font-bold">123456</code></p>
          </div>

          <button
            onClick={handleDemoAdmin}
            className="w-full py-2 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors"
          >
            ⚡ One-Click Demo Admin Login
          </button>
        </div>

      </div>

    </div>
  );
};

export default Login;
