import React from 'react';
import { REQUEST_STATES, STATE_LABELS } from '../utils/constants';
import { usePendingStats } from '../hooks/useRequests';

const RequestFilters = ({ filters = {}, onFilterChange, onClearFilters }) => {
  const { stats, loading: statsLoading } = usePendingStats();

  // Asegurar que filters es un objeto válido
  const safeFilters = filters || {};

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...safeFilters,
      [key]: value || undefined
    });
  };

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  // Verificar si hay filtros activos de manera segura
  const hasActiveFilters = Object.values(safeFilters).some(value => value);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-title mb-0">
            🔍 Filtros
          </h6>
          {hasActiveFilters && (
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClear}
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      </div>
      
      <div className="card-body">
        <div className="row">
          {/* Filtro por estado */}
          <div className="col-md-4 mb-3">
            <label htmlFor="estadoFilter" className="form-label">
              Estado
            </label>
            <select
              id="estadoFilter"
              className="form-select"
              value={safeFilters.estado || ''}
              onChange={(e) => handleFilterChange('estado', e.target.value)}
            >
              <option value="">Todos los estados</option>
              {Object.entries(REQUEST_STATES).map(([key, value]) => (
                <option key={value} value={value}>
                  {STATE_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por responsable */}
          <div className="col-md-4 mb-3">
            <label htmlFor="responsableFilter" className="form-label">
              Responsable
            </label>
            <input
              type="text"
              id="responsableFilter"
              className="form-control"
              placeholder="Buscar por responsable"
              value={safeFilters.responsable || ''}
              onChange={(e) => handleFilterChange('responsable', e.target.value)}
            />
          </div>

          {/* Estadísticas de pendientes */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Pendientes por Responsable</label>
            <div className="mt-2">
              {statsLoading ? (
                <small className="text-muted">Cargando estadísticas...</small>
              ) : stats && stats.length > 0 ? (
                <div className="d-flex flex-wrap gap-1">
                  {stats.map(stat => (
                    <span 
                      key={stat.responsable}
                      className="badge bg-warning text-dark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleFilterChange('responsable', stat.responsable)}
                      title={`Click para filtrar por ${stat.responsable}`}
                    >
                      {stat.responsable}: {stat.count}
                    </span>
                  ))}
                </div>
              ) : (
                <small className="text-muted">No hay solicitudes pendientes</small>
              )}
            </div>
          </div>
        </div>

        {/* Indicador de filtros activos */}
        {hasActiveFilters && (
          <div className="mt-2">
            <small className="text-muted">Filtros activos:</small>
            <div className="mt-1">
              {safeFilters.estado && (
                <span className="badge bg-info me-1">
                  Estado: {STATE_LABELS[safeFilters.estado]}
                </span>
              )}
              {safeFilters.responsable && (
                <span className="badge bg-info me-1">
                  Responsable: {safeFilters.responsable}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestFilters;