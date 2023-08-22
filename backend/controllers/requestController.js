const Request = require('../models/requestModel');
const mongoose = require('mongoose');

//GET all requests
const getRequests = async (req, res) => {
    const requests = await Request.find({}).sort({createdAt: -1});

    res.status(200).json(requests);
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

    //add document to DB
    try{
        const request = await Request.create({title, description, category, budget, timeline});
        res.status(200).json(request);
    } 
    catch (error){
        res.status(400).json({error: error.message});
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

    const request = await Request.findOneAndUpdate({_id: id}, {
        ...req.body
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