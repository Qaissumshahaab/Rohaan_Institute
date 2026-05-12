import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';

const team = [
  { name: 'Mr. Muhammad Ismaeel', role: 'Director & Founder', emoji: '👨‍💼', bio: 'Visionary educator with 15+ years of experience in IT training and education management.' },
  { name: 'Muhammad Adnan', role: 'Word Press Developer', emoji: '👨‍💻', bio: 'Full-stack developer with  industry experience and international project portfolio.' },
  { name: 'Muhammad Amaan', role: 'Graphic Design and video Editing Instructor', emoji: '👩‍🎨', bio: 'Designer with expertise in branding, UI/UX, and digital illustration.' },
  { name: 'Muhammad Adnan', role: 'Digital Marketing Expert', emoji: '📊', bio: 'Certified Google & Meta ads specialist who has managed campaigns worth millions.' },
  { name: 'Mr. Muhammad Ismaeel', role: 'Freelancing Mentor and MS Office Trainer', emoji: '🌐', bio: 'Top-rated Fiverr seller and Upwork pro with $50,000+ earned online. Mentors 500+ freelancers.' },
  { name: 'Muhammad Amaan', role: 'AI Automation and YouTube Automation', emoji: '🐍', bio: 'Specializing in AI-driven automation and YouTube content creation strategies.' },
  { name: 'Israr Khokhar', role: 'Spoken English Instructor', emoji: '💻', bio: 'Experienced English teacher with a passion for helping students improve their communication skills.' },
];

const timeline = [
  { year: '2018', event: 'RICS Founded', desc: 'Established with a vision to bring quality IT education to Multan.' },
  { year: '2019', event: '500 Students Milestone', desc: 'Enrolled our 500th student and expanded our course offerings.' },
  { year: '2020', event: 'Online Classes Launched', desc: 'Pivoted to hybrid learning during COVID-19, serving students remotely.' },
  { year: '2021', event: 'New Campus Opened', desc: 'Inaugurated our second campus with state-of-the-art computer labs.' },
  { year: '2022', event: '2000+ Graduates', desc: 'Celebrated 2000 successful graduates entering the workforce.' },
  { year: '2023', event: 'Industry Partnerships', desc: 'Signed MoUs with 50+ tech companies for student placement.' },
  { year: '2024', event: '5000+ Students', desc: 'Reached the milestone of 5000+ students trained across all programs.' },
];

const achievements = [
  { icon: '🏆', title: 'Best IT Institute Award 2023', body: 'Recognized by South Punjab Education Board' },
  { icon: '🌟', title: 'Google Partner Institute', body: 'Certified partner for Google Digital Garage programs' },
  { icon: '📜', title: 'Government Recognized', body: 'Certificates endorsed by TEVTA Punjab' },
  { icon: '🤝', title: '150+ Partner Companies', body: 'Strong network for student job placements' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About RICS | Rohaan Institute of Computer Studies</title>
        <meta name="description" content="Learn about RICS's story, mission, vision, and the expert team behind Multan's leading IT institute." />
      </Helmet>

      {/* Page Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              About RICS
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Multan's most trusted IT institute — shaping the digital future of Pakistan's youth since 2018.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Institute */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">Who We Are</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Rohaan Institute of Computer Studies (RICS) was founded in 2018 with a clear mission: to bridge the digital skills gap in South Punjab and provide world-class IT education at affordable prices.</p>
                <p>Starting with just 3 courses and a small team of passionate educators, RICS has grown into Multan's most comprehensive tech training center — with 20+ programs, 12 expert instructors, and 5000+ successful graduates.</p>
                <p>We believe that every student, regardless of their background, deserves access to the skills that can unlock a prosperous digital career. Whether it's getting a corporate job, freelancing globally, or starting a business — RICS prepares you for all of it.</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[['5000+', 'Graduates'], ['20+', 'Courses'], ['95%', 'Placement']].map(([v, l]) => (
                  <div key={l} className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Syne, sans-serif' }}>{v}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-2xl opacity-15 scale-105" />
                <div className="relative glass rounded-3xl p-8">
                  {/* Director message */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">👨‍💼</div>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Director's Message</h3>
                      <p className="text-sm text-blue-600 font-medium">Mr. Muhammad Ismaeel — Founder & Director</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-blue-300 pl-4">
                    "At RICS, we don't just teach technology — we build futures. Our commitment is to every student who walks through our doors: we will equip you with the skills, confidence, and network to thrive in the digital economy. Pakistan's youth is its greatest asset, and we are here to unlock that potential."
                  </blockquote>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Our Mission</h3>
                <p className="text-blue-100 leading-relaxed">To provide industry-relevant, affordable, and practical digital education that empowers the youth of South Punjab to compete globally — whether as employees, freelancers, or entrepreneurs.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Our Vision</h3>
                <p className="text-orange-100 leading-relaxed">To become the leading digital skills institute in Punjab by 2027 — producing 20,000+ trained professionals who transform Pakistan's digital economy through innovation and excellence.</p>
              </div>
            </AnimatedSection>
          </div>

          {/* What we stand for */}
          <AnimatedSection className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>What We Stand For</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: '💡', title: 'Innovation', desc: 'Always teaching the latest tools and technologies' },
                { icon: '🤝', title: 'Integrity', desc: 'Honest, transparent, student-first approach' },
                { icon: '🌍', title: 'Inclusion', desc: 'Quality education for all, regardless of background' },
                { icon: '📈', title: 'Impact', desc: 'Measured by student success, not just enrollment' },
              ].map(v => (
                <div key={v.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{v.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="section-label">Our Journey</div>
            <h2 className="section-title">RICS <span className="gradient-text">Timeline</span></h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-orange-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.08} direction={i % 2 === 0 ? 'right' : 'left'}>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${i % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                        <div className="font-bold text-gray-900 mb-1">{item.event}</div>
                        <div className="text-gray-500 text-sm">{item.desc}</div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs border-4 border-white shadow-md z-10">
                      {item.year.slice(2)}
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <div className="section-label">Recognition</div>
            <h2 className="section-title">Our <span className="gradient-text-orange">Achievements</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 duration-300 text-center">
                  <div className="text-5xl mb-4">{a.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{a.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{a.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="section-label">Our Experts</div>
            <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
            <p className="section-subtitle mx-auto">Industry veterans passionate about transforming students into professionals.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                  className="card p-6 text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                    <span className="group-hover:scale-110 transition-transform inline-block">{member.emoji}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{member.name}</h3>
                  <p className="text-blue-600 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
