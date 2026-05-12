import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CourseCard from '../components/courses/CourseCard';
import AnimatedSection from '../components/common/AnimatedSection';
import { coursesAPI } from '../services/api';

const CATEGORIES = [
  'All',
  'Web Development',
  'Graphic Design',
  'Digital Marketing',
  'MS Office',
  'Freelancing',
  'Programming',
  'Video Editing',
  'UI/UX Design',
  'E-Commerce',
  'Ai Automation',
  'Spoken English',
  'Youtube Automation',
  'Word Press Development',
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const SkeletonCard = () => (
  <div className="card p-0 overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-44 w-full" />
    <div className="p-5 space-y-3">
      <div className="bg-gray-200 h-5 w-3/4 rounded" />
      <div className="bg-gray-200 h-3 w-full rounded" />
      <div className="bg-gray-200 h-3 w-2/3 rounded" />
      <div className="flex gap-2 pt-2">
        <div className="bg-gray-200 h-10 flex-1 rounded-xl" />
        <div className="bg-gray-200 h-10 flex-1 rounded-xl" />
      </div>
    </div>
  </div>
);

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchCourses = useCallback(() => {
    setLoading(true);
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (category !== 'All') params.category = category;
    if (level !== 'All') params.skillLevel = level;

    coursesAPI
      .getAll(params)
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [debouncedSearch, category, level]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <>
      <Helmet>
        <title>All Courses | RICS — Multan Institute of Digital Technology</title>
        <meta name="description" content="Browse all professional IT courses at RICS Multan. Web Dev, Graphic Design, Digital Marketing, Python, Freelancing, and more. Enroll today." />
      </Helmet>

      {/* Page Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-semibold mb-4">
              📚 {courses.length > 0 ? `${courses.length} Courses Available` : 'Professional Programs'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Explore Our Courses
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Industry-relevant courses designed to make you job-ready and freelancing-capable.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <AnimatedSection className="mb-8">
            <div className="relative max-w-lg mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm shadow-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              )}
            </div>
          </AnimatedSection>

          {/* Category chips */}
          <AnimatedSection className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    category === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Level filter */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    level === lvl
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500'
                  }`}
                >
                  {lvl === 'All' ? '📊 All Levels' : lvl === 'Beginner' ? '🟢 Beginner' : lvl === 'Intermediate' ? '🟡 Intermediate' : '🔴 Advanced'}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6 text-center">
                Showing <span className="font-semibold text-blue-600">{courses.length}</span> courses
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
