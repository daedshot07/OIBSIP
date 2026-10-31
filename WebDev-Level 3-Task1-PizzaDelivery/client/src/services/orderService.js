import api from './api';

export const orderService = {
  list: () => api.get('/admin/orders').then(({ data }) => data),
  updateStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then(({ data }) => data),
};
