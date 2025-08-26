import React from 'react';
import Layout from '../components/Layout';
import { usePendingStats } from '../hooks/useRequests';

const Home = ({ onNavigate }) => {
  const { stats, loading } = usePendingStats();

  const totalPending = stats.reduce((total, stat) => total + stat.count, 0);

  return (
    <Layout title="Panel Principal">
      <div className="row">
        {/* Tarjetas de acceso rápido */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-primary">
            <div className="card-body text-center">
              
              <h5 className="card-title">Nueva Solicitud</h5>
              <p className="card-text text-muted">
                Crear una nueva solicitud de aprobación
              </p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate && onNavigate('create')}
              >
                Crear Solicitud
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-info">
            <div className="card-body text-center">
             
              <h5 className="card-title">Ver Solicitudes</h5>
              <p className="card-text text-muted">
                Revisar y gestionar solicitudes existentes
              </p>
              <button 
                className="btn btn-info btn-lg text-white"
                onClick={() => onNavigate && onNavigate('list')}
              >
                Ver Listado
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="card-title mb-0">
                ⚠️ Solicitudes Pendientes de Aprobación
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2 text-muted">Cargando estadísticas...</p>
                </div>
              ) : totalPending > 0 ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Total de solicitudes pendientes:</h6>
                    <span className="badge bg-warning text-dark fs-6">
                      {totalPending}
                    </span>
                  </div>
                  
                  <div className="row">
                    {stats.map(stat => (
                      <div key={stat.responsable} className="col-sm-6 col-lg-4 mb-3">
                        <div className="card border-warning">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="card-title mb-1">{stat.responsable}</h6>
                                <small className="text-muted">Responsable</small>
                              </div>
                              <span className="badge bg-warning text-dark">
                                {stat.count}
                              </span>
                            </div>
                            <button 
                              className="btn btn-sm btn-outline-warning mt-2 w-100"
                              onClick={() => onNavigate && onNavigate('list', { responsable: stat.responsable })}
                            >
                              Ver solicitudes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span style={{fontSize: '3rem'}}>✅</span>
                  <h6 className="mt-2">¡Excelente!</h6>
                  <p className="text-muted">No hay solicitudes pendientes en este momento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Información del sistema */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-light">
            <div className="card-body">
              <h6 className="card-title">ℹ️ Información del Sistema</h6>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><strong>Funciones disponibles:</strong></li>
                    <li>• Crear solicitudes de aprobación</li>
                    <li>• Aprobar o rechazar solicitudes</li>
                    <li>• Agregar comentarios</li>
                    <li>• Ver historial completo</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><strong>Tipos de solicitud:</strong></li>
                    <li>• Despliegue</li>
                    <li>• Acceso</li>
                    <li>• Cambio Técnico</li>
                    <li>• Otros</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;