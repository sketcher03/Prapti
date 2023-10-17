const express = require('express');

const {
    createRequest,
    getRequest,
    getRequests,
    updateRequest,
    deleteRequest,
    getAllRequests
} = require('../controllers/requestController');

const requireAdminAuth = require('../middleware/requireAdminAuthentication')
const requireAuth = require('../middleware/requireAuthentication')

const router = express.Router();

//require authorization before firing all other routes
//router.use(requireAuth);

//GET all requests posted by authenticated user
router.get('/', requireAuth, getRequests);
router.get('/admin', requireAdminAuth, getRequests);

//GET all requests
router.get('/all', requireAuth, getAllRequests);
router.get('/admin/all', requireAdminAuth, getAllRequests);

//GET a single request info
router.get('/:id', requireAuth, getRequest);
router.get('/admin/:id', requireAdminAuth, getRequest);

//POST a new request
router.post('/', requireAuth, createRequest);

//DELETE a request
router.delete('/:id', requireAuth, deleteRequest);
router.delete('/admin/:id', requireAdminAuth, deleteRequest);

//UPDATE a request
router.put('/:id', requireAuth, updateRequest);

module.exports = router;