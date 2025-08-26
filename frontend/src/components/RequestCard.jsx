import React from 'react';
import { STATE_BADGES, STATE_LABELS, TYPE_LABELS } from '../utils/constants';

const RequestCard = ({ request, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(request.public_id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-body" onClick={handleClick}>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <h6 className="card-title text-primary mb-1">{request.titulo}</h6>
            <small className="text-muted">ID: {request.public_id}</small>
          </div>
          <span className={STATE_BADGES[request.estado] || 'badge bg-secondary'}>
            {STATE_LABELS[request.estado] || request.estado}
          </span>
        </div>

        <p className="card-text text-muted mb-2">
          {request.descripcion.length > 100 
            ? `${request.descripcion.substring(0, 100)}...`
            : request.descripcion
          }
        </p>

        <div className="row text-sm">
          <div className="col-md-6">
            <small>
              <strong>Tipo:</strong> {TYPE_LABELS[request.tipo] || request.tipo}
            </small>
          </div>
          <div className="col-md-6">
            <small>
              <strong>Creado:</strong> {formatDate(request.creado_en)}
            </small>
          </div>
          <div className="col-md-6">
            <small>
              <strong>Solicitante:</strong> {request.solicitante}
            </small>
          </div>
          <div className="col-md-6">
            <small>
              <strong>Responsable:</strong> {request.responsable}
            </small>
          </div>
        </div>
      </div>

      {onClick && (
        <div className="card-footer bg-transparent">
          <small className="text-primary">
            👁️ Click para ver detalles
          </small>
        </div>
      )}
    </div>
  );
};

export default RequestCard;