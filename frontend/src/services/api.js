import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    return Promise.reject(error);
  }
);

// Servicios de solicitudes
export const requestService = {
  // Crear nueva solicitud
  create: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  // Obtener todas las solicitudes con filtros
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.responsable) params.append('responsable', filters.responsable);
    
    const response = await api.get(`/requests?${params}`);
    return response.data;
  },

  // Obtener solicitud por ID con histórico
  getById: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  // Actualizar estado de solicitud (aprobar/rechazar)
  updateStatus: async (id, statusData) => {
    const response = await api.patch(`/requests/${id}/status`, statusData);
    return response.data;
  },

  // Agregar comentario
  addComment: async (id, commentData) => {
    const response = await api.post(`/requests/${id}/comment`, commentData);
    return response.data;
  },

  // Obtener estadísticas de pendientes
  getPendingStats: async () => {
    const response = await api.get('/requests/stats/pending');
    return response.data;
  }
};

export default api;