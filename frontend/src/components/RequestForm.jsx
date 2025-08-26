import React, { useState } from 'react';
import { requestService } from '../services/api';
import { REQUEST_TYPES, TYPE_LABELS } from '../utils/constants';

const RequestForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    solicitante: '',
    responsable: '',
    tipo: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    if (!formData.solicitante.trim()) newErrors.solicitante = 'El solicitante es requerido';
    if (!formData.responsable.trim()) newErrors.responsable = 'El responsable es requerido';
    if (!formData.tipo) newErrors.tipo = 'El tipo de solicitud es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await requestService.create(formData);
      console.log('Solicitud creada:', result);
      
      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        solicitante: '',
        responsable: '',
        tipo: ''
      });

      if (onSuccess) {
        onSuccess(result);
      }
      
      alert('Solicitud creada exitosamente');
    } catch (error) {
      console.error('Error creando solicitud:', error);
      alert('Error al crear la solicitud. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">
          📝 Nueva Solicitud de Aprobación
        </h5>
      </div>
      <div className="card-body">
        <div>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label htmlFor="titulo" className="form-label">
                Título <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título descriptivo de la solicitud"
                disabled={loading}
              />
              {errors.titulo && (
                <div className="invalid-feedback">{errors.titulo}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="tipo" className="form-label">
                Tipo de Solicitud <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Seleccionar tipo</option>
                {Object.entries(REQUEST_TYPES).map(([key, value]) => (
                  <option key={value} value={value}>
                    {TYPE_LABELS[value]}
                  </option>
                ))}
              </select>
              {errors.tipo && (
                <div className="invalid-feedback">{errors.tipo}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
              id="descripcion"
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe detalladamente lo que necesitas que se apruebe"
              disabled={loading}
            ></textarea>
            {errors.descripcion && (
              <div className="invalid-feedback">{errors.descripcion}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="solicitante" className="form-label">
                Solicitante <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.solicitante ? 'is-invalid' : ''}`}
                id="solicitante"
                name="solicitante"
                value={formData.solicitante}
                onChange={handleChange}
                placeholder="Usuario de red que solicita"
                disabled={loading}
              />
              {errors.solicitante && (
                <div className="invalid-feedback">{errors.solicitante}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="responsable" className="form-label">
                Responsable <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.responsable ? 'is-invalid' : ''}`}
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                placeholder="Usuario que debe aprobar"
                disabled={loading}
              />
              {errors.responsable && (
                <div className="invalid-feedback">{errors.responsable}</div>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creando...
                </>
              ) : (
                <>
                  ✅ Crear Solicitud
                </>
              )}
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
                disabled={loading}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;