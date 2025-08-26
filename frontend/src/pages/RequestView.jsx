import React from 'react';
import Layout from '../components/Layout';
import RequestDetail from '../components/RequestDetail';
import { useRequest } from '../hooks/useRequests';

const RequestView = ({ requestId, onNavigate }) => {
  const { request, loading, error, refetch } = useRequest(requestId);

  const handleUpdate = () => {
    refetch();
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('list');
    }
  };

  if (loading) {
    return (
      <Layout title="Cargando Solicitud...">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Cargando solicitud...</span>
          </div>
          <p className="mt-3 text-muted">Cargando detalles de la solicitud...</p>
        </div>
      </Layout>
    );
  }

  if (error || !request) {
    return (
      <Layout title="Error">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger" role="alert">
              <div className="d-flex">
                <div className="me-3">
                  <span style={{fontSize: '2rem'}}>❌</span>
                </div>
                <div>
                  <h4 className="alert-heading">Solicitud no encontrada</h4>
                  <p className="mb-3">
                    {error || 'No se pudo cargar la información de la solicitud solicitada.'}
                  </p>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => refetch()}
                    >
                      🔄 Reintentar
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={handleBack}
                    >
                      ← Volver al Listado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Solicitud: ${request.titulo}`}>
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
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => onNavigate && onNavigate('list')}
            >
              📋 Solicitudes
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {request.public_id}
          </li>
        </ol>
      </nav>

      {/* Acciones principales */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button 
            className="btn btn-secondary"
            onClick={handleBack}
          >
            ← Volver al Listado
          </button>
        </div>
        <div>
          <button 
            className="btn btn-outline-primary"
            onClick={() => refetch()}
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Detalle de la solicitud */}
      <RequestDetail 
        request={request} 
        onUpdate={handleUpdate}
      />

      {/* Información adicional */}
      <div className="mt-4">
        <div className="card border-light">
          <div className="card-body">
            <h6 className="card-title">💡 Información</h6>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled mb-0">
                  <li>• El histórico muestra todas las acciones realizadas</li>
                  <li>• Solo el responsable puede aprobar o rechazar</li>
                  <li>• Cualquier usuario puede agregar comentarios</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled mb-0">
                  <li>• Los cambios de estado son permanentes</li>
                  <li>• Se mantiene un registro completo de actividad</li>
                  <li>• El ID único permite rastrear la solicitud</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestView;