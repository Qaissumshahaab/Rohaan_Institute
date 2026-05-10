# MIDT Frontend — React Website

Modern, fully responsive React.js frontend for **Multan Institute of Digital Technology** (MIDT).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM v6 |
| Animations | Framer Motion 10 |
| HTTP Client | Axios |
| SEO | react-helmet-async |
| Notifications | react-hot-toast |
| Counters | react-countup |
| Scroll Detection | react-intersection-observer |

---

## Folder Architecture

```
frontend/src/
├── components/
│   ├── admin/
│   │   └── AdminLayout.jsx       # Admin sidebar + top-bar layout
│   ├── common/
│   │   ├── AnimatedSection.jsx   # Scroll-reveal wrapper
│   │   ├── ProtectedRoute.jsx    # JWT-guarded route
│   │   ├── ScrollToTop.jsx       # Floating scroll-to-top button
│   │   └── WhatsAppFloat.jsx     # Global WhatsApp chat button
│   ├── courses/
│   │   └── CourseCard.jsx        # Reusable course card
│   ├── home/
│   │   ├── HeroSection.jsx       # Landing hero with floating icons
│   │   ├── CourseMarquee.jsx     # Animated scrolling courses bar
│   │   ├── WhyChooseUs.jsx       # Feature cards section
│   │   ├── StatsSection.jsx      # Animated counters
│   │   ├── Testimonials.jsx      # Student testimonials carousel
│   │   ├── JobPlacement.jsx      # Placement stats + partner logos
│   │   └── FAQandCTA.jsx         # FAQ accordion + big CTA section
│   └── layout/
│       ├── Navbar.jsx            # Sticky responsive navbar
│       └── Footer.jsx            # Full-featured footer
├── context/
│   └── AuthContext.jsx           # Admin auth state (JWT)
├── pages/
│   ├── admin/
│   │   ├── AdminLogin.jsx        # Admin sign-in page
│   │   ├── AdminDashboard.jsx    # Stats + recent admissions
│   │   ├── AdminStudents.jsx     # Student CRUD
│   │   ├── AdminCourses.jsx      # Course CRUD
│   │   ├── AdminAdmissions.jsx   # Admission requests management
│   │   ├── AdminMessages.jsx     # Contact messages inbox
│   │   ├── AdminGallery.jsx      # Gallery management
│   │   └── AdminManagement.jsx   # Admin accounts (super_admin only)
│   ├── HomePage.jsx              # Home with all sections
│   ├── CoursesPage.jsx           # All courses with search/filter
│   ├── CourseDetailPage.jsx      # Single course detail
│   ├── AboutPage.jsx             # About, team, timeline
│   ├── AdmissionPage.jsx         # Admission form + WhatsApp
│   ├── GalleryPage.jsx           # Photo gallery with lightbox
│   └── ContactPage.jsx           # Contact form + map
├── services/
│   └── api.js                    # Axios instance + all API helpers
├── App.jsx                       # Root router + lazy loading
├── main.jsx                      # React entry point
└── index.css                     # Global styles + Tailwind directives
```

---

## Environment Variables

```env
# .env (copy from .env.example)
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=923001234567
```

In **production**, set `VITE_API_URL` to your deployed backend URL.

---

## Installation & Running

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Set up environment
cp .env.example .env
# Edit VITE_API_URL if your backend is not on localhost:5000

# 3. Start development server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

---

## Key Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero, courses, stats, testimonials, FAQ |
| `/courses` | CoursesPage | All courses with search/filter |
| `/courses/:slug` | CourseDetailPage | Course detail with outline, FAQs |
| `/about` | AboutPage | Institute info, team, timeline |
| `/admission` | AdmissionPage | Admission form → WhatsApp |
| `/gallery` | GalleryPage | Photo gallery with lightbox |
| `/contact` | ContactPage | Contact form + Google Maps |
| `/admin/login` | AdminLogin | Admin authentication |
| `/admin/dashboard` | AdminDashboard | 🔒 Stats overview |
| `/admin/students` | AdminStudents | 🔒 Student management |
| `/admin/courses` | AdminCourses | 🔒 Course management |
| `/admin/admissions` | AdminAdmissions | 🔒 Admission requests |
| `/admin/messages` | AdminMessages | 🔒 Contact inbox |
| `/admin/gallery` | AdminGallery | 🔒 Gallery management |
| `/admin/admins` | AdminManagement | 🔒👑 Admin accounts (super_admin) |

---

## Design System

### Colors
- **Primary Blue:** `#2563eb` (blue-600)
- **Accent Orange:** `#f97316` (orange-500)
- **Background:** `#ffffff` (pure white)
- **Text:** `#111827` (gray-900)

### Typography
- **Body:** Plus Jakarta Sans
- **Headings:** Syne
- **Code:** JetBrains Mono

### Key CSS Classes
```css
.btn-primary     /* Blue filled button */
.btn-orange      /* Orange filled button */
.btn-outline     /* Blue outlined button */
.card            /* White card with shadow */
.glass           /* Glassmorphism card */
.gradient-text   /* Blue gradient text */
.section-label   /* Small section badge */
.section-title   /* Section heading */
```

---

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# From /frontend directory
vercel

# Add environment variable in Vercel dashboard:
# VITE_API_URL = https://your-backend.vercel.app/api
```

`vercel.json` is already configured to handle SPA client-side routing.

---

## Admin Access

Navigate to `/admin/login` and sign in with:

| Field | Value |
|-------|-------|
| Email | protonium33@gmail.com |
| Password | 98989877 |

> ⚠️ Change credentials after first login.
