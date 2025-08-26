// Estados de solicitudes
export const REQUEST_STATES = {
  PENDING: 'pendiente',
  APPROVED: 'aprobado',
  REJECTED: 'rechazado'
};

// Etiquetas para mostrar
export const STATE_LABELS = {
  [REQUEST_STATES.PENDING]: 'Pendiente',
  [REQUEST_STATES.APPROVED]: 'Aprobado',
  [REQUEST_STATES.REJECTED]: 'Rechazado'
};

// Clases CSS para badges de estado
export const STATE_BADGES = {
  [REQUEST_STATES.PENDING]: 'badge bg-warning text-dark',
  [REQUEST_STATES.APPROVED]: 'badge bg-success',
  [REQUEST_STATES.REJECTED]: 'badge bg-danger'
};

// Tipos de solicitud
export const REQUEST_TYPES = {
  DEPLOYMENT: 'despliegue',
  ACCESS: 'acceso',
  TECHNICAL_CHANGE: 'cambio_tecnico',
  OTHER: 'otro'
};

// Etiquetas de tipos
export const TYPE_LABELS = {
  [REQUEST_TYPES.DEPLOYMENT]: 'Despliegue',
  [REQUEST_TYPES.ACCESS]: 'Acceso',
  [REQUEST_TYPES.TECHNICAL_CHANGE]: 'Cambio Técnico',
  [REQUEST_TYPES.OTHER]: 'Otro'
};

// Acciones del histórico
export const HISTORY_ACTIONS = {
  CREATE: 'crear',
  APPROVE: 'aprobado',
  REJECT: 'rechazado',
  COMMENT: 'comentar'
};

// Etiquetas de acciones
export const ACTION_LABELS = {
  [HISTORY_ACTIONS.CREATE]: 'Creada',
  [HISTORY_ACTIONS.APPROVE]: 'Aprobada',
  [HISTORY_ACTIONS.REJECT]: 'Rechazada',
  [HISTORY_ACTIONS.COMMENT]: 'Comentario'
};