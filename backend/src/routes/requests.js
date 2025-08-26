const express = require('express');
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  addComment,
  getPendingStats
} = require('../controllers/requestController');

const router = express.Router();

// Rutas de solicitudes
router.post('/', createRequest);                    // POST /api/requests
router.get('/', getAllRequests);                   // GET /api/requests
router.get('/stats/pending', getPendingStats);     // GET /api/requests/stats/pending
router.get('/:id', getRequestById);               // GET /api/requests/:id
router.patch('/:id/status', updateRequestStatus);  // PATCH /api/requests/:id/status
router.post('/:id/comment', addComment);          // POST /api/requests/:id/comment

module.exports = router;