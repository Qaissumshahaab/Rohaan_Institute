import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { coursesAPI } from '../services/api';
import AnimatedSection from '../components/common/AnimatedSection';

const WHATSAPP = '923001234567';

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-blue-200' : 'border-gray-200'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50">
        <span className={`text-sm font-semibold pr-4 ${open ? 'text-blue-600' : 'text-gray-800'}`}>{faq.question}</span>
        <span className={`text-lg flex-shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>{open ? '✕' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('outline');

  useEffect(() => {
    window.scrollTo(0, 0);
    coursesAPI.getOne(slug)
      .then(res => setCourse(res.data.course))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const whatsappMsg = course
    ? encodeURIComponent(`Hi! I want to apply for the *${course.title}* course at MIDT. Please guide me.`)
    : '';

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading course details...</p>
      </div>
    </div>
  );

  if (error || !course) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
        <Link to="/courses" className="btn-primary">Back to Courses</Link>
      </div>
    </div>
  );

  const tabs = [
    { id: 'outline', label: '📋 Outline', show: course.outline?.length > 0 },
    { id: 'benefits', label: '✅ Benefits', show: course.benefits?.length > 0 },
    { id: 'instructor', label: '👨‍🏫 Instructor', show: !!course.instructor?.name },
    { id: 'faqs', label: '❓ FAQs', show: course.faqs?.length > 0 },
  ].filter(t => t.show);

  const levelColors = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-yellow-100 text-yellow-700', Advanced: 'bg-red-100 text-red-700' };

  return (
    <>
      <Helmet>
        <title>{course.title} | MIDT Multan</title>
        <meta name="description" content={course.description?.slice(0, 155)} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="pt-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link to="/courses" className="hover:text-blue-600">Courses</Link>
            <span>›</span>
            <span className="text-gray-800 font-medium">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              {/* Category & Level */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">{course.category}</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${levelColors[course.skillLevel]}`}>{course.skillLevel}</span>
                {course.hasCertificate && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-sm font-semibold rounded-full">🏆 Certificate</span>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>{course.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{course.description}</p>

              {/* Quick meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '⏱️', label: 'Duration', value: course.duration },
                  { icon: '📊', label: 'Level', value: course.skillLevel },
                  { icon: '👥', label: 'Enrolled', value: `${course.enrolledCount || 0}+ students` },
                  { icon: '🎓', label: 'Certificate', value: course.hasCertificate ? 'Included' : 'Not included' },
                ].map(m => (
                  <div key={m.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xl mb-1">{m.icon}</div>
                    <div className="text-xs text-gray-400 font-medium">{m.label}</div>
                    <div className="text-sm font-semibold text-gray-800 mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              {tabs.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
                    {tabs.map(t => (
                      <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      {activeTab === 'outline' && (
                        <div className="space-y-3">
                          {course.outline.map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                              <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">{item.week}</div>
                              <div>
                                <div className="font-semibold text-gray-800 text-sm">{item.topic}</div>
                                {item.description && <div className="text-gray-500 text-xs mt-0.5">{item.description}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'benefits' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {course.benefits.map((b, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                              <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                              <span className="text-gray-700 text-sm font-medium">{b}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'instructor' && course.instructor && (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                              {course.instructor.image ? <img src={course.instructor.image} alt={course.instructor.name} className="w-full h-full object-cover rounded-2xl" /> : '👨‍🏫'}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{course.instructor.name}</h3>
                              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{course.instructor.bio}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'faqs' && (
                        <div className="space-y-3">
                          {course.faqs.map((f, i) => <FAQItem key={i} faq={f} />)}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </AnimatedSection>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AnimatedSection direction="left">
                <div className="card p-6 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-400 font-medium mb-1">Course Fee</div>
                    <div className="text-4xl font-bold text-blue-600 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Rs. {course.fees?.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Installment plans available</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <a href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                      className="btn-orange w-full justify-center text-base py-4">
                      🚀 Apply Now on WhatsApp
                    </a>
                    <Link to="/admission" className="btn-outline w-full justify-center">
                      Fill Admission Form
                    </Link>
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-5">
                    {[
                      { icon: '⏱️', label: 'Duration', val: course.duration },
                      { icon: '📊', label: 'Level', val: course.skillLevel },
                      { icon: '🏆', label: 'Certificate', val: course.hasCertificate ? 'Yes, included' : 'No' },
                      { icon: '🕐', label: 'Timings', val: 'Morning / Evening' },
                      { icon: '💬', label: 'Language', val: 'Urdu / English' },
                    ].map(i => (
                      <div key={i.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-500"><span>{i.icon}</span>{i.label}</span>
                        <span className="font-semibold text-gray-800">{i.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <p className="text-xs text-orange-700 text-center font-medium">
                      📅 Next batch starting soon! Limited seats available.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
