import React, { useState } from 'react';
import Layout from '../components/Layout';
import RequestCard from '../components/RequestCard';
import RequestFilters from '../components/RequestFilters';
import { useRequests } from '../hooks/useRequests';

const RequestList = ({ onNavigate, initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters || {});
  const { requests = [], loading, error, refetch } = useRequests(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters || {});
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleViewRequest = (requestId) => {
    if (onNavigate) {
      onNavigate('view', requestId);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  // Validación segura para filtros
  const safeFilters = filters || {};
  const hasActiveFilters = Object.keys(safeFilters).length > 0;
  const safeRequests = requests || [];

  return (
    <Layout title="Listado de Solicitudes">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => onNavigate && onNavigate('home')}
            >
              🏠 Inicio
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listado de Solicitudes
          </li>
        </ol>
      </nav>

      {/* Acciones principales */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button 
            className="btn btn-primary me-2"
            onClick={() => onNavigate && onNavigate('create')}
          >
            ➕ Nueva Solicitud
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-1"></span>
            ) : (
              '🔄 '
            )}
            Actualizar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <RequestFilters
        filters={safeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Contenido principal */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={handleRefresh}
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando solicitudes...</span>
          </div>
          <p className="mt-3 text-muted">Cargando solicitudes...</p>
        </div>
      ) : (
        <>
          {/* Información de resultados */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              📋 Solicitudes ({safeRequests.length})
            </h5>
            {hasActiveFilters && (
              <small className="text-muted">
                Mostrando resultados filtrados
              </small>
            )}
          </div>

          {/* Lista de solicitudes */}
          {safeRequests.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <span style={{fontSize: '4rem'}}>📭</span>
                <h5 className="mt-3">No se encontraron solicitudes</h5>
                <p className="text-muted mb-4">
                  {hasActiveFilters
                    ? 'No hay solicitudes que coincidan con los filtros aplicados.'
                    : 'Aún no se han creado solicitudes en el sistema.'
                  }
                </p>
                {hasActiveFilters ? (
                  <button 
                    className="btn btn-outline-secondary me-2"
                    onClick={handleClearFilters}
                  >
                    Limpiar Filtros
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={() => onNavigate && onNavigate('create')}
                  >
                    ➕ Crear Primera Solicitud
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              {safeRequests.map(request => (
                <RequestCard
                  key={request.public_id || request.id}
                  request={request}
                  onClick={handleViewRequest}
                />
              ))}
            </div>
          )}

          {/* Paginación (para futuras implementaciones) */}
          {safeRequests.length > 0 && (
            <div className="mt-4 text-center">
              <small className="text-muted">
                Mostrando {safeRequests.length} solicitud(es)
              </small>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default RequestList;