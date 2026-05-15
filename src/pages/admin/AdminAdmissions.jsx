import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { admissionsAPI } from '../../services/api';

const STATUS_OPTIONS = ['Pending', 'Reviewed', 'Accepted', 'Rejected'];
const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Reviewed: 'bg-blue-100 text-blue-700 border-blue-200',
  Accepted: 'bg-green-100 text-green-700 border-green-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
};

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const fetch = () => {
    setLoading(true);
    admissionsAPI.getAll()
      .then(res => setAdmissions(res.data.admissions || []))
      .catch(() => toast.error('Failed to load admissions'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await admissionsAPI.updateStatus(id, status);
      setAdmissions(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      toast.success('Status updated!');
    } catch { toast.error('Failed to update status.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this admission request?')) return;
    try {
      await admissionsAPI.delete(id);
      setAdmissions(prev => prev.filter(a => a._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const filtered = admissions.filter(a => {
    const matchesStatus = filter === 'All' || a.status === filter;
    const matchesSearch = a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.course?.toLowerCase().includes(search.toLowerCase()) ||
      a.whatsapp?.includes(search);
    return matchesStatus && matchesSearch;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: admissions.filter(a => a.status === s).length }), {});

  return (
    <>
      <Helmet><title>Admissions | RICS Admin</title></Helmet>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[{ label: 'Total', value: admissions.length, color: 'bg-gray-50 border-gray-200' }, ...STATUS_OPTIONS.map(s => ({ label: s, value: counts[s], color: `border ${statusColors[s]}` }))].map(c => (
          <div key={c.label} className={`${c.color} rounded-xl p-4 border text-center`}>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{c.value ?? 0}</div>
            <div className="text-xs font-medium mt-0.5 opacity-70">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search by name, course, or number..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">📭</div>
            <p>No admissions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Course', 'WhatsApp', 'Timing', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((a, i) => (
                  <motion.tr key={a._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(a)} className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors text-left">
                        {a.fullName}
                      </button>
                      {a.email && <div className="text-xs text-gray-400 truncate max-w-[140px]">{a.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate">{a.course}</td>
                    <td className="px-4 py-3">
                      <a href={`https://wa.me/${a.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline">{a.whatsapp}</a>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{a.timing?.split('(')[0]}</td>
                    <td className="px-4 py-3">
                      <select value={a.status} onChange={e => handleStatusChange(a._id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${statusColors[a.status]}`}>
                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(a.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(a)} className="text-xs px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold">View</button>
                        <button onClick={() => handleDelete(a._id)} className="text-xs px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold">Del</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Admission Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ['Name', selected.fullName],
                ['WhatsApp', selected.whatsapp],
                ['Email', selected.email || 'N/A'],
                ['Course', selected.course],
                ['Timing', selected.timing],
                ['Message', selected.message || 'None'],
                ['Applied on', new Date(selected.createdAt).toLocaleString('en-PK')],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="font-semibold text-gray-500 w-24 flex-shrink-0">{k}:</span>
                  <span className="text-gray-800">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-gray-500 w-24 flex-shrink-0">Status:</span>
                <select value={selected.status} onChange={e => handleStatusChange(selected._id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${statusColors[selected.status]}`}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a href={`https://wa.me/${selected.whatsapp?.replace(/\D/g, '')}?text=Hello ${selected.fullName}! This is MIDT. We have reviewed your admission request for ${selected.course}.`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#20bd5a] transition-colors">
                💬 WhatsApp
              </a>
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
