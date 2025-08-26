const express = require('express');
const cors = require('cors');
const requestRoutes = require('./routes/requests');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/requests', requestRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sistema de Aprobaciones API' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;