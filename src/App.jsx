import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Providers & guards
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layout components (always loaded)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import ScrollToTop from './components/common/ScrollToTop';
import AdminLayout from './components/admin/AdminLayout';

// ─── Lazy-loaded public pages ─────────────────────────────────────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// ─── Lazy-loaded admin pages ──────────────────────────────────────────────────
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminAdmissions = lazy(() => import('./pages/admin/AdminAdmissions'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'));

// ─── Page loading fallback ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

// ─── Page transition wrapper ──────────────────────────────────────────────────
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─── Public layout wrapper ────────────────────────────────────────────────────
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}

// ─── 404 Page ─────────────────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. You may have mistyped the address or the page has moved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/" className="btn-primary">Go to Homepage</a>
            <a href="/courses" className="btn-outline">Browse Courses</a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ── Admin routes (no public nav/footer) ── */}
            <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminDashboard /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminStudents /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminCourses /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/admissions" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminAdmissions /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminMessages /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminGallery /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/admins" element={
              <ProtectedRoute superOnly>
                <AdminLayout>
                  <PageTransition><AdminManagement /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Redirect /admin → /admin/dashboard */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition><AdminDashboard /></PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* ── Public routes (with nav/footer) ── */}
            <Route path="/" element={
              <PublicLayout>
                <PageTransition><HomePage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/courses" element={
              <PublicLayout>
                <PageTransition><CoursesPage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/courses/:slug" element={
              <PublicLayout>
                <PageTransition><CourseDetailPage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/about" element={
              <PublicLayout>
                <PageTransition><AboutPage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/admission" element={
              <PublicLayout>
                <PageTransition><AdmissionPage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/gallery" element={
              <PublicLayout>
                <PageTransition><GalleryPage /></PageTransition>
              </PublicLayout>
            } />
            <Route path="/contact" element={
              <PublicLayout>
                <PageTransition><ContactPage /></PageTransition>
              </PublicLayout>
            } />

            {/* ── 404 fallback ── */}
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AuthProvider>
  );
}
