import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../common/AnimatedSection';

const stats = [
  { value: 5000, suffix: '+', label: 'Students Trained', icon: '👨‍🎓', color: 'text-blue-600' },
  { value: 95, suffix: '%', label: 'Placement Rate', icon: '📈', color: 'text-orange-500' },
  { value: 20, suffix: '+', label: 'Expert Courses', icon: '📚', color: 'text-blue-600' },
  { value: 7, suffix: '+', label: 'Years of Excellence', icon: '🏆', color: 'text-orange-500' },
  { value: 150, suffix: '+', label: 'Partner Companies', icon: '🤝', color: 'text-blue-600' },
  { value: 2500, suffix: '+', label: 'Freelancers Launched', icon: '💻', color: 'text-orange-500' },
];

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <AnimatedSection delay={index * 0.1}>
      <div ref={ref} className="text-center p-6 group">
        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
          {stat.icon}
        </div>
        <div className={`text-4xl font-bold mb-1 ${stat.color}`} style={{ fontFamily: 'Syne, sans-serif' }}>
          {inView ? (
            <CountUp end={stat.value} duration={2.5} separator="," />
          ) : '0'}
          {stat.suffix}
        </div>
        <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
      </div>
    </AnimatedSection>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Track Record Speaks for Itself
          </h2>
          <p className="text-blue-200">Numbers that reflect our commitment to student success</p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <StatCard stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
