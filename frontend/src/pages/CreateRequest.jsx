import React from 'react';
import Layout from '../components/Layout';
import RequestForm from '../components/RequestForm';

const CreateRequest = ({ onNavigate }) => {
  const handleSuccess = (result) => {
    console.log('Solicitud creada exitosamente:', result);
    // Opcional: navegar al detalle de la solicitud recién creada
    if (onNavigate && result.data) {
      setTimeout(() => {
        onNavigate('view', result.data.public_id);
      }, 1500);
    }
  };

  const handleCancel = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <Layout title="Crear Nueva Solicitud">
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
            Nueva Solicitud
          </li>
        </ol>
      </nav>

      {/* Información */}
      <div className="alert alert-info mb-4">
        <div className="d-flex">
          <div className="me-2">
            <span style={{fontSize: '1.5rem'}}>💡</span>
          </div>
          <div>
            <h6 className="alert-heading">Instrucciones</h6>
            <ul className="mb-0">
              <li>Complete todos los campos marcados con <span className="text-danger">*</span></li>
              <li>Proporcione una descripción detallada de lo que necesita aprobar</li>
              <li>El responsable recibirá una notificación de la nueva solicitud</li>
              <li>Se generará un ID único para hacer seguimiento a su solicitud</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <RequestForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      {/* Información adicional */}
      <div className="card mt-4 border-light">
        <div className="card-body">
          <h6 className="card-title">📋 ¿Qué sucede después de crear la solicitud?</h6>
          <div className="row">
            <div className="col-md-6">
              <ol className="list-group list-group-numbered list-group-flush">
                <li className="list-group-item bg-transparent border-0 px-0">
                  Se genera un ID único para su solicitud
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  El responsable puede ver la solicitud en su bandeja
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  Puede aprobar, rechazar o agregar comentarios
                </li>
              </ol>
            </div>
            <div className="col-md-6">
              <ol className="list-group list-group-numbered list-group-flush" start="4">
                <li className="list-group-item bg-transparent border-0 px-0">
                  Se mantiene un historial completo de acciones
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  Usted puede ver el progreso en cualquier momento
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  Se notifica el resultado final
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRequest;