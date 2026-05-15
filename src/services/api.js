import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json' ,},
  withCredentials: true,
  
});

// Attach token from localStorage automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('midt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('midt_token');
      localStorage.removeItem('midt_admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ─── API helpers ─────────────────────────────────────────────────────────────

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getOne: (slug) => api.get(`/courses/${slug}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

export const admissionsAPI = {
  submit: (data) => api.post('/admissions', data),
  getAll: () => api.get('/admissions'),
  updateStatus: (id, status) => api.put(`/admissions/${id}`, { status }),
  delete: (id) => api.delete(`/admissions/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id) => api.put(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  create: (data) => api.post('/gallery', data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const studentsAPI = {
  getAll: () => api.get('/students'),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

export const adminAPI = {
  getAll: () => api.get('/admins'),
  create: (data) => api.post('/admins', data),
  delete: (id) => api.delete(`/admins/${id}`),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};
