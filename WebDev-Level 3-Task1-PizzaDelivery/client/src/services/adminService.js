import api from './api';

export const adminService = {
  register: (payload) => api.post('/admin/register', payload).then(({ data }) => data),
  login: (payload) => api.post('/admin/login', payload).then(({ data }) => data),
  me: () => api.get('/admin/me').then(({ data }) => data),
  list: () => api.get('/admin/list').then(({ data }) => data),
};
