const Request = require('../models/requestModel');
const mongoose = require('mongoose');

//GET all requests
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

//GET a single request
const getRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No Such Request' });
    }

    const request = await Request.findById(id);

    if(!request){
        return res.status(404).json({ error: 'No Such Request' });
    }
    
    res.status(200).json(request);
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

        const request = await Request.create({title, description, category, budget, timeline, user_id});
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
        return res.status(404).json({ error: 'No Such Request' });
    }

    const request = await Request.findOneAndDelete({_id: id});

    if(!request){
        return res.status(400).json({ error: 'No Such Request' });
    }

    res.status(200).json(request);
}

//Update a request
const updateRequest = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No Such Request' });
    }

    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if(!request){
        return res.status(400).json({ error: 'No Such Request' });
    }

    res.status(200).json(request);
}

module.exports = {
    createRequest,
    getRequests,
    getRequest,
    deleteRequest,
    updateRequest
};