import api from './api';
export const authService = {
  register: (payload) => api.post('/auth/register', payload).then(({ data }) => data),
  login: (payload) => api.post('/auth/login', payload).then(({ data }) => data),
  me: () => api.get('/auth/me').then(({ data }) => data),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`).then(({ data }) => data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(({ data }) => data),
  resetPassword: (token, payload) => api.post(`/auth/reset-password/${token}`, payload).then(({ data }) => data),
};
