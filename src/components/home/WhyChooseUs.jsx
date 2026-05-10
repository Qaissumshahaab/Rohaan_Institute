import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

const features = [
  {
    icon: '👨‍🏫',
    title: 'Expert Instructors',
    desc: 'Learn from industry professionals with 5+ years of hands-on experience in their respective fields.',
    color: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    iconBg: 'bg-blue-600',
  },
  {
    icon: '🛠️',
    title: 'Practical Training',
    desc: '80% hands-on projects and real-world assignments. Build a portfolio while you learn.',
    color: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    iconBg: 'bg-orange-500',
  },
  {
    icon: '💰',
    title: 'Affordable Fees',
    desc: 'Quality education at Multan\'s most competitive prices. Easy installment plans available.',
    color: 'from-green-50 to-green-100',
    border: 'border-green-200',
    iconBg: 'bg-green-600',
  },
  {
    icon: '🎯',
    title: 'Career Guidance',
    desc: 'One-on-one mentoring, resume building, and interview preparation for every student.',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    iconBg: 'bg-purple-600',
  },
  {
    icon: '🏆',
    title: 'Certifications',
    desc: 'Government-recognized certificates valid across Pakistan and internationally accepted.',
    color: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-200',
    iconBg: 'bg-yellow-500',
  },
  {
    icon: '🖥️',
    title: 'Modern Labs',
    desc: 'State-of-the-art computer labs with the latest hardware and software tools.',
    color: 'from-pink-50 to-pink-100',
    border: 'border-pink-200',
    iconBg: 'bg-pink-600',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimatedSection className="text-center mb-14">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">
            The <span className="gradient-text">MIDT Advantage</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Discover why thousands of students from across South Punjab choose MIDT to launch their digital careers.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <div className={`relative rounded-2xl p-6 bg-gradient-to-br ${feature.color} border ${feature.border} hover:shadow-lg transition-all duration-300 group cursor-default`}>
                <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
