const express = require('express');

const {
    createRequest,
    getRequest,
    getRequests,
    updateRequest,
    deleteRequest,
    getAllRequests
} = require('../controllers/requestController');

const requireAuth = require('../middleware/requireAuthentication')

const router = express.Router();

//require authorization before firing all other routes
router.use(requireAuth);

//GET all requests posted by authenticated user
router.get('/', getRequests);

//GET all requests
router.get('/all', getAllRequests);

//GET a single request info
router.get('/:id', getRequest);

//POST a new request
router.post('/', createRequest);

//DELETE a request
router.delete('/:id', deleteRequest);

//UPDATE a request
router.put('/:id', updateRequest);

module.exports = router;