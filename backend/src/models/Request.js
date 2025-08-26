const db = require('./database');
const { nanoid } = require('nanoid');

class Request {
  // Crear nueva solicitud
  static create(requestData) {
    const publicId = nanoid();
    
    const insertRequest = db.prepare(`
      INSERT INTO requests (public_id, titulo, descripcion, solicitante, responsable, tipo)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertHistory = db.prepare(`
      INSERT INTO history (solicitud_id, usuario, accion, comentario)
      VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      const result = insertRequest.run(
        publicId,
        requestData.titulo,
        requestData.descripcion,
        requestData.solicitante,
        requestData.responsable,
        requestData.tipo
      );

      insertHistory.run(
        result.lastInsertRowid,
        requestData.solicitante,
        'crear',
        'Solicitud creada'
      );

      return { id: result.lastInsertRowid, public_id: publicId };
    });

    return transaction();
  }

  // Obtener todas las solicitudes con filtros
  static getAll(filters = {}) {
    let query = 'SELECT * FROM requests WHERE 1=1';
    const params = [];

    if (filters.estado) {
      query += ' AND estado = ?';
      params.push(filters.estado);
    }

    if (filters.responsable) {
      query += ' AND responsable LIKE ?';
      params.push(`%${filters.responsable}%`);
    }

    query += ' ORDER BY creado_en DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  // Obtener solicitud por public_id
  static getByPublicId(publicId) {
    const stmt = db.prepare('SELECT * FROM requests WHERE public_id = ?');
    return stmt.get(publicId);
  }

  // Obtener solicitud con histórico
  static getWithHistory(publicId) {
    const request = this.getByPublicId(publicId);
    if (!request) return null;

    const historyStmt = db.prepare(`
      SELECT usuario, accion, comentario, fecha 
      FROM history 
      WHERE solicitud_id = ? 
      ORDER BY fecha ASC
    `);

    const historico = historyStmt.all(request.id);
    
    return { ...request, historico };
  }

  // Actualizar estado de solicitud
  static updateStatus(publicId, status, comment, user) {
    const request = this.getByPublicId(publicId);
    if (!request) throw new Error('Solicitud no encontrada');

    const updateRequest = db.prepare(`
      UPDATE requests SET estado = ? WHERE public_id = ?
    `);

    const insertHistory = db.prepare(`
      INSERT INTO history (solicitud_id, usuario, accion, comentario)
      VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      updateRequest.run(status, publicId);
      insertHistory.run(request.id, user, status, comment || null);
    });

    transaction();
    return this.getByPublicId(publicId);
  }

  // Agregar comentario sin cambiar estado
  static addComment(publicId, comment, user) {
    const request = this.getByPublicId(publicId);
    if (!request) throw new Error('Solicitud no encontrada');

    const insertHistory = db.prepare(`
      INSERT INTO history (solicitud_id, usuario, accion, comentario)
      VALUES (?, ?, ?, ?)
    `);

    insertHistory.run(request.id, user, 'comentar', comment);
    return this.getByPublicId(publicId);
  }

  // Obtener estadísticas de pendientes por responsable
  static getPendingStats() {
    const stmt = db.prepare(`
      SELECT responsable, COUNT(*) as count 
      FROM requests 
      WHERE estado = 'pendiente' 
      GROUP BY responsable
    `);
    return stmt.all();
  }
}

module.exports = Request;