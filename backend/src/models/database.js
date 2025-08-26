const Database = require('better-sqlite3');
const path = require('path');

// Crear conexión a la base de datos
const dbPath = path.join(__dirname, '../../database/requests.db');
const db = new Database(dbPath);

// Configurar para mejor rendimiento
db.pragma('journal_mode = WAL');

// Crear tablas si no existen
const createTables = () => {
  // Tabla de solicitudes
  const createRequestsTable = `
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      public_id TEXT UNIQUE NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      solicitante TEXT NOT NULL,
      responsable TEXT NOT NULL,
      tipo TEXT NOT NULL,
      estado TEXT DEFAULT 'pendiente' CHECK(estado IN ('pendiente', 'aprobado', 'rechazado')),
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Tabla de histórico
  const createHistoryTable = `
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      solicitud_id INTEGER NOT NULL,
      usuario TEXT NOT NULL,
      accion TEXT NOT NULL,
      comentario TEXT,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (solicitud_id) REFERENCES requests(id)
    )
  `;

  db.exec(createRequestsTable);
  db.exec(createHistoryTable);
  
  console.log('Tablas de base de datos inicializadas correctamente');
};

// Inicializar tablas
createTables();

module.exports = db;