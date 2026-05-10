import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import AnimatedSection from '../components/common/AnimatedSection';
import { admissionsAPI, coursesAPI } from '../services/api';

const WHATSAPP = '923001234567';
const TIMINGS = ['Morning (9:00 AM – 12:00 PM)', 'Afternoon (1:00 PM – 4:00 PM)', 'Evening (5:00 PM – 8:00 PM)', 'Weekend (Sat & Sun)'];

const steps = [
  { step: '01', icon: '📝', title: 'Fill the Form', desc: 'Complete the admission form with your details and preferred course.' },
  { step: '02', icon: '💬', title: 'WhatsApp Confirmation', desc: 'Our team will reach you on WhatsApp within 24 hours to confirm.' },
  { step: '03', icon: '🧪', title: 'Orientation Session', desc: 'Attend a free orientation to meet instructors and understand the curriculum.' },
  { step: '04', icon: '💰', title: 'Fee Submission', desc: 'Submit the fee (or first installment) and officially secure your seat.' },
  { step: '05', icon: '🚀', title: 'Start Learning', desc: 'Join your class and begin your journey to a successful digital career!' },
];

const intakeDates = [
  { month: 'January 2025', status: 'Full', batch: '2025-A' },
  { month: 'April 2025', status: 'Open', batch: '2025-B' },
  { month: 'July 2025', status: 'Upcoming', batch: '2025-C' },
  { month: 'October 2025', status: 'Upcoming', batch: '2025-D' },
];

const statusColors = { Full: 'bg-red-100 text-red-600', Open: 'bg-green-100 text-green-700', Upcoming: 'bg-yellow-100 text-yellow-700' };

export default function AdmissionPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', whatsapp: '', email: '', course: '', timing: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    coursesAPI.getAll().then(res => setCourses(res.data.courses || [])).catch(() => {});
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) errs.fullName = 'Please enter your full name (min 3 chars)';
    if (!form.whatsapp.match(/^(\+92|0)[0-9]{10}$/)) errs.whatsapp = 'Enter a valid Pakistani number (e.g. 03001234567)';
    if (form.email && !form.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Enter a valid email address';
    if (!form.course) errs.course = 'Please select a course';
    if (!form.timing) errs.timing = 'Please select your preferred timing';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); toast.error('Please fix the errors below.'); return; }

    setLoading(true);
    try {
      await admissionsAPI.submit(form);

      // Build WhatsApp message
      const waMsg = encodeURIComponent(
        `*New Admission Request — MIDT* 🎓\n\n` +
        `*Name:* ${form.fullName}\n` +
        `*WhatsApp:* ${form.whatsapp}\n` +
        `*Email:* ${form.email || 'N/A'}\n` +
        `*Course:* ${form.course}\n` +
        `*Preferred Timing:* ${form.timing}\n` +
        `*Message:* ${form.message || 'None'}\n\n` +
        `Please confirm admission and guide me further. Thank you!`
      );

      window.open(`https://wa.me/${WHATSAPP}?text=${waMsg}`, '_blank');
      setSubmitted(true);
      toast.success('Application submitted! WhatsApp opened for confirmation.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, required }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label} {required && <span className="text-orange-500">*</span>}</label>
      <input
        type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} required={required}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors[name] ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1.5">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admission | MIDT — Apply Now</title>
        <meta name="description" content="Apply for admission at MIDT Multan. Fill the form to enroll in Web Development, Graphic Design, Python, Digital Marketing, and more." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Apply for Admission</h1>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">Take the first step toward your digital career. Fill the form and we'll guide you through the rest.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                    📋 Admission Application Form
                  </h2>

                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                      <div className="text-7xl mb-4">🎉</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
                      <p className="text-gray-600 mb-2">Your application has been saved. A WhatsApp message has also been sent to our team.</p>
                      <p className="text-gray-500 text-sm mb-6">We'll contact you within 24 hours to confirm your enrollment.</p>
                      <button onClick={() => { setSubmitted(false); setForm({ fullName: '', whatsapp: '', email: '', course: '', timing: '', message: '' }); }}
                        className="btn-primary">Submit Another Application</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <InputField label="Full Name" name="fullName" placeholder="e.g. Muhammad Ali" required />
                      <InputField label="WhatsApp Number" name="whatsapp" type="tel" placeholder="e.g. 03001234567" required />
                      <InputField label="Email Address" name="email" type="email" placeholder="e.g. you@gmail.com" />

                      {/* Course dropdown */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Course <span className="text-orange-500">*</span></label>
                        <select name="course" value={form.course} onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${errors.course ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`}>
                          <option value="">-- Select a Course --</option>
                          {courses.length > 0
                            ? courses.map(c => <option key={c._id} value={c.title}>{c.title} — Rs. {c.fees?.toLocaleString()}</option>)
                            : ['Web Development', 'Graphic Designing', 'Digital Marketing', 'Python Programming', 'Freelancing', 'MS Office', 'Video Editing', 'UI/UX Design'].map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))
                          }
                        </select>
                        {errors.course && <p className="text-red-500 text-xs mt-1.5">{errors.course}</p>}
                      </div>

                      {/* Timing dropdown */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Timing <span className="text-orange-500">*</span></label>
                        <select name="timing" value={form.timing} onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-all ${errors.timing ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`}>
                          <option value="">-- Select Timing --</option>
                          {TIMINGS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.timing && <p className="text-red-500 text-xs mt-1.5">{errors.timing}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Message <span className="text-gray-400 font-normal">(optional)</span></label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                          placeholder="Any questions or special requirements..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition-all" />
                      </div>

                      <button type="submit" disabled={loading}
                        className="btn-orange w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (
                          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting...</span>
                        ) : '🚀 Submit Application & Open WhatsApp'}
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        By submitting, you agree to be contacted by MIDT on the provided WhatsApp number.
                      </p>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              {/* How to Apply */}
              <AnimatedSection direction="left">
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>📌 How to Take Admission</h3>
                  <div className="space-y-4">
                    {steps.map((s) => (
                      <div key={s.step} className="flex gap-3">
                        <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{s.icon} {s.title}</div>
                          <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Intake Dates */}
              <AnimatedSection direction="left" delay={0.1}>
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>📅 Next Intake Dates</h3>
                  <div className="space-y-3">
                    {intakeDates.map(d => (
                      <div key={d.batch} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{d.month}</div>
                          <div className="text-gray-400 text-xs">Batch {d.batch}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[d.status]}`}>{d.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Fee info */}
              <AnimatedSection direction="left" delay={0.2}>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>💰 Fee Information</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><span className="text-orange-500">✓</span> Course fees range from Rs. 5,000 to Rs. 15,000</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">✓</span> Easy 2–3 installment plans available</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">✓</span> No hidden charges or registration fees</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">✓</span> Special discounts for siblings & referrals</li>
                  </ul>
                </div>
              </AnimatedSection>

              {/* Support contact */}
              <AnimatedSection direction="left" delay={0.3}>
                <div className="card p-5 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">📞 Need Help?</h3>
                  <a href={`https://wa.me/${WHATSAPP}?text=I need help with admission at MIDT`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors mb-2">
                    <span className="text-xl">💬</span>
                    <span className="text-sm font-semibold text-gray-800">Chat on WhatsApp</span>
                  </a>
                  <a href="tel:+923001234567" className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <span className="text-xl">📞</span>
                    <span className="text-sm font-semibold text-gray-800">+92 300 123 4567</span>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
