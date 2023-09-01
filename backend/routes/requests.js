const express = require('express');

const {
    createRequest,
    getRequest,
    getRequests,
    updateRequest,
    deleteRequest
} = require('../controllers/requestController');

const router = express.Router();

//GET all requests
router.get('/', getRequests);

//GET a single request info
router.get('/:id', getRequest);

//POST a new request
router.post('/', createRequest);

//DELETE a request
router.delete('/:id', deleteRequest);

//UPDATE a request
router.put('/:id', updateRequest);

module.exports = router;