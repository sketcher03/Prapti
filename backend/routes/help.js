const express = require('express');

const {createComplaint, getComplaints, createFeedback} = require ('../controllers/helpController');


const router = express.Router();

//create a complaint
router.post ('/complaint', createComplaint);

//create a feedback
router.post ('/feedback', createFeedback);

//get complaint
router.get('/complaint/:id', getComplaints);

//get all complaints

module.exports = router;