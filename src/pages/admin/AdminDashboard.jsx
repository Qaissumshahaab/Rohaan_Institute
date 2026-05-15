import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dashboardAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ icon, label, value, color, link, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
    <Link to={link} className={`block p-6 rounded-2xl border ${color} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold opacity-70 mb-1">{label}</p>
          <p className="text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{value ?? '—'}</p>
        </div>
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
      </div>
      <div className="mt-3 text-xs opacity-60 font-medium">Click to manage →</div>
    </Link>
  </motion.div>
);

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Reviewed: 'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useAuth();

  useEffect(() => {
    dashboardAPI.getStats()
      .then(res => { setStats(res.data.stats); setRecentAdmissions(res.data.recentAdmissions || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: '👨‍🎓', label: 'Total Students', value: stats?.students, color: 'bg-blue-50 border-blue-200 text-blue-800', link: '/admin/students' },
    { icon: '📋', label: 'Admission Requests', value: stats?.admissions, color: 'bg-orange-50 border-orange-200 text-orange-800', link: '/admin/admissions' },
    { icon: '📚', label: 'Active Courses', value: stats?.courses, color: 'bg-green-50 border-green-200 text-green-800', link: '/admin/courses' },
    { icon: '✉️', label: 'Unread Messages', value: stats?.unreadMessages, color: 'bg-purple-50 border-purple-200 text-purple-800', link: '/admin/messages' },
  ];

  const Skeleton = () => <div className="animate-pulse bg-gray-200 rounded-2xl h-32" />;

  return (
    <>
      <Helmet><title>Dashboard | RICS Admin</title></Helmet>

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-40 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
          👋 Welcome back, {admin?.name?.split(' ')[0]}!
        </h2>
        <p className="text-blue-200 text-sm">Here's what's happening at RICS today.</p>
        <div className="mt-3 text-xs text-blue-300 font-medium">
          {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />) : cards.map((c, i) => <StatCard key={c.label} {...c} delay={i * 0.08} />)}
      </div>

      {/* Recent admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>📋 Recent Admissions</h3>
              <Link to="/admin/admissions" className="text-sm text-blue-600 hover:underline font-medium">View all →</Link>
            </div>

            {loading ? (
              <div className="p-5 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>
            ) : recentAdmissions.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <div className="text-4xl mb-2">📭</div>
                <p>No admissions yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentAdmissions.map((a, i) => (
                  <motion.div key={a._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">
                      {a.fullName?.charAt(0) || 'S'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{a.fullName}</div>
                      <div className="text-gray-400 text-xs truncate">{a.course} • {a.timing?.split('(')[0]}</div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[a.status] || 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                    <div className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">
                      {new Date(a.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>⚡ Quick Actions</h3>
            <div className="space-y-3">
              {[
                { icon: '➕', label: 'Add New Course', to: '/admin/courses', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                { icon: '👨‍🎓', label: 'Register Student', to: '/admin/students', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                { icon: '🖼️', label: 'Upload to Gallery', to: '/admin/gallery', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                { icon: '✉️', label: 'View Messages', to: '/admin/messages', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
              ].map(action => (
                <Link key={action.label} to={action.to}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${action.color} font-medium text-sm`}>
                  <span className="text-lg">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Institute info */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-5">
            <h4 className="font-bold text-orange-800 mb-3 text-sm">📌 Institute Info</h4>
            <div className="space-y-2 text-xs text-orange-700">
              <div>📞 +92 305 777 7009</div>
              <div>✉️ info@rics.edu.pk</div>
              <div>📍 Multan, Punjab</div>
              <div>🕐 Mon–Sat: 9 AM – 7 PM</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
