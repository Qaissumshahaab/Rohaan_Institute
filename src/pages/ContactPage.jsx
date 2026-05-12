import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import AnimatedSection from '../components/common/AnimatedSection';
import { contactAPI } from '../services/api';

const WHATSAPP = '923057777009';

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Main Hussain Agahi, Near Ghanta Ghar, Multan, Punjab, Pakistan', href: null },
  { icon: '📞', label: 'Phone', value: '+92 300 123 4567', href: 'tel:+923001234567' },
  { icon: '💬', label: 'WhatsApp', value: '+92 300 123 4567', href: `https://wa.me/${WHATSAPP}` },
  { icon: '✉️', label: 'Email', value: 'info@midt.edu.pk', href: 'mailto:info@midt.edu.pk' },
  { icon: '🕐', label: 'Office Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM', href: null },
];

const socialLinks = [
  { icon: '📘', name: 'Facebook', href: 'https://facebook.com', color: 'hover:bg-blue-600' },
  { icon: '📸', name: 'Instagram', href: 'https://instagram.com', color: 'hover:bg-pink-600' },
  { icon: '▶️', name: 'YouTube', href: 'https://youtube.com', color: 'hover:bg-red-600' },
  { icon: '💬', name: 'WhatsApp', href: `https://wa.me/${WHATSAPP}`, color: 'hover:bg-green-500' },
];

const Field = ({ label, name, type = 'text', placeholder, required, rows, form, errors, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label} {required && <span className="text-orange-500">*</span>}</label>
    {rows ? (
      <textarea name={name} value={form[name]} onChange={onChange} rows={rows} placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 resize-none transition-all ${errors[name] ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`} />
    ) : (
      <input type={type} name={name} value={form[name]} onChange={onChange} placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors[name] ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`} />
    )}
    {errors[name] && <p className="text-red-500 text-xs mt-1.5">{errors[name]}</p>}
  </div>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = 'Enter a valid email address';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters';
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
    if (Object.keys(errs).length > 0) { setErrors(errs); toast.error('Please fix the errors.'); return; }
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSubmitted(true);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | MIDT Multan</title>
        <meta name="description" content="Contact Multan Institute of Digital Technology. Phone, WhatsApp, email, or visit us in person in Multan." />
      </Helmet>

      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Get In Touch</h1>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">Have a question or want to visit us? We'd love to hear from you.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>✉️ Send Us a Message</h2>

                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="text-7xl mb-4">✅</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
                      <p className="text-gray-600 mb-5">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-primary">Send Another Message</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Your Name" name="name" placeholder="Muhammad Ali" required form={form} errors={errors} onChange={handleChange} />
                        <Field label="Email Address" name="email" type="email" placeholder="you@gmail.com" required form={form} errors={errors} onChange={handleChange} />
                      </div>
                      <Field label="Subject" name="subject" placeholder="What is this about?" required form={form} errors={errors} onChange={handleChange} />
                      <Field label="Message" name="message" placeholder="Write your message here..." required rows={5} form={form} errors={errors} onChange={handleChange} />
                      <button type="submit" disabled={loading}
                        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (
                          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</span>
                        ) : '📨 Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <AnimatedSection direction="left">
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>📌 Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map(info => (
                      <div key={info.label} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-xl flex-shrink-0 mt-0.5">{info.icon}</span>
                        <div>
                          <div className="text-xs text-gray-400 font-medium mb-0.5">{info.label}</div>
                          {info.href ? (
                            <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                              className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{info.value}</a>
                          ) : (
                            <div className="text-sm font-semibold text-gray-800">{info.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* WhatsApp quick link */}
              <AnimatedSection direction="left" delay={0.1}>
                <a href={`https://wa.me/${WHATSAPP}?text=Hello! I have a query about MIDT.`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors group">
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">💬</div>
                  <div>
                    <div className="font-bold text-gray-900">Chat on WhatsApp</div>
                    <div className="text-sm text-gray-500">Instant replies during office hours</div>
                  </div>
                </a>
              </AnimatedSection>

              {/* Social links */}
              <AnimatedSection direction="left" delay={0.2}>
                <div className="card p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map(s => (
                      <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-3 rounded-xl border border-gray-100 ${s.color} hover:text-white hover:border-transparent transition-all duration-200 group`}>
                        <span className="text-lg">{s.icon}</span>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Google Maps embed */}
          <AnimatedSection className="mt-12">
            <div className="rounded-3xl overflow-hidden shadow-card border border-gray-100">
              <div className="bg-gray-100 p-4 flex items-center gap-3 border-b border-gray-200">
                <span className="text-xl">📍</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">MIDT Campus — Multan</div>
                  <div className="text-gray-500 text-xs">Main Hussain Agahi, Near Ghanta Ghar, Multan</div>
                </div>
                <a href="https://maps.google.com?q=Hussain+Agahi+Multan" target="_blank" rel="noopener noreferrer"
                  className="ml-auto btn-outline text-xs px-3 py-1.5">Open in Maps</a>
              </div>
              <iframe
                title="RICS Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.7!2d71.4755!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b33db57ae2a23%3A0x16e9b8d8bf862cce!2sGhanta%20Ghar%20Multan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
