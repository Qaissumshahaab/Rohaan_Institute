import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [saving, setSaving] = useState(false);
  const { admin: currentAdmin } = useAuth();

  const fetch = () => {
    setLoading(true);
    adminAPI.getAll()
      .then(res => setAdmins(res.data.admins || []))
      .catch(() => toast.error('Failed to load admins'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('All fields are required.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setSaving(true);
    try {
      const res = await adminAPI.create(form);
      setAdmins(prev => [...prev, res.data.admin]);
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      toast.success('Admin created successfully!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create admin.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete admin "${name}"? This cannot be undone.`)) return;
    try {
      await adminAPI.delete(id);
      setAdmins(prev => prev.filter(a => a._id !== id));
      toast.success('Admin deleted.');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to delete.'); }
  };

  const roleColors = { super_admin: 'bg-purple-100 text-purple-700 border-purple-200', admin: 'bg-blue-100 text-blue-700 border-blue-200' };

  return (
    <>
      <Helmet><title>Admin Management | MIDT</title></Helmet>

      {/* Warning banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div>
          <div className="font-bold text-yellow-800 text-sm">Super Admin Section</div>
          <div className="text-yellow-700 text-xs mt-0.5">You can create and delete admin accounts here. Handle with care. Super admin accounts cannot be deleted.</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
          👑 Admin Accounts ({admins.length})
        </h2>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm px-5 py-2.5">
          ➕ Add Admin
        </button>
      </div>

      {/* Admin cards */}
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {admins.map((adm, i) => (
            <motion.div key={adm._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0 ${adm.role === 'super_admin' ? 'bg-gradient-to-br from-purple-500 to-purple-700' : 'bg-gradient-to-br from-blue-500 to-blue-700'}`}>
                {adm.name?.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">{adm.name}</span>
                  {adm._id === currentAdmin?.id && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">You</span>
                  )}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold capitalize ${roleColors[adm.role]}`}>
                    {adm.role === 'super_admin' ? '👑 Super Admin' : '🛡️ Admin'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-0.5 truncate">{adm.email}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Joined: {new Date(adm.createdAt).toLocaleDateString('en-PK', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0">
                {adm.role === 'super_admin' ? (
                  <span className="text-xs text-gray-400 italic">Protected</span>
                ) : adm._id === currentAdmin?.id ? (
                  <span className="text-xs text-gray-400 italic">Cannot self-delete</span>
                ) : (
                  <button onClick={() => handleDelete(adm._id, adm.name)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors">
                    🗑 Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Permission info */}
      <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-5">
        <h4 className="font-bold text-gray-800 mb-3 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>🔐 Role Permissions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <div className="font-bold text-purple-700 mb-2">👑 Super Admin</div>
            <ul className="space-y-1">
              {['Full dashboard access', 'Manage all courses', 'Manage all students', 'View all admissions & messages', 'Create & delete admin accounts', 'Manage gallery'].map(p => (
                <li key={p} className="flex items-center gap-1.5"><span className="text-green-500">✓</span>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-blue-700 mb-2">🛡️ Admin</div>
            <ul className="space-y-1">
              {['Full dashboard access', 'Manage all courses', 'Manage all students', 'View all admissions & messages', 'Manage gallery'].map(p => (
                <li key={p} className="flex items-center gap-1.5"><span className="text-green-500">✓</span>{p}</li>
              ))}
              <li className="flex items-center gap-1.5"><span className="text-red-400">✗</span>Cannot manage admin accounts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create admin modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Create New Admin</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleCreate} className="p-5 space-y-4">
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Admin Name' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'admin@midt.edu.pk' },
                  { label: 'Password (min 6 chars)', key: 'password', type: 'password', placeholder: '••••••••' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label} *</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['admin', 'super_admin'].map(r => (
                      <button key={r} type="button" onClick={() => setForm(p => ({ ...p, role: r }))}
                        className={`p-3 rounded-xl border text-sm font-semibold transition-all text-center ${form.role === r ? (r === 'super_admin' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-blue-600 border-blue-600 text-white') : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                        {r === 'super_admin' ? '👑 Super Admin' : '🛡️ Admin'}
                      </button>
                    ))}
                  </div>
                  {form.role === 'super_admin' && (
                    <p className="text-xs text-orange-500 mt-2 font-medium">⚠️ Super admins can create and delete other admins.</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
                    {saving ? 'Creating...' : '✅ Create Admin'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
