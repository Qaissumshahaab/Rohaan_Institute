import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const floatingIcons = [
  { emoji: '💻', x: '8%', y: '20%', delay: 0, size: 'text-4xl' },
  { emoji: '🎨', x: '88%', y: '15%', delay: 1, size: 'text-3xl' },
  { emoji: '📊', x: '5%', y: '70%', delay: 2, size: 'text-3xl' },
  { emoji: '🚀', x: '90%', y: '60%', delay: 0.5, size: 'text-4xl' },
  { emoji: '⚡', x: '75%', y: '80%', delay: 1.5, size: 'text-2xl' },
  { emoji: '🌐', x: '20%', y: '85%', delay: 2.5, size: 'text-3xl' },
];

export default function HeroSection() {
  const scrollToAdmission = () =>
    document.getElementById('admission')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className={`absolute ${icon.size} select-none pointer-events-none`}
          style={{ left: icon.x, top: icon.y }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm font-semibold text-blue-700 mb-6"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Now Accepting Admissions for 2025
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Build Your{' '}
              <span className="relative">
                <span className="gradient-text">Digital Career</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </span>{' '}
              <br />
              in{' '}
              <span className="gradient-text-orange">Multan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed"
            >
              Join Multan's most trusted computer institute. From web development to freelancing — master skills that open real doors to success.
            </motion.p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { value: '5000+', label: 'Students Trained' },
                { value: '20+', label: 'Expert Courses' },
                { value: '95%', label: 'Placement Rate' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={scrollToAdmission} className="btn-orange text-base px-8 py-4">
                Enroll Now 🚀
              </button>
              <Link to="/courses" className="btn-outline text-base px-8 py-4">
                View Courses →
              </Link>
            </motion.div>
          </div>

          {/* Right: Glassmorphism card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-2xl opacity-20 scale-105" />

            {/* Glass card */}
            <div className="relative glass rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎓</div>
                <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Start Learning Today
                </h3>
                <p className="text-gray-500 text-sm mt-1">Professional courses with certificates</p>
              </div>

              {/* Course badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '💻', name: 'Web Dev', students: '1200+' },
                  { icon: '🎨', name: 'Graphic Design', students: '800+' },
                  { icon: '📊', name: 'Digital Marketing', students: '600+' },
                  { icon: '🐍', name: 'Python', students: '400+' },
                ].map((course) => (
                  <div key={course.name} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                    <span className="text-2xl">{course.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{course.name}</div>
                      <div className="text-xs text-gray-400">{course.students} enrolled</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificate badge */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                <div className="text-3xl">🏆</div>
                <div>
                  <div className="font-semibold text-orange-700 text-sm">Government Recognized</div>
                  <div className="text-orange-600/70 text-xs">Certificates valid across Pakistan</div>
                </div>
              </div>

              {/* Floating mini cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
              >
                <div className="text-xs font-semibold text-gray-700">⭐ 4.9/5 Rating</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
              >
                <div className="text-xs font-semibold text-gray-700">🎓 5000+ Graduates</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-blue-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
