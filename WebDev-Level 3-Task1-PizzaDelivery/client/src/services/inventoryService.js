import api from './api';

export const inventoryService = {
  list: () => api.get('/admin/inventory').then(({ data }) => data),
  update: (id, payload) => api.put(`/admin/inventory/${id}`, payload).then(({ data }) => data),
};
