import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../common/AnimatedSection';

const faqs = [
  {
    q: 'What are the admission requirements for courses at MIDT?',
    a: 'No prior experience is needed for most beginner courses. You only need a basic understanding of using a computer. For advanced courses, some prerequisite knowledge may be required which will be mentioned in the course details.',
  },
  {
    q: 'Are installment payment options available?',
    a: 'Yes! We offer flexible installment plans for all our courses. You can pay the fee in 2-3 installments. Contact our admission office for specific installment schedules for the course you are interested in.',
  },
  {
    q: 'Will I get a certificate after completing the course?',
    a: 'Absolutely! All students who complete their course and pass the final assessment receive a government-recognized certificate from MIDT. Our certificates are widely accepted by employers across Pakistan.',
  },
  {
    q: 'What batch timings are available?',
    a: 'We offer morning (9 AM–12 PM), afternoon (1 PM–4 PM), and evening (5 PM–8 PM) batches for most courses. Weekend batches (Saturday & Sunday) are also available for working professionals.',
  },
  {
    q: 'Do you help with job placement after course completion?',
    a: 'Yes! MIDT has a dedicated placement cell that connects students with our partner companies. We also provide resume writing workshops, mock interviews, and help you set up freelancing profiles on Fiverr and Upwork.',
  },
  {
    q: 'How long does each course take to complete?',
    a: 'Course duration varies: MS Office takes 2 months, Graphic Design takes 3 months, Web Development takes 6 months. You can check the full duration on each course\'s detail page.',
  },
  {
    q: 'Is there any internship opportunity after completing the course?',
    a: 'Yes! High-performing students are offered internship opportunities at MIDT\'s partner companies. We also connect students with remote internships for freelancing platforms.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedSection delay={index * 0.05}>
      <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-blue-200 shadow-sm' : 'border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        >
          <span className={`font-semibold text-sm md:text-base pr-4 ${open ? 'text-blue-600' : 'text-gray-800'}`}>
            {faq.q}
          </span>
          <span className={`text-lg flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
            {open ? '✕' : '+'}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto">Everything you need to know before enrolling.</p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 text-sm font-semibold mb-6">
            🚀 Limited Seats Available — Next Batch Starting Soon!
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Ready to Start Your{' '}
            <span className="text-orange-400">Tech Journey?</span>
          </h2>

          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who already transformed their lives with RICS. Your dream career starts with a single step.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admission" className="btn-orange text-base px-10 py-4">
              Enroll Now — It's Time! 🎓
            </Link>
            <a
              href="https://wa.me/923057777009?text=I want to know more about RICs courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all duration-300"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            {['⭐ 4.9/5 Google Rating', '🎓 5000+ Graduates', '🏆 7 Years of Excellence', '💼 95% Placement'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
