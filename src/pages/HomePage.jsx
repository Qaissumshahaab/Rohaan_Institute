import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import CourseMarquee from '../components/home/CourseMarquee';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import Testimonials from '../components/home/Testimonials';
import JobPlacement from '../components/home/JobPlacement';
import { FAQSection, CTASection } from '../components/home/FAQandCTA';
import CourseCard from '../components/courses/CourseCard';
import AnimatedSection from '../components/common/AnimatedSection';
import { coursesAPI } from '../services/api';

// Newsletter section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            📬 Stay Updated with MIDT
          </h3>
          <p className="text-gray-600 mb-6">Get notified about new courses, batch announcements, and student success stories.</p>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-semibold">
              ✅ Thank you! You're now subscribed.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-sm"
              />
              <button type="submit" className="btn-primary text-sm px-6 py-3">Subscribe</button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesAPI.getAll({ featured: true })
      .then(res => setFeaturedCourses(res.data.courses || []))
      .catch(() => setFeaturedCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Skeleton cards for loading state
  const SkeletonCard = () => (
    <div className="card p-0 overflow-hidden">
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Rohaan Institute of Computer Studies | Best Computer Institute in Multan</title>
        <meta name="description" content="RICS offers professional IT courses in Multan. Web Development, Graphic Design, Digital Marketing, Python, Freelancing & more. Government-recognized certificates." />
        <meta property="og:title" content="Rohaan Institute of Computer Studies" />
        <meta property="og:description" content="Start your tech career at RICS — Multan's leading computer institute." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <CourseMarquee />

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="section-label">Popular Programs</div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Courses</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Our most popular and job-ready programs with industry-recognized certification.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : featuredCourses.slice(0, 6).map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </div>

          <div className="text-center">
            <Link to="/courses" className="btn-primary text-base px-10">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <StatsSection />
      <JobPlacement />
      <Testimonials />

      {/* Inline Admission CTA */}
      <section id="admission" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 border border-blue-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Ready to Enroll?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Visit our Admission page to apply now or chat with us on WhatsApp for instant assistance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/admission" className="btn-primary text-base px-8 py-4">
                  Go to Admission →
                </Link>
                <a
                  href="https://wa.me/923057777009?text=I want to enroll at RICS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
