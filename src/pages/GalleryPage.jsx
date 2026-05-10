import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';
import { galleryAPI } from '../services/api';

const CATEGORIES = ['All', 'Classroom', 'Events', 'Workshops', 'Activities'];

// Placeholder gallery items used when backend has no data
const placeholderItems = [
  { _id: '1', title: 'Web Development Class', category: 'Classroom', emoji: '💻', color: 'from-blue-400 to-blue-600' },
  { _id: '2', title: 'Annual Prize Distribution', category: 'Events', emoji: '🏆', color: 'from-orange-400 to-orange-600' },
  { _id: '3', title: 'Freelancing Workshop', category: 'Workshops', emoji: '🌐', color: 'from-green-400 to-green-600' },
  { _id: '4', title: 'Python Programming Lab', category: 'Classroom', emoji: '🐍', color: 'from-purple-400 to-purple-600' },
  { _id: '5', title: 'Digital Marketing Seminar', category: 'Events', emoji: '📊', color: 'from-pink-400 to-pink-600' },
  { _id: '6', title: 'Graphic Design Session', category: 'Workshops', emoji: '🎨', color: 'from-yellow-400 to-yellow-600' },
  { _id: '7', title: 'Students Fun Day', category: 'Activities', emoji: '🎉', color: 'from-teal-400 to-teal-600' },
  { _id: '8', title: 'Batch Completion Ceremony', category: 'Events', emoji: '🎓', color: 'from-indigo-400 to-indigo-600' },
  { _id: '9', title: 'UI/UX Design Workshop', category: 'Workshops', emoji: '🖼️', color: 'from-red-400 to-red-600' },
  { _id: '10', title: 'Computer Lab Overview', category: 'Classroom', emoji: '🖥️', color: 'from-blue-500 to-blue-700' },
  { _id: '11', title: 'Video Editing Class', category: 'Classroom', emoji: '🎬', color: 'from-gray-500 to-gray-700' },
  { _id: '12', title: 'Sports Day', category: 'Activities', emoji: '⚽', color: 'from-emerald-400 to-emerald-600' },
];

function GalleryItem({ item, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square shadow-card hover:shadow-card-hover transition-all duration-300"
      onClick={() => onClick(item)}
    >
      {item.image ? (
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${item.color || 'from-blue-400 to-blue-600'} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
          <span className="text-6xl opacity-70">{item.emoji || '🖼️'}</span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
        <div className="p-4 text-white w-full">
          <div className="text-sm font-bold truncate">{item.title}</div>
          <div className="text-xs text-white/70 mt-0.5">{item.category}</div>
        </div>
      </div>

      {/* Expand icon */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </motion.div>
  );
}

function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xl z-10" onClick={onClose}>✕</button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }}>←</button>
      <button className="absolute right-16 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); onNext(); }}>→</button>

      <motion.div
        initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
        className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full max-h-[70vh] object-contain bg-black" />
          ) : (
            <div className={`aspect-video bg-gradient-to-br ${item.color || 'from-blue-400 to-blue-600'} flex items-center justify-center`}>
              <span className="text-9xl opacity-60">{item.emoji || '🖼️'}</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-white font-bold text-xl">{item.title}</h3>
          <span className="text-white/60 text-sm">{item.category}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryAPI.getAll()
      .then(res => setItems(res.data.items?.length ? res.data.items : placeholderItems))
      .catch(() => setItems(placeholderItems))
      .finally(() => setLoading(false));
  }, []);

  const filtered = category === 'All' ? items : items.filter(i => i.category === category);
  const lightboxIndex = lightbox ? filtered.findIndex(i => i._id === lightbox._id) : -1;

  return (
    <>
      <Helmet>
        <title>Gallery | MIDT Multan</title>
        <meta name="description" content="Explore MIDT's gallery — classrooms, events, workshops, and student activities at Multan Institute of Digital Technology." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Our Gallery</h1>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">A glimpse inside MIDT — classrooms, workshops, events, and student achievements.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <AnimatedSection className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${cat === category ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                {cat}
              </button>
            ))}
          </AnimatedSection>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton aspect-square rounded-2xl" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" layout>
                {filtered.map((item, i) => (
                  <GalleryItem key={item._id} item={item} onClick={setLightbox} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">No items in this category.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            item={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={() => { const prev = filtered[(lightboxIndex - 1 + filtered.length) % filtered.length]; setLightbox(prev); }}
            onNext={() => { const next = filtered[(lightboxIndex + 1) % filtered.length]; setLightbox(next); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
