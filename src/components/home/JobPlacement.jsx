import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

const partners = [
  { name: 'Systems Ltd', abbr: 'SL' },
  { name: 'NetSol Technologies', abbr: 'NT' },
  { name: 'Arbisoft', abbr: 'AB' },
  { name: 'TechVista', abbr: 'TV' },
  { name: 'Ropstam', abbr: 'RS' },
  { name: 'Devsinc', abbr: 'DV' },
  { name: 'Creative Chaos', abbr: 'CC' },
  { name: 'IntelliSOFT', abbr: 'IS' },
];

const placements = [
  { value: '95%', label: 'Placement Rate', icon: '📈' },
  { value: '3500+', label: 'Students Hired', icon: '💼' },
  { value: '2500+', label: 'Active Freelancers', icon: '🌐' },
  { value: '$500K+', label: 'Freelancing Revenue', icon: '💰' },
];

export default function JobPlacement() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="section-label">Career Outcomes</div>
          <h2 className="section-title">
            Real Jobs, Real <span className="gradient-text-orange">Earnings</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our students are working at top companies and earning globally as freelancers.
          </p>
        </AnimatedSection>

        {/* Placement stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {placements.map((p, i) => (
            <AnimatedSection key={p.label} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="text-4xl mb-3">{p.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {p.value}
                </div>
                <div className="text-gray-500 text-sm">{p.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Partner companies */}
        <AnimatedSection className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-700" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our students work at these companies & more
          </h3>
        </AnimatedSection>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {partners.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center p-4 aspect-square group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-2 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                <span className="text-xs font-bold text-blue-700 group-hover:text-white transition-colors">{p.abbr}</span>
              </div>
              <span className="text-gray-500 text-xs text-center leading-tight hidden sm:block">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
