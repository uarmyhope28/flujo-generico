const Request = require('../models/Request');

// Crear nueva solicitud
const createRequest = async (req, res) => {
  try {
    const { titulo, descripcion, solicitante, responsable, tipo } = req.body;

    // Validar campos requeridos
    if (!titulo || !descripcion || !solicitante || !responsable || !tipo) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: titulo, descripcion, solicitante, responsable, tipo' 
      });
    }

    const newRequest = Request.create({
      titulo,
      descripcion,
      solicitante,
      responsable,
      tipo
    });

    res.status(201).json({
      message: 'Solicitud creada exitosamente',
      data: newRequest
    });

  } catch (error) {
    console.error('Error creando solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes
const getAllRequests = async (req, res) => {
  try {
    const filters = {
      estado: req.query.estado,
      responsable: req.query.responsable
    };

    const requests = Request.getAll(filters);
    
    res.json(requests);

  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener solicitud específica con histórico
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = Request.getWithHistory(id);
    
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json(request);

  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar estado de solicitud (aprobar/rechazar)
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment, user } = req.body;

    // Validar campos requeridos
    if (!status || !user) {
      return res.status(400).json({ 
        error: 'Status y usuario son requeridos' 
      });
    }

    // Validar status válido
    if (!['aprobado', 'rechazado'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status debe ser "aprobado" o "rechazado"' 
      });
    }

    const updatedRequest = Request.updateStatus(id, status, comment, user);
    
    res.json({
      message: `Solicitud ${status} exitosamente`,
      data: updatedRequest
    });

  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    
    if (error.message === 'Solicitud no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Agregar comentario
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, user } = req.body;

    // Validar campos requeridos
    if (!comment || !user) {
      return res.status(400).json({ 
        error: 'Comentario y usuario son requeridos' 
      });
    }

    const updatedRequest = Request.addComment(id, comment, user);
    
    res.json({
      message: 'Comentario agregado exitosamente',
      data: updatedRequest
    });

  } catch (error) {
    console.error('Error agregando comentario:', error);
    
    if (error.message === 'Solicitud no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener estadísticas de pendientes
const getPendingStats = async (req, res) => {
  try {
    const stats = Request.getPendingStats();
    res.json(stats);
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  addComment,
  getPendingStats
};