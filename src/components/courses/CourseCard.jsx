import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryColors = {
  'Web Development': 'bg-blue-100 text-blue-700',
  'Graphic Design': 'bg-purple-100 text-purple-700',
  'Digital Marketing': 'bg-green-100 text-green-700',
  'MS Office': 'bg-yellow-100 text-yellow-700',
  'Freelancing': 'bg-orange-100 text-orange-700',
  'Programming': 'bg-red-100 text-red-700',
  'Video Editing': 'bg-pink-100 text-pink-700',
  'UI/UX Design': 'bg-indigo-100 text-indigo-700',
  'E-Commerce': 'bg-teal-100 text-teal-700',
};

const levelIcons = { Beginner: '🟢', Intermediate: '🟡', Advanced: '🔴' };

const WHATSAPP_NUMBER = '923001234567';

export default function CourseCard({ course }) {
  const {
    _id,
    slug,
    title,
    description,
    duration,
    fees,
    skillLevel,
    category,
    thumbnail,
    hasCertificate,
    enrolledCount,
  } = course;

  const whatsappMsg = encodeURIComponent(
    `Hi! I want to apply for the *${title}* course at MIDT. Please guide me through the admission process.`
  );

  // Gradient thumbnails when no image
  const gradients = [
    'from-blue-500 to-blue-700',
    'from-orange-400 to-orange-600',
    'from-purple-500 to-purple-700',
    'from-green-500 to-green-700',
    'from-pink-500 to-pink-700',
    'from-indigo-500 to-indigo-700',
  ];
  const gradient = gradients[Math.abs((title?.charCodeAt(0) || 0) % gradients.length)];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white text-5xl opacity-50">
              {category === 'Web Development' ? '💻' :
               category === 'Graphic Design' ? '🎨' :
               category === 'Digital Marketing' ? '📊' :
               category === 'Freelancing' ? '🌐' :
               category === 'Programming' ? '🐍' :
               category === 'Video Editing' ? '🎬' :
               category === 'UI/UX Design' ? '🖼️' : '📚'}
            </span>
          </div>
        )}
        {hasCertificate && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            🎓 Certificate
          </div>
        )}
        <div className={`absolute top-3 left-3 ${categoryColors[category] || 'bg-gray-100 text-gray-700'} text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{description}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <span>⏱️</span>
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{levelIcons[skillLevel]}</span>
            <span>{skillLevel}</span>
          </div>
          {enrolledCount > 0 && (
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{enrolledCount}+</span>
            </div>
          )}
        </div>

        {/* Fee */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-gray-400">Course Fee</span>
            <div className="text-blue-600 font-bold text-xl">
              Rs. {fees?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/courses/${slug || _id}`}
            className="flex-1 text-center btn-outline text-sm py-2.5"
          >
            Details
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center btn-orange text-sm py-2.5 justify-center"
          >
            Apply Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
