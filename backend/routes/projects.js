const express = require('express');

const router = express.Router();

const { createProject } = require('../controllers/projectController')

//POST a new request
router.post('/project', createProject);

module.exports = router;