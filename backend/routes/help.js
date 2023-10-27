const express = require('express');

const {createComplaint, getComplaints} = require ('../controllers/helpController');


const router = express.Router();

//create a complaint
router.post ('/complaint', createComplaint);

//get complaint
router.get('/complaint/:id', getComplaints);

//get all complaints

module.exports = router;