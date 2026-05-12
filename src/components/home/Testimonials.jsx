import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const testimonials = [
  {
    name: 'Muhammad Usman',
    course: 'Web Development',
    location: 'Multan',
    rating: 5,
    text: 'RICS completely changed my life! I was unemployed for 2 years, enrolled in the Web Development course, and within 3 months of completing it, I landed a job at a tech company in Lahore earning Rs. 50,000/month.',
    avatar: '👨‍💻',
    achievement: 'Now working at TechCorp Lahore',
  },
  {
    name: 'Ayesha Malik',
    course: 'Graphic Designing',
    location: 'Multan',
    rating: 5,
    text: 'The graphic design course at RICS is top-notch. Miss Sana is an amazing instructor who gives real-world projects. I now run my own design studio and earn through Fiverr from home.',
    avatar: '👩‍🎨',
    achievement: 'Fiverr Level 2 Seller — $2000/month',
  },
  {
    name: 'Ahmed Raza',
    course: 'Digital Marketing',
    location: 'Vehari',
    rating: 5,
    text: 'I drove from Vehari every weekend just for this course — and it was worth every km! The digital marketing training is practical and result-oriented. Now managing campaigns for 5 businesses.',
    avatar: '👨‍💼',
    achievement: 'Managing 5 business campaigns',
  },
  {
    name: 'Fatima Noor',
    course: 'Freelancing',
    location: 'Multan',
    rating: 5,
    text: 'Sir Ismaeel\'s freelancing course is genuinely life-changing. He doesn\'t just teach you theory — he shows you exactly how to get clients. I earned my first $200 within weeks of completing the course!',
    avatar: '👩‍💻',
    achievement: 'Earning $1500/month on Upwork',
  },
  {
    name: 'Hassan Tariq',
    course: 'Python Programming',
    location: 'Muzaffargarh',
    rating: 5,
    text: 'The Python course exceeded my expectations. The labs are modern, the instructor is patient, and the curriculum is industry-relevant. Got placed in a data company in Islamabad after completing the course.',
    avatar: '👨‍🔬',
    achievement: 'Data Analyst at InfoSystems Islamabad',
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-sm">★</span>
    ))}
  </div>
);

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="section-label">Student Stories</div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real success stories from real students who transformed their careers at RICS.
          </p>
        </AnimatedSection>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-card border border-gray-100 relative"
            >
              {/* Quote mark */}
              <div className="text-8xl text-blue-100 font-serif leading-none absolute top-6 left-8 select-none">"</div>

              <div className="relative">
                <p className="text-gray-700 text-lg leading-relaxed mb-6 md:pr-8">
                  {testimonials[active].text}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {testimonials[active].name}
                      </div>
                      <div className="text-sm text-gray-500">{testimonials[active].course} • {testimonials[active].location}</div>
                      <StarRating count={testimonials[active].rating} />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-sm font-semibold text-orange-700">
                    🏆 {testimonials[active].achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots and navigation */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active ? 'w-8 h-3 bg-blue-600' : 'w-3 h-3 bg-gray-300 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini cards row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                i === active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-100 hover:border-blue-200 text-gray-700'
              }`}
            >
              <div className="text-xl mb-1">{t.avatar}</div>
              <div className="text-xs font-semibold truncate">{t.name}</div>
              <div className={`text-xs ${i === active ? 'text-blue-200' : 'text-gray-400'}`}>{t.course}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
