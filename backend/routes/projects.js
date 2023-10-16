const express = require('express');
const { upload } = require("../multer");

const router = express.Router();

var multipleFiles = upload.array("files", 6);

const requireAuth = require('../middleware/requireAuthentication')

//require authorization before firing all other routes
router.use(requireAuth);

const { createProject, getProjects, getAllProjects, getProject, deleteProject } = require('../controllers/projectController')

//POST a new request
router.post('/create', multipleFiles, createProject);

//GET all projects posted by authenticated user
router.get('/', getProjects);

//GET all projects
router.get('/all', getAllProjects);

//GET a single project info
router.get('/:id', getProject);

//DELETE a project
router.delete('/:id', deleteProject);

module.exports = router;