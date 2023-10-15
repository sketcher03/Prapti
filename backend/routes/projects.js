const express = require('express');
const { upload } = require("../multer");

const router = express.Router();

var multipleFiles = upload.array("files", 6);

const { createProject } = require('../controllers/projectController')

//POST a new request
router.post('/create', multipleFiles, createProject);

module.exports = router;