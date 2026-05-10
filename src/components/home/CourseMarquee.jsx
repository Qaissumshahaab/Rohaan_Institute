import React from 'react';

const courses = [
  { name: 'Web Development', icon: '💻' },
  { name: 'Graphic Designing', icon: '🎨' },
  { name: 'Digital Marketing', icon: '📊' },
  { name: 'MS Office', icon: '📋' },
  { name: 'Freelancing', icon: '🌐' },
  { name: 'Python Programming', icon: '🐍' },
  { name: 'Video Editing', icon: '🎬' },
  { name: 'UI/UX Design', icon: '🖼️' },
  { name: 'E-Commerce', icon: '🛒' },
  { name: 'Cyber Security', icon: '🔐' },
  { name: 'Data Analysis', icon: '📈' },
  { name: 'Mobile App Dev', icon: '📱' },
];

const doubled = [...courses, ...courses]; // duplicate for seamless loop

export default function CourseMarquee() {
  return (
    <section className="py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      <div className="marquee-track gap-0">
        {doubled.map((course, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 py-2 whitespace-nowrap border-r border-white/20"
          >
            <span className="text-xl">{course.icon}</span>
            <span className="text-white font-semibold text-sm tracking-wide">{course.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
