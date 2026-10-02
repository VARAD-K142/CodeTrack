import api from './api.js';

export const problemService = {
  getAll: () => api.get('/problems'),
  getOne: (id) => api.get(`/problems/${id}`),
  create: (data) => api.post('/problems', data),
  update: (id, data) => api.put(`/problems/${id}`, data),
  delete: (id) => api.delete(`/problems/${id}`),
  getDashboardStats: () => api.get('/dashboard/stats'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data)
};
