import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { studentsAPI, coursesAPI } from '../../services/api';

const emptyForm = {
  fullName: '', fatherName: '', phone: '', email: '',
  address: '', gender: '', dateOfBirth: '', course: '', status: 'Active',
};

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Dropped: 'bg-red-100 text-red-700',
};

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchAll = () => {
    setLoading(true);
    Promise.all([studentsAPI.getAll(), coursesAPI.getAll()])
      .then(([sRes, cRes]) => {
        setStudents(sRes.data.students || []);
        setCourses(cRes.data.courses || []);
      })
      .catch(() => toast.error('Failed to load students'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ ...s, course: s.course?._id || s.course || '', dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split('T')[0] : '' }); setShowModal(true); };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) { toast.error('Name and phone are required.'); return; }
    setSaving(true);
    try {
      if (editing) {
        const res = await studentsAPI.update(editing._id, form);
        setStudents(prev => prev.map(s => s._id === editing._id ? res.data.student : s));
        toast.success('Student updated!');
      } else {
        const res = await studentsAPI.create(form);
        setStudents(prev => [res.data.student, ...prev]);
        toast.success('Student registered!');
      }
      setShowModal(false);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this student record?')) return;
    try {
      await studentsAPI.delete(id);
      setStudents(prev => prev.filter(s => s._id !== id));
      toast.success('Student deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <Helmet><title>Students | RICS Admin</title></Helmet>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: students.length, color: 'bg-blue-50 border-blue-200 text-blue-800' },
          { label: 'Active', value: students.filter(s => s.status === 'Active').length, color: 'bg-green-50 border-green-200 text-green-800' },
          { label: 'Completed', value: students.filter(s => s.status === 'Completed').length, color: 'bg-purple-50 border-purple-200 text-purple-800' },
          { label: 'Dropped', value: students.filter(s => s.status === 'Dropped').length, color: 'bg-red-50 border-red-200 text-red-800' },
        ].map(c => (
          <div key={c.label} className={`${c.color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{c.value}</div>
            <div className="text-xs font-semibold mt-0.5 opacity-70">{c.label} Students</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search by name, ID, or phone..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Completed', 'Dropped'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
          ))}
        </div>
        <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">➕ Add Student</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Students ({filtered.length})</h3>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">👨‍🎓</div>
            <p className="mb-4">No students found</p>
            <button onClick={openCreate} className="btn-primary text-sm">Register Student</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['ID', 'Name', 'Phone', 'Course', 'Gender', 'Status', 'Registered', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((s, i) => (
                  <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{s.studentId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                          {s.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{s.fullName}</div>
                          {s.fatherName && <div className="text-xs text-gray-400">S/O {s.fatherName}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.phone}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-[130px] truncate">{s.course?.title || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.gender || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[s.status]}`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {s.registrationDate ? new Date(s.registrationDate).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: '2-digit' }) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(s)} className="text-xs px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold transition-colors">Edit</button>
                        <button onClick={() => handleDelete(s._id)} className="text-xs px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold transition-colors">Del</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {editing ? 'Edit Student' : 'Register Student'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Muhammad Ali" required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Father's Name</label>
                    <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Abdul Rehman"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="03001234567" required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@email.com"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-400">
                      <option value="">Select</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label>
                    <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="Full address"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Course</label>
                    <select name="course" value={form.course} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-400">
                      <option value="">Select Course</option>
                      {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                    <select name="status" value={form.status} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-400">
                      <option>Active</option><option>Completed</option><option>Dropped</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
                    {saving ? 'Saving...' : editing ? 'Update Student' : 'Register Student'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
