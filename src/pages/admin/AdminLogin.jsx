import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please enter email and password.'); return; }
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      login(res.data.token, res.data.admin);
      toast.success(`Welcome back, ${res.data.admin.name}!`);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login | RICS</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
          className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl font-mono">RICS</span>
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Admin Panel</h1>
            <p className="text-blue-200 text-sm mt-1">Rohaan Institute of Computer Studies</p>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-white font-bold text-xl mb-6 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>Sign In to Dashboard</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-blue-100 text-sm font-semibold mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@midt.edu.pk" required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-blue-100 text-sm font-semibold mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••" required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all text-sm pr-12" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors text-sm">
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in...</> : '🔐 Sign In'}
              </button>
            </form>

            <p className="text-center text-blue-300/60 text-xs mt-6">
              Admin access only. Unauthorized access is prohibited.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
