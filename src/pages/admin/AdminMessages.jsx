import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { contactAPI } from '../../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetch = () => {
    setLoading(true);
    contactAPI.getAll()
      .then(res => setMessages(res.data.contacts || []))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) {
      try {
        await contactAPI.markRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch {/* silent */}
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await contactAPI.delete(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Message deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const filtered = messages.filter(m => {
    const matchFilter = filter === 'All' || (filter === 'Unread' && !m.isRead) || (filter === 'Read' && m.isRead);
    const matchSearch = m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <>
      <Helmet><title>Messages | MIDT Admin</title></Helmet>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: messages.length, color: 'bg-gray-50 border-gray-200 text-gray-800' },
          { label: 'Unread', value: unreadCount, color: 'bg-orange-50 border-orange-200 text-orange-700' },
          { label: 'Read', value: messages.length - unreadCount, color: 'bg-green-50 border-green-200 text-green-700' },
        ].map(c => (
          <div key={c.label} className={`border rounded-xl p-4 text-center ${c.color}`}>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{c.value}</div>
            <div className="text-xs font-semibold mt-0.5 opacity-70">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Message list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div className="flex gap-2">
                {['All', 'Unread', 'Read'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-4 space-y-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="text-4xl mb-2">📭</div>
                <p>No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {filtered.map(m => (
                  <button key={m._id} onClick={() => handleOpen(m)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex gap-3 items-start ${selected?._id === m._id ? 'bg-blue-50 border-r-2 border-blue-600' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${m.isRead ? 'bg-gray-200' : 'bg-blue-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-semibold truncate ${m.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{m.name}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(m.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{m.subject}</div>
                      <div className="text-xs text-gray-400 truncate mt-0.5">{m.message?.slice(0, 60)}...</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{selected.subject}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">From: <strong>{selected.name}</strong></span>
                      {selected.isRead
                        ? <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Read</span>
                        : <span className="text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">New</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(selected._id)}
                    className="text-xs px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-semibold flex-shrink-0 transition-colors">
                    🗑 Delete
                  </button>
                </div>

                {/* Meta */}
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-400 font-medium">Email: </span><a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a></div>
                  <div><span className="text-gray-400 font-medium">Received: </span><span className="text-gray-700">{new Date(selected.createdAt).toLocaleString('en-PK', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                {/* Reply actions */}
                <div className="p-5 border-t border-gray-100 flex gap-3">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}&body=Dear ${selected.name},%0A%0AThank you for contacting MIDT.%0A%0A`}
                    className="btn-primary text-sm px-5 py-2.5">
                    ✉️ Reply via Email
                  </a>
                  <button onClick={() => setSelected(null)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm">
                    ← Back
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-[400px]">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">✉️</div>
                  <p className="font-semibold">Select a message to read</p>
                  <p className="text-sm mt-1">{unreadCount > 0 ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages are read'}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
