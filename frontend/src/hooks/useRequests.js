import { useState, useEffect } from 'react';
import { requestService } from '../services/api';

export const useRequests = (filters = {}) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestService.getAll(filters);
      setRequests(data);
    } catch (err) {
      setError('Error al cargar las solicitudes');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [JSON.stringify(filters)]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests
  };
};

export const useRequest = (id) => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequest = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await requestService.getById(id);
      setRequest(data);
    } catch (err) {
      setError('Error al cargar la solicitud');
      console.error('Error fetching request:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  return {
    request,
    loading,
    error,
    refetch: fetchRequest
  };
};

export const usePendingStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestService.getPendingStats();
      setStats(data);
    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};