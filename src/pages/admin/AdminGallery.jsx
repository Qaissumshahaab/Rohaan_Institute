import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { galleryAPI } from '../../services/api';

const CATEGORIES = ['Classroom', 'Events', 'Workshops', 'Activities'];

const placeholderColors = [
  'from-blue-400 to-blue-600', 'from-orange-400 to-orange-600', 'from-green-400 to-green-600',
  'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-teal-400 to-teal-600',
];

const catIcons = { Classroom: '🖥️', Events: '🎉', Workshops: '🛠️', Activities: '⚽' };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Classroom', image: '' });
  const [saving, setSaving] = useState(false);
  const [catFilter, setCatFilter] = useState('All');
  const [deleting, setDeleting] = useState(null);

  const fetch = () => {
    setLoading(true);
    galleryAPI.getAll()
      .then(res => setItems(res.data.items || []))
      .catch(() => toast.error('Failed to load gallery'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    setSaving(true);
    try {
      const res = await galleryAPI.create(form);
      setItems(prev => [res.data.item, ...prev]);
      setShowModal(false);
      setForm({ title: '', category: 'Classroom', image: '' });
      toast.success('Gallery item added!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this gallery item?')) return;
    setDeleting(id);
    try {
      await galleryAPI.delete(id);
      setItems(prev => prev.filter(i => i._id !== id));
      toast.success('Item deleted.');
    } catch { toast.error('Failed to delete.'); }
    finally { setDeleting(null); }
  };

  const filtered = catFilter === 'All' ? items : items.filter(i => i.category === catFilter);

  const catCounts = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: items.filter(i => i.category === c).length }), {});

  return (
    <>
      <Helmet><title>Gallery | MIDT Admin</title></Helmet>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center col-span-1">
          <div className="text-xl font-bold text-blue-700" style={{ fontFamily: 'Syne, sans-serif' }}>{items.length}</div>
          <div className="text-xs text-blue-600 font-semibold mt-0.5">Total</div>
        </div>
        {CATEGORIES.map(c => (
          <div key={c} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gray-700" style={{ fontFamily: 'Syne, sans-serif' }}>{catCounts[c] || 0}</div>
            <div className="text-xs text-gray-500 font-semibold mt-0.5">{c}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${catFilter === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'}`}>
              {catIcons[c] || '📂'} {c}
            </button>
          ))}
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm px-5 py-2.5 sm:ml-auto whitespace-nowrap">
          ➕ Add Image
        </button>
      </div>

      {/* Gallery grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          <div className="text-5xl mb-3">🖼️</div>
          <p className="mb-4">No gallery items in this category</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">Add First Image</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.03 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} flex items-center justify-center`}>
                    <span className="text-5xl opacity-60">{catIcons[item.category] || '🖼️'}</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <div className="text-white text-xs font-bold text-center px-2 truncate w-full text-center">{item.title}</div>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{item.category}</span>
                  <button onClick={() => handleDelete(item._id)} disabled={deleting === item._id}
                    className="mt-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-60">
                    {deleting === item._id ? '...' : '🗑 Delete'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Add Gallery Item</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Web Development Class — Batch 2025"
                    required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(c => (
                      <button key={c} type="button" onClick={() => setForm(p => ({ ...p, category: c }))}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${form.category === c ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                        <span>{catIcons[c]}</span> {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL <span className="text-gray-400 font-normal">(optional — paste a direct image link)</span></label>
                  <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  {form.image && (
                    <div className="mt-2 rounded-xl overflow-hidden h-32 bg-gray-100">
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
                    {saving ? 'Adding...' : '➕ Add to Gallery'}
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
