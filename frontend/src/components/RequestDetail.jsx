import React, { useState } from 'react';
import { requestService } from '../services/api';
import { 
  STATE_BADGES, 
  STATE_LABELS, 
  TYPE_LABELS, 
  REQUEST_STATES,
  ACTION_LABELS 
} from '../utils/constants';

const RequestDetail = ({ request, onUpdate }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [showActions, setShowActions] = useState(false);

  const handleStatusChange = async (status) => {
    if (!currentUser.trim()) {
      alert('Por favor ingrese su usuario');
      return;
    }

    if (!comment.trim() && !window.confirm(
      `¿Está seguro de ${status === REQUEST_STATES.APPROVED ? 'aprobar' : 'rechazar'} sin comentario?`
    )) {
      return;
    }

    setActionLoading(true);
    try {
      await requestService.updateStatus(request.public_id, {
        status,
        comment: comment.trim() || null,
        user: currentUser.trim()
      });

      setComment('');
      setShowActions(false);
      
      if (onUpdate) {
        onUpdate();
      }

      alert(`Solicitud ${status === REQUEST_STATES.APPROVED ? 'aprobada' : 'rechazada'} exitosamente`);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error al actualizar la solicitud');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!currentUser.trim() || !comment.trim()) {
      alert('Por favor ingrese su usuario y un comentario');
      return;
    }

    setActionLoading(true);
    try {
      await requestService.addComment(request.public_id, {
        comment: comment.trim(),
        user: currentUser.trim()
      });

      setComment('');
      
      if (onUpdate) {
        onUpdate();
      }

      alert('Comentario agregado exitosamente');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error al agregar el comentario');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  const isPending = request.estado === REQUEST_STATES.PENDING;

  return (
    <div className="row">
      <div className="col-lg-8">
        {/* Información Principal */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📋 Información de la Solicitud</h5>
            <span className={STATE_BADGES[request.estado] || 'badge bg-secondary'}>
              {STATE_LABELS[request.estado] || request.estado}
            </span>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">ID:</label>
                <p className="mb-0">{request.public_id}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Tipo:</label>
                <p className="mb-0">{TYPE_LABELS[request.tipo] || request.tipo}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Solicitante:</label>
                <p className="mb-0">{request.solicitante}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Responsable:</label>
                <p className="mb-0">{request.responsable}</p>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label fw-bold">Título:</label>
                <p className="mb-0">{request.titulo}</p>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label fw-bold">Descripción:</label>
                <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {request.descripcion}
                </p>
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Fecha de Creación:</label>
                <p className="mb-0">{formatDate(request.creado_en)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {isPending && (
          <div className="card mb-4">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">⚡ Acciones</h5>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowActions(!showActions)}
                >
                  {showActions ? 'Ocultar' : 'Mostrar'} Acciones
                </button>
              </div>
            </div>
            
            {showActions && (
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="currentUser" className="form-label">
                    Su Usuario <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentUser"
                    className="form-control"
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                    placeholder="Ingrese su usuario de red"
                    disabled={actionLoading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="actionComment" className="form-label">
                    Comentario
                  </label>
                  <textarea
                    id="actionComment"
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Agregar comentario (opcional para aprobación/rechazo)"
                    disabled={actionLoading}
                  ></textarea>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusChange(REQUEST_STATES.APPROVED)}
                    disabled={actionLoading || !currentUser.trim()}
                  >
                    {actionLoading ? (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    ) : (
                      '✅ '
                    )}
                    Aprobar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleStatusChange(REQUEST_STATES.REJECTED)}
                    disabled={actionLoading || !currentUser.trim()}
                  >
                    {actionLoading ? (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    ) : (
                      '❌ '
                    )}
                    Rechazar
                  </button>

                  <button
                    className="btn btn-outline-primary"
                    onClick={handleAddComment}
                    disabled={actionLoading || !currentUser.trim() || !comment.trim()}
                  >
                    {actionLoading ? (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    ) : (
                      '💬 '
                    )}
                    Agregar Comentario
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="col-lg-4">
        {/* Histórico */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">📜 Histórico</h5>
          </div>
          <div className="card-body">
            {request.historico && request.historico.length > 0 ? (
              <div className="timeline">
                {request.historico.map((entry, index) => (
                  <div key={index} className="timeline-item mb-3 pb-3">
                    {index < request.historico.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-primary me-2">
                          {ACTION_LABELS[entry.accion] || entry.accion}
                        </span>
                        <small className="text-muted">por {entry.usuario}</small>
                      </div>
                      <small className="text-muted">
                        {formatDate(entry.fecha)}
                      </small>
                    </div>

                    {entry.comentario && (
                      <div className="bg-light p-2 rounded mt-2">
                        <small style={{ whiteSpace: 'pre-wrap' }}>
                          {entry.comentario}
                        </small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-4">
                <p>Sin histórico disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          position: relative;
          padding-left: 20px;
          border-left: 3px solid #e9ecef;
        }
        
        .timeline-item:before {
          content: '';
          position: absolute;
          left: -6px;
          top: 8px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #007bff;
          border: 2px solid #fff;
        }
        
        .timeline-item:last-child {
          border-left: 3px solid transparent;
        }
      `}</style>
    </div>
  );
};

export default RequestDetail;