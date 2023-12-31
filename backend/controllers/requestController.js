const Request = require('../models/requestModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

//GET all requests from a single user
const getRequests = async (req, res) => {

    const user_id = req.user._id;

    try {
        const requests = await Request.find({ user_id }).sort({createdAt: -1});

        res.status(200).send({ requests, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
    
};

//GET all requests
const getAllRequests = async (req, res) => {

    try {
        const requests = await Request.find();

        res.status(200).send({ requests, success: true });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
    
};

//GET a single request
const getRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({ message: 'No Such Request' });
    }

    const request = await Request.findById(id);

    if(!request){
        return res.status(404).send({ message: 'No Such Request' });
    }
    
    res.status(200).send({request});
};

//Create a new request
const createRequest = async (req, res) => {
    const { title, description, category, budget, timeline } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title');
    }
    if(!description) {
        emptyFields.push('description');
    }
    if(!category) {
        emptyFields.push('category');
    }
    if(!budget) {
        emptyFields.push('budget');
    }
    if(!timeline) {
        emptyFields.push('timeline');
    }
    if(emptyFields.length > 0) {
        return res.status(400).send({ message: 'Please fill in all the fields', emptyFields });
    }

    //add document to DB
    try{
        const user_id = req.user._id;

        const user = await User.findOne({ _id: user_id });

        const user_username = user.username;

        const request = await Request.create({ title, description, category, budget, timeline, user_id, user_username });
        res.status(200).send({ request });
    } 
    catch (error){
        res.status(400).send({ message: error.message});
    }
};

//Delete a request
const deleteRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({ message: 'No Such Request' });
    }

    const request = await Request.findOneAndDelete({_id: id});

    if(!request){
        return res.status(400).send({ message: 'No Such Request' });
    }

    res.status(200).send({ request });
}

//Update a request
const updateRequest = async (req, res) => {
    const { title, description, category, budget, timeline } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title');
    }
    if(!description) {
        emptyFields.push('description');
    }
    if(!category) {
        emptyFields.push('category');
    }
    if(!budget) {
        emptyFields.push('budget');
    }
    if(!timeline) {
        emptyFields.push('timeline');
    }
    if(emptyFields.length > 0) {
        return res.status(400).send({ message: 'Please fill in all the fields', emptyFields });
    }

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({ message: 'No Such Request' });
    }

    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if(!request){
        return res.status(400).send({ message: 'Could Not Update your Request. Please try again later.' });
    }

    res.status(200).send({ request, success: true, message: "Request Updated Successfully!" });
}

module.exports = {
    createRequest,
    getRequests,
    getRequest,
    deleteRequest,
    updateRequest,
    getAllRequests
};