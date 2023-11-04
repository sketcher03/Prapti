const express = require('express');
const { upload } = require("../multer");

const router = express.Router();

var multipleFiles = upload.array("files", 6);

const requireAdminAuth = require('../middleware/requireAdminAuthentication')
const requireAuth = require('../middleware/requireAuthentication')

//require authorization before firing all other routes
//router.use(requireAuth);

const { 
    createProject, 
    getProjects,
    getAllProjects, 
    getProject, 
    deleteProject 
} = require('../controllers/projectController')

//POST a new request
router.post('/create', requireAuth, multipleFiles, createProject);

//GET all projects posted by authenticated user
router.get('/',requireAuth, getProjects);
router.get('/admin', requireAdminAuth, getProjects);

//GET all projects
router.get('/all',requireAuth, getAllProjects);
router.get('/admin/all', requireAdminAuth, getAllProjects);

//GET a single project info
router.get('/:id',requireAuth, getProject);
router.get('/admin/:id', requireAdminAuth, getProject);

//DELETE a project
router.delete('/:id',requireAuth, deleteProject);
router.get('/admin/:id', requireAdminAuth, deleteProject);

module.exports = router;