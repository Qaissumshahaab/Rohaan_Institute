import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { coursesAPI } from '../../services/api';

const CATEGORIES = ['Web Development', 'Graphic Design', 'Digital Marketing', 'MS Office', 'Freelancing', 'Programming', 'Video Editing', 'UI/UX Design', 'E-Commerce'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const emptyForm = { title: '', description: '', duration: '', fees: '', skillLevel: 'Beginner', category: 'Web Development', isFeatured: false, hasCertificate: true, benefits: '', outline: '' };

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const fetch = () => {
    setLoading(true);
    coursesAPI.getAll()
      .then(res => setCourses(res.data.courses || []))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (course) => {
    setEditing(course);
    setForm({
      ...course,
      benefits: course.benefits?.join('\n') || '',
      outline: course.outline?.map(o => `Week ${o.week}: ${o.topic} — ${o.description || ''}`).join('\n') || '',
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.fees) { toast.error('Fill required fields.'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        fees: Number(form.fees),
        benefits: form.benefits.split('\n').map(b => b.trim()).filter(Boolean),
        outline: form.outline.split('\n').map((line, i) => {
          const match = line.match(/Week\s*(\d+):\s*(.+?)(?:\s*—\s*(.+))?$/i);
          return match ? { week: Number(match[1]), topic: match[2], description: match[3] || '' } : { week: i + 1, topic: line, description: '' };
        }).filter(o => o.topic),
      };
      if (editing) { await coursesAPI.update(editing._id, payload); toast.success('Course updated!'); }
      else { await coursesAPI.create(payload); toast.success('Course created!'); }
      setShowModal(false);
      fetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return;
    try { await coursesAPI.delete(id); setCourses(prev => prev.filter(c => c._id !== id)); toast.success('Course deleted.'); }
    catch { toast.error('Failed to delete.'); }
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) || c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Courses | RICS Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">➕ Add Course</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>All Courses ({filtered.length})</h3>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-14 rounded-xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">📚</div>
            <p className="mb-4">No courses found</p>
            <button onClick={openCreate} className="btn-primary text-sm">Add First Course</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Course', 'Category', 'Level', 'Duration', 'Fees', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c, i) => (
                  <motion.tr key={c._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sm text-gray-900 max-w-[180px] truncate">{c.title}</div>
                      <div className="text-xs text-gray-400">{c.enrolledCount || 0} enrolled</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.skillLevel === 'Beginner' ? 'bg-green-100 text-green-700' : c.skillLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {c.skillLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.duration}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">Rs. {c.fees?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.isFeatured ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'}`}>
                        {c.isFeatured ? '⭐ Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link to={`/courses/${c.slug}`} target="_blank" className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-semibold">View</Link>
                        <button onClick={() => openEdit(c)} className="text-xs px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold">Edit</button>
                        <button onClick={() => handleDelete(c._id)} className="text-xs px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold">Del</button>
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
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {editing ? 'Edit Course' : 'Add New Course'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="label-sm">Course Title *</label>
                  <input className="input-field" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Complete Web Development" required />
                </div>
                <div>
                  <label className="label-sm">Description *</label>
                  <textarea className="input-field resize-none" rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Course description..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-sm">Duration *</label>
                    <input className="input-field" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 3 Months" required />
                  </div>
                  <div>
                    <label className="label-sm">Fees (Rs.) *</label>
                    <input type="number" className="input-field" value={form.fees} onChange={e => setForm(p => ({ ...p, fees: e.target.value }))} placeholder="e.g. 12000" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-sm">Category</label>
                    <select className="input-field bg-white" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-sm">Skill Level</label>
                    <select className="input-field bg-white" value={form.skillLevel} onChange={e => setForm(p => ({ ...p, skillLevel: e.target.value }))}>
                      {LEVELS.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-sm">Benefits (one per line)</label>
                  <textarea className="input-field resize-none font-mono text-xs" rows={3} value={form.benefits}
                    onChange={e => setForm(p => ({ ...p, benefits: e.target.value }))} placeholder="Build real projects&#10;Industry-ready skills&#10;Certificate included" />
                </div>
                <div>
                  <label className="label-sm">Outline (format: "Week 1: Topic — Description")</label>
                  <textarea className="input-field resize-none font-mono text-xs" rows={4} value={form.outline}
                    onChange={e => setForm(p => ({ ...p, outline: e.target.value }))} placeholder="Week 1: HTML Basics — Structure of web pages&#10;Week 2: CSS Styling — Visual design" />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(p => ({ ...p, isFeatured: e.target.checked }))} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Featured Course</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.hasCertificate} onChange={e => setForm(p => ({ ...p, hasCertificate: e.target.checked }))} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Includes Certificate</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
                    {saving ? 'Saving...' : editing ? 'Update Course' : 'Create Course'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`.label-sm { display: block; font-size: 0.75rem; font-weight: 600; color: #374151; margin-bottom: 0.375rem; } .input-field { width: 100%; padding: 0.625rem 0.875rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.15s; } .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }`}</style>
    </>
  );
}
